import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumeData, TemplateType } from '../types';

export async function exportToPDF(data: ResumeData, _template: TemplateType): Promise<void> {
  try {
    // Find all A4 pages in the preview
    const pages = document.querySelectorAll('.a4-page .page-content');
    
    if (!pages || pages.length === 0) {
      throw new Error('Resume preview element not found');
    }

    // Wait for any images/fonts to load
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    // Capture each page
    for (let i = 0; i < pages.length; i++) {
      // Add new page for subsequent pages
      if (i > 0) {
        pdf.addPage();
      }

      // Create canvas from the page element
      const canvas = await html2canvas(pages[i] as HTMLElement, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Add image to PDF with no extra padding (preview already has padding)
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210; // Full A4 width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    }

    // Generate filename
    const fileName = data.personalInfo.fullName
      ? `${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
      : 'Resume.pdf';

    // Save PDF
    pdf.save(fileName);
    
    console.log('PDF generated successfully:', fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again or contact support.');
    throw error;
  }
}

