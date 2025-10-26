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
    // Pixel density mapping to avoid rounding drift
    const pxPerMm = canvas.width / a4Width; // canvas pixels per mm
    const pageHeightPx = Math.floor(pxPerMm * a4Height); // page height in canvas pixels
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      hotfixes: ['px_scaling']
    });

    // Slice the tall canvas into discrete A4-height chunks (pixel-accurate, no overlap)
    let sliceStartY = 0;
    let pageIndex = 0;
    while (sliceStartY < canvas.height) {
      const sliceHeightPx = Math.min(pageHeightPx, canvas.height - sliceStartY);

      // Create a per-page canvas and draw the slice
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = sliceHeightPx;
      const pageCtx = pageCanvas.getContext('2d');
      if (pageCtx) {
        pageCtx.drawImage(
          canvas,
          0, sliceStartY, canvas.width, sliceHeightPx, // src
          0, 0, canvas.width, sliceHeightPx // dest
        );
      }

      // Convert slice to image and add to PDF
      const pageImg = pageCanvas.toDataURL('image/png');
      const sliceHeightMm = sliceHeightPx / pxPerMm;

      if (pageIndex > 0) {
        pdf.addPage();
      }
      pdf.addImage(pageImg, 'PNG', 0, 0, a4Width, sliceHeightMm);

      sliceStartY += sliceHeightPx;
      pageIndex += 1;
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

