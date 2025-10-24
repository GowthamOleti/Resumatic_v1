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

    // Calculate dimensions for PDF (A4 size) with minimal padding
    const padding = 5; // 5mm padding on all sides (reduced for more content space)
    const a4Width = 210; // A4 width in mm
    const a4Height = 297; // A4 height in mm
    const contentWidth = a4Width - (2 * padding); // Width minus padding
    const contentHeight = a4Height - (2 * padding); // Height minus padding
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
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
    
    let heightLeft = imgHeight;
    let currentPage = 0;

    // Add pages
    while (heightLeft > 0) {
      if (currentPage > 0) {
        pdf.addPage();
      }
      
      // Calculate position for this page
      const yPosition = padding - (currentPage * contentHeight);
      
      // Add the image (showing different portion on each page)
      pdf.addImage(imgData, 'PNG', padding, yPosition, imgWidth, imgHeight);
      
      heightLeft -= contentHeight;
      currentPage++;
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

