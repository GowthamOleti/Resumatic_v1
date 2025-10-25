import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumeData, TemplateType } from '../types';

export async function exportToPDF(data: ResumeData, _template: TemplateType): Promise<void> {
  try {
    // Find all A4 pages in the preview
    const pages = document.querySelectorAll('.a4-page');
    
    if (!pages || pages.length === 0) {
      throw new Error('Resume preview element not found');
    }

    console.log(`Found ${pages.length} page(s) to export`);

    // Wait for any images/fonts to load
    await new Promise(resolve => setTimeout(resolve, 500));

    // Temporarily hide page indicators
    const indicators = document.querySelectorAll('.page-break-indicator');
    indicators.forEach(ind => (ind as HTMLElement).style.display = 'none');

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Capture each page
    for (let i = 0; i < pages.length; i++) {
      console.log(`Capturing page ${i + 1}...`);
      
      // Add new page for subsequent pages
      if (i > 0) {
        pdf.addPage();
      }

      // Create canvas from the entire page element
      const canvas = await html2canvas(pages[i] as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,  // A4 width in pixels at 96 DPI
        height: 1123 // A4 height in pixels at 96 DPI
      });

      // Add image to PDF
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    }

    // Restore page indicators
    indicators.forEach(ind => (ind as HTMLElement).style.display = '');

    // Generate filename
    const fileName = data.personalInfo.fullName
      ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf';

    // Save PDF
    pdf.save(fileName);
    
    console.log('PDF generated successfully:', fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    
    // Restore page indicators in case of error
    const indicators = document.querySelectorAll('.page-break-indicator');
    indicators.forEach(ind => (ind as HTMLElement).style.display = '');
    
    alert('Failed to generate PDF. Please try again or contact support.');
    throw error;
  }
}

