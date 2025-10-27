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
    
    // 16px padding for text at page boundaries (only for text, not visual elements)
    const textPaddingPx = 16; // 16px padding
    const textPaddingMm = textPaddingPx / pxPerMm; // convert to mm
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      hotfixes: ['px_scaling']
    });

    // Only add pages if content exceeds one page
    console.log('Canvas height:', canvas.height, 'Page height px:', pageHeightPx);
    
    if (canvas.height <= pageHeightPx) {
      // Single page - fit entire content
      console.log('Single page detected');
      const pageImg = canvas.toDataURL('image/png');
      const contentHeightMm = (canvas.height / pxPerMm);
      pdf.addImage(pageImg, 'PNG', 0, 0, a4Width, contentHeightMm);
    } else {
      // Multiple pages - slice into A4-height chunks with 16px padding at page breaks
      console.log('Multiple pages detected');
      let sliceStartY = 0;
      let pageIndex = 0;
      
      while (sliceStartY < canvas.height) {
        const isLastPage = (sliceStartY + pageHeightPx) >= canvas.height;
        const sliceHeightPx = Math.min(pageHeightPx, canvas.height - sliceStartY);
        
        // Skip if slice is empty or too small
        if (sliceHeightPx <= 0) {
          break;
        }

        // Create a per-page canvas with extra height for padding
        const pageCanvas = document.createElement('canvas');
        pageCanvas.width = canvas.width;
        
        // Add padding space (16px) at top and bottom for text only (not for visual elements)
        let actualSliceHeight = sliceHeightPx;
        let sliceOffsetY = sliceStartY;
        
        if (pageIndex > 0) {
          // Add 16px padding at top for subsequent pages
          actualSliceHeight = Math.min(sliceHeightPx + textPaddingPx, canvas.height - sliceStartY);
        }
        
        if (!isLastPage) {
          // Reserve space for 16px bottom padding on all pages except last
          actualSliceHeight = Math.min(actualSliceHeight, sliceHeightPx + textPaddingPx);
        }
        
        pageCanvas.height = actualSliceHeight;
        const pageCtx = pageCanvas.getContext('2d');
        
        if (pageCtx) {
          // Fill with white background
          pageCtx.fillStyle = '#ffffff';
          pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
          
          // Draw the actual content slice with padding offset
          let drawOffsetY = 0;
          if (pageIndex > 0) {
            drawOffsetY = textPaddingPx; // Offset content down by 16px for top padding (blank space at top)
          }
          
          // Draw the content
          pageCtx.drawImage(
            canvas,
            0, sliceOffsetY, canvas.width, sliceHeightPx, // src
            0, drawOffsetY, canvas.width, sliceHeightPx // dest
          );
          
          // Add blank space at bottom for all pages except last (this creates 16px padding)
          if (!isLastPage && drawOffsetY === 0) {
            // For first page or pages without top padding, add bottom padding
            const bottomPaddingY = actualSliceHeight - textPaddingPx;
            pageCtx.fillStyle = '#ffffff';
            pageCtx.fillRect(0, bottomPaddingY, canvas.width, textPaddingPx);
          }
        }

        // Convert slice to image and add to PDF
        const pageImg = pageCanvas.toDataURL('image/png');
        const sliceHeightMm = actualSliceHeight / pxPerMm;

        // Only add a new page if we're not on the first page
        if (pageIndex > 0) {
          pdf.addPage();
        }
        pdf.addImage(pageImg, 'PNG', 0, 0, a4Width, sliceHeightMm);

        // Move to next slice, accounting for padding in slice selection
        sliceStartY += sliceHeightPx;
        pageIndex += 1;
        
        console.log(`Added page ${pageIndex}, height: ${sliceHeightMm}mm, padding: ${textPaddingMm}mm`);
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

