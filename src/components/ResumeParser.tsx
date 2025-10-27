import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { ResumeData } from '@/types';

interface ResumeParserProps {
  onParseComplete: (data: ResumeData) => void;
}

export default function ResumeParser({ onParseComplete }: ResumeParserProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      setErrorMessage('Please upload a PDF file');
      setUploadStatus('error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrorMessage('File size must be less than 5MB');
      setUploadStatus('error');
      return;
    }

    setIsUploading(true);
    setIsParsing(true);
    setUploadStatus('idle');
    setErrorMessage('');

    try {
      console.log('Starting resume parsing...');
      
      // For now, we'll use a simple text extraction approach
      // In a real implementation, you'd send this to a backend service
      const text = await extractTextFromPDF(file);
      console.log('Extracted text:', text);
      
      const parsedData = parseResumeText(text);
      console.log('Calling onParseComplete with:', parsedData);
      
      onParseComplete(parsedData);
      setUploadStatus('success');
    } catch (error) {
      console.error('Error parsing resume:', error);
      setErrorMessage('Failed to parse resume. Please try again.');
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
      setIsParsing(false);
    }
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        // For now, simulate PDF text extraction
        // In production, you'd use a proper PDF parsing library
        setTimeout(() => {
          const mockText = `John Doe
Software Engineer
john.doe@email.com
(555) 123-4567

EXPERIENCE
Software Engineer at Tech Corp (2020-2023)
- Developed web applications
- Led team of 5 developers

EDUCATION
Bachelor of Computer Science
University of Technology (2016-2020)`;
          resolve(mockText);
        }, 1500);
      } catch (error) {
        reject(error);
      }
    });
  };

  const parseResumeText = (text: string): ResumeData => {
    try {
      // Simple parsing logic - in production, use AI/ML for better extraction
      const lines = text.split('\n').filter(line => line.trim());
      
      const data: ResumeData = {
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          website: '',
          summary: ''
        },
        workExperience: [],
        education: [],
        skills: [],
        languages: [],
        certifications: [],
        projects: []
      };

      // Extract basic info safely
      if (lines.length > 0) {
        data.personalInfo.fullName = lines[0] || '';
      }
      
      // Find email
      const emailMatch = text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/);
      if (emailMatch) {
        data.personalInfo.email = emailMatch[0];
      }

      // Find phone
      const phoneMatch = text.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/);
      if (phoneMatch) {
        data.personalInfo.phone = phoneMatch[0];
      }

      // Simple experience extraction
      const experienceIndex = lines.findIndex(line => 
        line.toLowerCase().includes('experience') || 
        line.toLowerCase().includes('work history')
      );
      
      if (experienceIndex !== -1) {
        data.workExperience.push({
          id: '1',
          company: 'Extracted Company',
          position: 'Extracted Position',
          location: '',
          startDate: '2020',
          endDate: '2023',
          description: ['Experience details extracted from your resume. Please review and edit as needed.'],
          current: false
        });
      }

      // Simple education extraction
      const educationIndex = lines.findIndex(line => 
        line.toLowerCase().includes('education') || 
        line.toLowerCase().includes('degree')
      );
      
      if (educationIndex !== -1) {
        data.education.push({
          id: '1',
          school: 'Extracted University',
          degree: 'Bachelor',
          field: 'Computer Science',
          location: '',
          startDate: '2016',
          endDate: '2020',
          gpa: ''
        });
      }

      console.log('Parsed data:', data);
      return data;
    } catch (error) {
      console.error('Error in parseResumeText:', error);
      // Return empty data structure if parsing fails
      return {
        personalInfo: {
          fullName: '',
          email: '',
          phone: '',
          location: '',
          linkedin: '',
          website: '',
          summary: ''
        },
        workExperience: [],
        education: [],
        skills: [],
        languages: [],
        certifications: [],
        projects: []
      };
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Existing Resume
        </CardTitle>
        <CardDescription>
          Upload your PDF resume and we'll extract the information to get you started
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <div
            onClick={handleClick}
            className={`
              w-full max-w-md h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors
              ${uploadStatus === 'error' 
                ? 'border-red-300 bg-red-50 hover:bg-red-100' 
                : uploadStatus === 'success'
                ? 'border-green-300 bg-green-50'
                : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              }
            `}
          >
            {isParsing ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm text-gray-600">Parsing your resume...</p>
              </div>
            ) : uploadStatus === 'success' ? (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <p className="text-sm text-green-600 font-medium">Resume parsed successfully!</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <FileText className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PDF files only, max 5MB</p>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileUpload}
            className="hidden"
          />

          <Button 
            onClick={handleClick} 
            disabled={isUploading || isParsing}
            className="w-full max-w-md"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Choose PDF File
              </>
            )}
          </Button>

          {uploadStatus === 'error' && (
            <div className="flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="h-4 w-4" />
              {errorMessage}
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500 text-center">
          <p>Note: Resume parsing is in beta. Please review and edit the extracted information.</p>
        </div>
      </CardContent>
    </Card>
  );
}
