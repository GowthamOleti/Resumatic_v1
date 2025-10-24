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
    const pageHeight = a4Height;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      hotfixes: ['px_scaling']
    });

    let heightLeft = imgHeight;
    let position = padding; // Start with top padding

    // Convert canvas to high-quality image
    const imgData = canvas.toDataURL('image/png');
    
    // Add first page with padding
    pdf.addImage(imgData, 'PNG', padding, position, imgWidth, imgHeight);
    heightLeft -= (pageHeight - (2 * padding)); // Account for top and bottom padding

    // Add additional pages if content overflows
    while (heightLeft > 0) {
      position = heightLeft - imgHeight + padding;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', padding, position, imgWidth, imgHeight);
      heightLeft -= (pageHeight - (2 * padding));
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

