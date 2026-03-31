import { SwissQRBill } from 'swissqrbill';

/**
 * PDF Generation Engine for Swiss Standard QR-Bills.
 * This function integrates the Swiss Payment Standards requirements.
 */
export async function generateInvoicePdf(invoiceData: any) {
  // In a real implementation with @react-pdf/renderer, we would render a template.
  // Using swissqrbill to create the QR part and attaching it.
  
  const bill = new SwissQRBill({
    amount: invoiceData.amount,
    currency: 'CHF',
    creditor: {
      account: process.env.COMPANY_IBAN || 'CH00 0000 0000 0000 0000 0',
      name: process.env.COMPANY_NAME || 'SwissInvoice AI',
      address: process.env.COMPANY_ADDRESS || 'Bahnhofstrasse 1',
      zip: process.env.COMPANY_ZIP || '8001',
      city: process.env.COMPANY_CITY || 'Zürich',
      country: 'CH'
    },
    debtor: {
      name: invoiceData.recipientName,
      address: invoiceData.recipientAddress,
      zip: invoiceData.recipientZipCity.split(' ')[0],
      city: invoiceData.recipientZipCity.split(' ')[1] || '',
      country: 'CH'
    },
    reference: invoiceData.invoiceNumber.replace(/[^0-9]/g, '').slice(0, 27),
    message: invoiceData.description || 'Service rendering',
    language: 'EN',
  });

  try {
    // Returns a Buffer that can be uploaded to Supabase Storage
    const pdfBuffer = await bill.getPDF();
    return pdfBuffer;
  } catch (error) {
    console.error('Error in PDF generation:', error);
    throw new Error('PDF Generation Failed');
  }
}
