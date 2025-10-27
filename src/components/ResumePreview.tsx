import { ResumeData, TemplateType } from '../types';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
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
        case 'technical':
          return <TechnicalTemplate data={data} />;
        case 'ugly':
          return <UglyTemplate data={data} />;
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div id="resume-preview" className="resume-preview">
      {renderTemplate()}
    </div>
  );
}

