import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Download, ArrowLeft, LayoutTemplate, RotateCcw } from 'lucide-react';
import { ResumeData, TemplateType } from '@/types';
import ResumeForm from '@/components/ResumeForm';
import AdvancedATSScanner from '@/components/AdvancedATSScanner';
import PDFATSUploader from '@/components/PDFATSUploader';
import TemplateSelector from '@/components/TemplateSelector';
import { exportToPDF } from '@/utils/pdfExport';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModernTemplate from '@/components/templates/ModernTemplate';
import ClassicTemplate from '@/components/templates/ClassicTemplate';
import MinimalTemplate from '@/components/templates/MinimalTemplate';
import ProfessionalTemplate from '@/components/templates/ProfessionalTemplate';
import ExecutiveTemplate from '@/components/templates/ExecutiveTemplate';
import TechnicalTemplate from '@/components/templates/TechnicalTemplate';
import UglyTemplate from '@/components/templates/UglyTemplate';

// LocalStorage keys
const STORAGE_KEY_RESUME_DATA = 'resumatic_resume_data';
const STORAGE_KEY_TEMPLATE = 'resumatic_selected_template';

const initialData: ResumeData = {
  personalInfo: {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarahjohnson',
    website: 'sarahjohnson.dev',
    summary: 'Results-driven Senior Product Manager with 8+ years of experience leading cross-functional teams to deliver innovative digital products. Proven track record of launching successful products that increased user engagement by 40% and revenue by $2M annually. Expert in agile methodologies, user research, and data-driven decision making.',
  },
  spacing: {
    pageMargin: 20,
    sectionSpacing: 8,
    lineSpacing: 1.2,
    bulletSpacing: 4,
    headerSpacing: 6,
  },
  workExperience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Product Manager',
      location: 'San Francisco, CA',
      startDate: 'Jan 2021',
      endDate: 'Present',
      current: true,
      description: [
        'Led product strategy and roadmap for a $10M ARR SaaS platform serving 50,000+ users',
        'Increased user engagement by 45% through data-driven feature prioritization and A/B testing',
        'Managed cross-functional team of 12 engineers, designers, and data analysts',
        'Launched 3 major product features that drove $2M in incremental annual revenue'
      ]
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Product Manager',
      location: 'San Francisco, CA',
      startDate: 'Jun 2018',
      endDate: 'Dec 2020',
      current: false,
      description: [
        'Owned end-to-end product development for mobile app with 100K+ downloads',
        'Conducted user research and competitive analysis to inform product strategy',
        'Improved app retention rate by 30% through onboarding optimization',
        'Collaborated with engineering team to reduce technical debt by 25%'
      ]
    },
    {
      id: '3',
      company: 'Digital Agency Co.',
      position: 'Associate Product Manager',
      location: 'New York, NY',
      startDate: 'Aug 2016',
      endDate: 'May 2018',
      current: false,
      description: [
        'Supported senior PM in managing product backlog and sprint planning',
        'Conducted user interviews and usability testing with 50+ participants',
        'Created detailed product specifications and wireframes using Figma',
        'Analyzed product metrics and presented insights to stakeholders'
      ]
    }
  ],
  education: [
    {
      id: '1',
      school: 'Stanford University',
      degree: 'Master of Business Administration',
      field: 'Technology Management',
      location: 'Stanford, CA',
      startDate: '2014',
      endDate: '2016',
      gpa: '3.8'
    },
    {
      id: '2',
      school: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2010',
      endDate: '2014',
      gpa: '3.7'
    }
  ],
  skills: [
    { id: '1', name: 'Product Strategy', category: 'Product Management' },
    { id: '2', name: 'Agile/Scrum', category: 'Product Management' },
    { id: '3', name: 'User Research', category: 'Product Management' },
    { id: '4', name: 'A/B Testing', category: 'Product Management' },
    { id: '5', name: 'SQL', category: 'Technical Skills' },
    { id: '6', name: 'Python', category: 'Technical Skills' },
    { id: '7', name: 'Google Analytics', category: 'Technical Skills' },
    { id: '8', name: 'Tableau', category: 'Technical Skills' },
    { id: '9', name: 'Jira', category: 'Tools' },
    { id: '10', name: 'Figma', category: 'Tools' },
    { id: '11', name: 'Mixpanel', category: 'Tools' },
    { id: '12', name: 'Amplitude', category: 'Tools' }
  ],
  languages: [
    { id: '1', name: 'English', proficiency: 'Native' },
    { id: '2', name: 'Spanish', proficiency: 'Professional Working' },
    { id: '3', name: 'Mandarin', proficiency: 'Conversational' }
  ],
  certifications: [
    {
      id: '1',
      name: 'Certified Scrum Product Owner (CSPO)',
      issuer: 'Scrum Alliance',
      date: '2020',
      url: 'scrumalliance.org/verify'
    },
    {
      id: '2',
      name: 'Google Analytics Individual Qualification',
      issuer: 'Google',
      date: '2021',
      url: 'skillshop.exceedlms.com'
    },
    {
      id: '3',
      name: 'Product Management Certificate',
      issuer: 'Product School',
      date: '2019',
      url: 'productschool.com'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'AI-Powered Recommendation Engine',
      description: 'Led development of machine learning recommendation system that increased user engagement by 35% and average session time by 8 minutes. Collaborated with data science team to implement collaborative filtering algorithms.',
      technologies: ['Python', 'TensorFlow', 'AWS', 'Redis'],
      url: 'github.com/sarahj/ml-recommender',
      date: '2022'
    },
    {
      id: '2',
      name: 'Mobile App Redesign',
      description: 'Spearheaded complete UI/UX redesign of mobile application based on user feedback and analytics. Improved app store rating from 3.2 to 4.7 stars and reduced user churn by 40%.',
      technologies: ['React Native', 'Figma', 'Firebase'],
      url: 'behance.net/sarahjohnson',
      date: '2021'
    },
    {
      id: '3',
      name: 'Customer Analytics Dashboard',
      description: 'Built comprehensive analytics dashboard for executive team to track key product metrics and KPIs. Enabled data-driven decision making across the organization.',
      technologies: ['Tableau', 'SQL', 'Python', 'Google BigQuery'],
      date: '2020'
    }
  ],
};

const emptyData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  workExperience: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  projects: [],
};

// Helper function to load data from localStorage
const loadResumeData = (): ResumeData => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY_RESUME_DATA);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Error loading resume data from localStorage:', error);
  }
  return initialData;
};

// Helper function to load template from localStorage
const loadTemplate = (): TemplateType => {
  try {
    const savedTemplate = localStorage.getItem(STORAGE_KEY_TEMPLATE);
    if (savedTemplate) {
      return savedTemplate as TemplateType;
    }
  } catch (error) {
    console.error('Error loading template from localStorage:', error);
  }
  return 'modern';
};

export default function BuilderPage() {
  const [resumeData, setResumeData] = useState<ResumeData>(loadResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(loadTemplate);
  const [isExporting, setIsExporting] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);

  // Save resume data to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_RESUME_DATA, JSON.stringify(resumeData));
    } catch (error) {
      console.error('Error saving resume data to localStorage:', error);
    }
  }, [resumeData]);

  // Save selected template to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TEMPLATE, selectedTemplate);
    } catch (error) {
      console.error('Error saving template to localStorage:', error);
    }
  }, [selectedTemplate]);

  const handleDataChange = (data: ResumeData) => {
    console.log('BuilderPage: handleDataChange called with:', data);
    try {
      setResumeData(data);
      console.log('BuilderPage: Resume data updated successfully');
    } catch (error) {
      console.error('BuilderPage: Error updating resume data:', error);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      await exportToPDF(resumeData, selectedTemplate);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear all data and start fresh? This action cannot be undone.')) {
      setResumeData(emptyData);
      // Clear localStorage
      try {
        localStorage.removeItem(STORAGE_KEY_RESUME_DATA);
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
    }
  };

  const getTemplateName = (template: TemplateType): string => {
    const names: Record<TemplateType, string> = {
      modern: 'Modern',
      classic: 'Classic',
      minimal: 'Minimal',
      professional: 'Professional',
    executive: 'Executive',
    technical: 'Technical',
    ugly: 'I Don\'t Want a Job'
    };
    return names[template];
  };

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate data={resumeData} />;
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />;
      case 'technical':
        return <TechnicalTemplate data={resumeData} />;
      case 'ugly':
        return <UglyTemplate data={resumeData} />;
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Template Selector Modal */}
      <TemplateSelector
        open={showTemplateSelector}
        onOpenChange={setShowTemplateSelector}
        selectedTemplate={selectedTemplate}
        onSelectTemplate={setSelectedTemplate}
      />

      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Logo */}
            <Link to="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity group">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 group-hover:text-primary transition-colors" />
              <img 
                src="https://static.wixstatic.com/media/5c0589_e30e6ff390554063b3ccb163b93366aa~mv2.png" 
                alt="Resumatic" 
                className="h-6 sm:h-8 w-auto"
              />
              <span className="text-lg sm:text-xl font-semibold text-gray-900">Resumatic</span>
            </Link>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Template Selector Button */}
              <Button
                variant="outline"
                onClick={() => setShowTemplateSelector(true)}
                className="gap-2"
                size="sm"
              >
                <LayoutTemplate className="h-4 w-4" />
                <span className="hidden sm:inline">{getTemplateName(selectedTemplate)}</span>
                <span className="sm:hidden">Template</span>
              </Button>

              {/* Download PDF Button */}
              <Button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="gap-2"
                size="sm"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">{isExporting ? 'Exporting...' : 'Download PDF'}</span>
                <span className="sm:hidden">PDF</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Tabs defaultValue="builder" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="builder">Resume Builder</TabsTrigger>
            <TabsTrigger value="upload">Upload & Analyze PDF</TabsTrigger>
          </TabsList>
          
          <TabsContent value="builder" className="space-y-6">
        {/* Form and Preview - Top Section */}
        <div className="grid lg:grid-cols-[420px_1fr] gap-4 sm:gap-6 mb-4 sm:mb-6">
          {/* Form Panel */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">
                  Resume Builder
                </h2>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="gap-2"
                  size="sm"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset</span>
                </Button>
              </div>
            </div>
            <div className="h-[600px] sm:h-[700px] lg:h-[750px] overflow-y-auto p-4 sm:p-6">
              <ResumeForm data={resumeData} onChange={handleDataChange} />
            </div>
          </div>

          {/* Preview Panel - Desktop */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden lg:block hidden">
            <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">
                  Preview
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTemplateSelector(true)}
                  className="gap-2 text-xs"
                >
                  <LayoutTemplate className="h-3.5 w-3.5" />
                  {getTemplateName(selectedTemplate)}
                </Button>
              </div>
            </div>
            
            <div className="h-[700px] lg:h-[750px] overflow-y-auto p-4 sm:p-6 bg-gray-50 flex items-start justify-center">
              <div className="shadow-lg rounded-lg overflow-hidden" style={{ width: '210mm', transform: 'scale(0.85)', transformOrigin: 'top center' }}>
                <div className="resume-preview">
                  {renderTemplate()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Preview - Below Form on Mobile */}
        <div className="lg:hidden mb-4 sm:mb-6">
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Preview</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTemplateSelector(true)}
                  className="gap-2 text-xs"
                >
                  <LayoutTemplate className="h-3.5 w-3.5" />
                  {getTemplateName(selectedTemplate)}
                </Button>
              </div>
            </div>
            <div className="p-4 bg-gray-50 overflow-auto flex items-start justify-center" style={{ minHeight: '500px' }}>
              <div className="shadow-lg rounded-lg overflow-hidden" style={{ 
                width: '210mm', 
                minWidth: '210mm', 
                minHeight: '297mm',
                transform: 'scale(0.45)', 
                transformOrigin: 'top center',
                marginBottom: '-400px'
              }}>
                <div className="resume-preview">
                  {renderTemplate()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Resume for PDF Export - No transforms or scaling */}
        <div style={{ position: 'absolute', left: '-9999px', top: 0 }} id="resume-preview">
          <div style={{ width: '210mm', backgroundColor: '#ffffff' }}>
            {renderTemplate()}
          </div>
        </div>

        {/* ATS Score - Bottom Section (Full Width) */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
          <h2 className="text-base font-semibold mb-4 text-gray-900">
            ATS Score Analysis
          </h2>
          <AdvancedATSScanner data={resumeData} />
        </div>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-6">
            <PDFATSUploader onParseComplete={handleDataChange} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

