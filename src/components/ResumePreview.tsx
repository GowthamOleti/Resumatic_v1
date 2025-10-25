import { useState, useEffect, useRef } from 'react';
import { ResumeData, TemplateType } from '../types';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import TechnicalTemplate from './templates/TechnicalTemplate';
import UglyTemplate from './templates/UglyTemplate';

interface ResumePreviewProps {
  data: ResumeData;
  template: TemplateType;
}

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const [showPage2, setShowPage2] = useState(false);
  const page1Ref = useRef<HTMLDivElement>(null);

  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} />;
      case 'classic':
        return <ClassicTemplate data={data} />;
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'professional':
        return <ProfessionalTemplate data={data} />;
      case 'executive':
        return <ExecutiveTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'technical':
        return <TechnicalTemplate data={data} />;
      case 'ugly':
        return <UglyTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  useEffect(() => {
    // Check if content overflows page 1
    const checkOverflow = () => {
      if (page1Ref.current) {
        const pageContent = page1Ref.current.querySelector('.page-content');
        if (pageContent) {
          const contentHeight = pageContent.scrollHeight;
          const pageHeight = 1123; // A4 height in pixels
          const padding = 60; // 30px top + 30px bottom
          const availableHeight = pageHeight - padding;
          
          setShowPage2(contentHeight > availableHeight);
        }
      }
    };

    // Check overflow after content loads
    const timeoutId = setTimeout(checkOverflow, 100);
    
    return () => clearTimeout(timeoutId);
  }, [data, template]);

  return (
    <div className="resume-preview-container">
      {/* Page 1 */}
      <div className="a4-page" ref={page1Ref}>
        <div className="page-content">
          {renderTemplate()}
        </div>
        <div className="page-break-indicator">
          <span className="page-number">Page 1</span>
        </div>
      </div>
      
      {/* Page 2 - Show if content overflows */}
      {showPage2 && (
        <div className="a4-page page-2">
          <div className="page-content">
            <div className="overflow-content">
              {/* Show continuation content here */}
              <div style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '14px'
              }}>
                Content continues from Page 1...
              </div>
            </div>
          </div>
          <div className="page-break-indicator">
            <span className="page-number">Page 2</span>
          </div>
        </div>
      )}
    </div>
  );
}

