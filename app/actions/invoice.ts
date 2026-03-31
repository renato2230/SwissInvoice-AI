'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import OpenAI from 'openai';
import { generateInvoicePdf } from '@/lib/pdf-generator';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

/**
 * Server Action for generating a Swiss invoice.
 * It uses AI to format the raw data to Swiss standards,
 * saves to Prisma DB, generates a compliant PDF, and uploads to Supabase Storage.
 */
export async function generateInvoice(formData: FormData) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Unauthorized');

  // 1. Extrair dados do formulário
  const rawData = {
    recipientName: formData.get('recipientName') as string,
    recipientAddress: formData.get('recipientAddress') as string,
    recipientZipCity: formData.get('recipientZipCity') as string,
    amount: parseFloat(formData.get('amount') as string),
    vatRate: parseFloat(formData.get('vatRate') as string) || 0,
    description: formData.get('description') as string,
    dueDays: parseInt(formData.get('dueDays') as string) || 30,
  };

  // 2. Chamar IA para limpar/formatação (economiza tokens)
  const prompt = `
    Corrija os dados da fatura para o formato suíço. Retorne apenas JSON.
    Dados: ${JSON.stringify(rawData)}
    JSON esperado: { "recipientName": "", "recipientAddress": "", "recipientZipCity": "", "amount": number, "vatRate": number, "description": "", "dueDays": number }
  `;
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.2,
    max_tokens: 200,
  });
  const aiResult = JSON.parse(completion.choices[0].message.content!);

  // 3. Criar invoice no banco
  const invoiceNumber = `INV-${Date.now()}`;
  const dueAt = new Date();
  dueAt.setDate(dueAt.getDate() + aiResult.dueDays);

  const invoice = await prisma.invoice.create({
    data: {
      userId: user.id,
      invoiceNumber,
      recipientName: aiResult.recipientName,
      recipientAddress: aiResult.recipientAddress,
      recipientZipCity: aiResult.recipientZipCity,
      amount: aiResult.amount,
      vatRate: aiResult.vatRate,
      description: aiResult.description,
      dueAt,
      status: 'draft',
    },
  });

  // 4. Gerar PDF e fazer upload para Supabase Storage
  const pdfBuffer = await generateInvoicePdf(invoice);
  const fileName = `invoices/${invoice.id}.pdf`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('invoices')
    .upload(fileName, pdfBuffer, { contentType: 'application/pdf' });
  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage.from('invoices').getPublicUrl(fileName);
  
  await prisma.invoice.update({
    where: { id: invoice.id },
    data: { pdfUrl: publicUrl, status: 'sent' },
  });

  revalidatePath('/dashboard');
  return { success: true, pdfUrl: publicUrl };
}
