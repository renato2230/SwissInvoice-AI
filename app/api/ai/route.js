import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-mock-key',
});

/**
 * API Route for Swiss-specific business AI assistance.
 * It's fine-tuned through prompting for Swiss accounting and market advice.
 */
export async function POST(req) {
  try {
    const { prompt, context } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are the Swiss Financial Assistant for 'SwissBill Elite'. 
          Your expertise: Swiss business, tax, CHF currency, and accounting standards.
          Give precise, actionable advice in a Swiss context. Use CHF as the primary currency.
          Context: ${JSON.stringify(context)}`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const aiMessage = response.choices[0].message.content;
    return NextResponse.json({ success: true, message: aiMessage });

  } catch (error) {
    console.error('AI Route Error:', error);
    return NextResponse.json(
      { success: false, error: 'AI processing failed' },
      { status: 500 }
    );
  }
}
