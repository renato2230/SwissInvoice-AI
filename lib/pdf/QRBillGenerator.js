import { PDFDocument, StandardFonts } from 'pdf-lib';
import { SwissQRBill } from 'swissqrbill';

/**
 * Generates a Swiss QR-Bill PDF buffer.
 * @param {Object} invoiceData - Data including creditor, debtor, amount, etc.
 * @returns {Promise<Buffer>} - The generated PDF buffer.
 */
export async function generateQRBill(invoiceData) {
  // 1. Initialize SwissQRBill
  const bill = new SwissQRBill({
    amount: invoiceData.amount || 0,
    currency: 'CHF',
    creditor: {
      account: invoiceData.creditor.iban,
      name: invoiceData.creditor.name,
      address: invoiceData.creditor.address,
      zip: invoiceData.creditor.zip,
      city: invoiceData.creditor.city,
      country: 'CH'
    },
    debtor: invoiceData.debtor ? {
      name: invoiceData.debtor.name,
      address: invoiceData.debtor.address,
      zip: invoiceData.debtor.zip,
      city: invoiceData.debtor.city,
      country: invoiceData.debtor.country || 'CH'
    } : undefined,
    reference: invoiceData.reference,
    message: invoiceData.message || 'Thank you for your business.',
    language: invoiceData.language || 'EN',
  });

  // 2. Generate the QR-Bill part as an SVG or PDF fragment (handled by library)
  // For most implementations, swissqrbill can output a full PDF or be used with PDFKit.
  // Here we assume a standard Node.js implementation for an API Route.
  
  try {
    const pdfBuffer = await bill.getPDF(); // Depending on library version/API
    return pdfBuffer;
  } catch (error) {
    console.error('Error generating QR Bill:', error);
    throw new Error('Failed to generate Swiss QR-Bill');
  }
}
