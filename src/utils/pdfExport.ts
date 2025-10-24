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

    // Calculate dimensions for PDF (A4 size) with padding
    const padding = 10; // 10mm padding on all sides
    const a4Width = 210; // A4 width in mm
    const a4Height = 297; // A4 height in mm
    const imgWidth = a4Width - (2 * padding); // Width minus left and right padding
    const usablePageHeight = a4Height - (2 * padding); // Height minus top and bottom padding
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      hotfixes: ['px_scaling']
    });

    // Calculate how many pages we need
    const totalPages = Math.ceil(imgHeight / usablePageHeight);
    
    // Process each page separately by cropping the canvas
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      if (pageIndex > 0) {
        pdf.addPage();
      }
      
      // Calculate the portion of canvas to extract for this page
      const sourceY = pageIndex * usablePageHeight * (canvas.height / imgHeight);
      const sourceHeight = Math.min(
        usablePageHeight * (canvas.height / imgHeight),
        canvas.height - sourceY
      );
      
      // Create a temporary canvas for this page's content
      const pageCanvas = document.createElement('canvas');
      const pageCtx = pageCanvas.getContext('2d');
      
      if (!pageCtx) continue;
      
      // Set canvas size for this page
      pageCanvas.width = canvas.width;
      pageCanvas.height = sourceHeight;
      
      // Draw only the portion needed for this page
      pageCtx.drawImage(
        canvas,
        0, sourceY,                    // Source x, y
        canvas.width, sourceHeight,    // Source width, height
        0, 0,                          // Destination x, y
        canvas.width, sourceHeight     // Destination width, height
      );
      
      // Convert this page's canvas to image and add to PDF
      const pageImgData = pageCanvas.toDataURL('image/png');
      const pageImgHeight = (sourceHeight * imgWidth) / canvas.width;
      
      pdf.addImage(pageImgData, 'PNG', padding, padding, imgWidth, pageImgHeight);
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

