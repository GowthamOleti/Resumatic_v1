import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ResumeData, TemplateType } from '../types';

export async function exportToPDF(data: ResumeData, _template: TemplateType): Promise<void> {
  const resumeElement = document.getElementById('resume-preview');
  
  if (!resumeElement) {
    throw new Error('Resume preview element not found');
  }

  try {
    // Wait for any images/fonts to load
    await new Promise(resolve => setTimeout(resolve, 500));

    // Create canvas from the resume element with high quality
    const canvas = await html2canvas(resumeElement, {
      scale: 2, // High quality rendering
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      removeContainer: false,
      imageTimeout: 15000,
      windowWidth: 794, // A4 width at 96 DPI
      windowHeight: resumeElement.scrollHeight
    });

    // Calculate dimensions for PDF (A4 size)
    const a4Width = 210; // A4 width in mm
    const a4Height = 297; // A4 height in mm
    const marginX = 5; // Horizontal margin (5mm left/right)
    const marginY = 8; // Vertical margin (8mm top/bottom for page breaks)
    const imgWidth = a4Width - (marginX * 2); // Reduce width for margins
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = a4Height - (marginY * 2); // Usable page height with margins
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      hotfixes: ['px_scaling']
    });

    // Convert canvas to high-quality image
    const imgData = canvas.toDataURL('image/png');
    
    // Check if content fits on one page
    if (imgHeight <= pageHeight) {
      // Single page - fit to page with margins
      pdf.addImage(imgData, 'PNG', marginX, marginY, imgWidth, imgHeight);
    } else {
      // Multi-page content with margins at page breaks
      let heightLeft = imgHeight;
      let position = marginY; // Start with top margin on first page

      // Add first page
      pdf.addImage(imgData, 'PNG', marginX, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = (heightLeft - imgHeight) + marginY; // Adjust position with top margin
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', marginX, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
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

