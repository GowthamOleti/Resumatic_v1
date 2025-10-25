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

  return (
    <div className="resume-preview-container">
      {/* Page 1 */}
      <div className="a4-page">
        <div className="page-content">
          {renderTemplate()}
        </div>
        <div className="page-break-indicator">
          <span className="page-number">Page 1</span>
        </div>
      </div>
      
      {/* Page 2 - Only show if content overflows */}
      <div className="a4-page page-2">
        <div className="page-content">
          {/* This will be populated by CSS to show overflow content */}
        </div>
        <div className="page-break-indicator">
          <span className="page-number">Page 2</span>
        </div>
      </div>
    </div>
  );
}

