import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';

/**
 * parseFile(buffer, filename, mimetype)
 * Returns { text, structured: { name, email, phone } }
 */
export async function parseFile(buffer, filename, mimetype) {
  let text = '';

  if (mimetype && mimetype.includes('pdf')) {
    const data = await pdfParse(buffer);
    text = data.text || '';
  } else if ((mimetype && mimetype.includes('word')) || filename.toLowerCase().endsWith('.docx')) {
    const data = await mammoth.extractRawText({ buffer });
    text = data.value || '';
  } else {
    text = buffer.toString('utf8');
  }

  const email = text.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0] || null;
  const phone = text.match(/(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d\-.\s]{6,}/)?.[0] || null;
  const firstLine = text.split(/\r?\n/).map(l => l.trim()).find(Boolean) || null;
  const name = firstLine;

  return { text, structured: { name, email, phone } };
}