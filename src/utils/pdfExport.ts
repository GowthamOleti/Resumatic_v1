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
    const paddingMm = 8; // 8mm padding (much more visible than 2.1mm)
    const imgWidth = a4Width - (2 * paddingMm);
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    const pageHeight = a4Height;
    
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
    
    // Check if content fits on one page (accounting for padding)
    const availableHeight = pageHeight - (2 * paddingMm);
    
    if (imgHeight <= availableHeight) {
      // Single page - add image with padding
      pdf.addImage(imgData, 'PNG', paddingMm, paddingMm, imgWidth, imgHeight);
    } else {
      // Multi-page content - use simpler logic to avoid repetition
      let yPosition = paddingMm;
      let remainingHeight = imgHeight;
      
      while (remainingHeight > 0) {
        // Calculate how much of the image fits on current page
        const pageContentHeight = Math.min(remainingHeight, availableHeight);
        
        // Add image to current page
        pdf.addImage(imgData, 'PNG', paddingMm, yPosition, imgWidth, imgHeight);
        
        remainingHeight -= pageContentHeight;
        
        // If there's more content, add a new page
        if (remainingHeight > 0) {
          pdf.addPage();
          yPosition = paddingMm;
        }
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

