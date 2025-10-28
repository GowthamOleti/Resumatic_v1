import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadCloud, FileText, XCircle, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ResumeData } from '@/types';
import AdvancedATSScanner from './AdvancedATSScanner';

interface PDFATSUploaderProps {
  onParseComplete?: (data: ResumeData) => void;
}

export default function PDFATSUploader({ onParseComplete }: PDFATSUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'parsing' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string>('');
  const [parsedData, setParsedData] = useState<ResumeData | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (selectedFile.type !== 'application/pdf') {
      setError('Please select a PDF file');
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
      setError('File size must be less than 5MB');
      return;
    }
    
    setFile(selectedFile);
    setError('');
    setStatus('idle');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const extractTextFromPDF = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          // const arrayBuffer = e.target?.result as ArrayBuffer;
          
          // For client-side PDF parsing, we'll use a mock implementation
          // In a real implementation, you'd use pdf-parse or similar library
          // This is a simplified version that simulates PDF text extraction
          
          setTimeout(() => {
            // Mock extracted text - in reality, this would come from PDF parsing
            const mockText = `John Doe
Software Engineer
john.doe@email.com
(555) 123-4567
San Francisco, CA
linkedin.com/in/johndoe
johndoe.dev

PROFESSIONAL SUMMARY
Experienced software engineer with 5+ years of experience in full-stack development. 
Led development of scalable web applications serving 100,000+ users. 
Expert in React, Node.js, Python, and cloud technologies.

WORK EXPERIENCE
Senior Software Engineer | TechCorp Inc. | 2020 - Present
- Led development of microservices architecture serving 100,000+ daily active users
- Improved application performance by 40% through code optimization and caching
- Mentored 3 junior developers and conducted code reviews
- Collaborated with product team to deliver features on time and within budget

Software Engineer | StartupXYZ | 2018 - 2020
- Developed React-based frontend applications with TypeScript
- Built RESTful APIs using Node.js and Express
- Implemented automated testing increasing code coverage to 85%
- Participated in agile development process and sprint planning

EDUCATION
Bachelor of Science in Computer Science
University of California, Berkeley | 2014 - 2018
GPA: 3.7

SKILLS
Programming Languages: JavaScript, TypeScript, Python, Java, C++
Frameworks: React, Node.js, Express, Django, Spring Boot
Databases: PostgreSQL, MongoDB, Redis
Cloud: AWS, Docker, Kubernetes
Tools: Git, Jenkins, Jira, Figma

CERTIFICATIONS
AWS Certified Solutions Architect - Associate (2021)
Google Cloud Professional Developer (2020)`;
            
            resolve(mockText);
          }, 1500);
          
        } catch (error) {
          reject(new Error('Failed to parse PDF'));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsArrayBuffer(file);
    });
  };

  const parseResumeText = (text: string): ResumeData => {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line);
    
    const data: ResumeData = {
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

    // Extract personal info
    const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (emailMatch) data.personalInfo.email = emailMatch[1];

    const phoneMatch = text.match(/(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/);
    if (phoneMatch) data.personalInfo.phone = phoneMatch[1];

    const linkedinMatch = text.match(/(linkedin\.com\/in\/[a-zA-Z0-9-]+)/i);
    if (linkedinMatch) data.personalInfo.linkedin = linkedinMatch[1];

    const websiteMatch = text.match(/([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
    if (websiteMatch && !websiteMatch[1].includes('linkedin')) {
      data.personalInfo.website = websiteMatch[1];
    }

    // Extract name (usually first line)
    if (lines.length > 0) {
      data.personalInfo.fullName = lines[0];
    }

    // Extract location (look for city, state pattern)
    const locationMatch = text.match(/([A-Z][a-z]+(?: [A-Z][a-z]+)*,?\s*[A-Z]{2})/);
    if (locationMatch) data.personalInfo.location = locationMatch[1];

    // Extract summary
    const summaryMatch = text.match(/PROFESSIONAL SUMMARY\s*\n([^]*?)(?=WORK EXPERIENCE|EDUCATION|SKILLS)/i);
    if (summaryMatch) {
      data.personalInfo.summary = summaryMatch[1].trim();
    }

    // Extract work experience
    const workMatch = text.match(/WORK EXPERIENCE\s*\n([^]*?)(?=EDUCATION|SKILLS|CERTIFICATIONS)/i);
    if (workMatch) {
      const workText = workMatch[1];
      const workEntries = workText.split(/(?=\w+\s+\|\s+\w+)/);
      
      workEntries.forEach((entry, index) => {
        if (entry.trim()) {
          const lines = entry.trim().split('\n');
          const titleLine = lines[0];
          const titleMatch = titleLine.match(/(.+?)\s*\|\s*(.+?)\s*\|\s*(.+)/);
          
          if (titleMatch) {
            const [, position, company, dates] = titleMatch;
            const dateMatch = dates.match(/(\d{4})\s*-\s*(\d{4}|Present)/);
            
            data.workExperience.push({
              id: `work-${index}`,
              company: company.trim(),
              position: position.trim(),
              location: '',
              startDate: dateMatch ? dateMatch[1] : '',
              endDate: dateMatch ? (dateMatch[2] === 'Present' ? '' : dateMatch[2]) : '',
              current: dateMatch ? dateMatch[2] === 'Present' : false,
              description: lines.slice(1).filter(line => line.startsWith('-')).map(line => line.substring(1).trim()),
            });
          }
        }
      });
    }

    // Extract education
    const eduMatch = text.match(/EDUCATION\s*\n([^]*?)(?=SKILLS|CERTIFICATIONS|PROJECTS)/i);
    if (eduMatch) {
      const eduText = eduMatch[1];
      const eduLines = eduText.split('\n').filter(line => line.trim());
      
      if (eduLines.length >= 2) {
        data.education.push({
          id: 'edu-1',
          school: eduLines[1] || '',
          degree: eduLines[0] || '',
          field: '',
          location: '',
          startDate: '',
          endDate: '',
          gpa: '',
        });
      }
    }

    // Extract skills
    const skillsMatch = text.match(/SKILLS\s*\n([^]*?)(?=CERTIFICATIONS|PROJECTS|$)/i);
    if (skillsMatch) {
      const skillsText = skillsMatch[1];
      const skillLines = skillsText.split('\n').filter(line => line.trim());
      
      skillLines.forEach(line => {
        if (line.includes(':')) {
          const [category, skills] = line.split(':');
          const skillList = skills.split(',').map(s => s.trim()).filter(s => s);
          skillList.forEach(skill => {
            data.skills.push({
              id: `skill-${data.skills.length}`,
              name: skill,
              category: category.trim(),
            });
          });
        }
      });
    }

    return data;
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setStatus('uploading');

    try {
      setStatus('parsing');
      const text = await extractTextFromPDF(file);
      
      const parsedData = parseResumeText(text);
      setParsedData(parsedData);
      
      setStatus('success');
      
      if (onParseComplete) {
        onParseComplete(parsedData);
      }
      
    } catch (error) {
      setStatus('error');
      setError('Failed to parse PDF. Please try again.');
      console.error('PDF parsing error:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setStatus('idle');
    setError('');
    setParsedData(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Upload Resume for ATS Analysis</h2>
        <p className="text-gray-600">Upload your PDF resume to get an instant ATS compatibility score</p>
      </div>

      {/* File Upload Area */}
      <Card className={`p-6 border-2 border-dashed transition-colors ${
        isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}>
        <div
          className="text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <div className="space-y-2">
            <Label htmlFor="pdf-upload" className="text-lg font-medium cursor-pointer">
              {file ? file.name : 'Drop your PDF here or click to browse'}
            </Label>
            <Input
              id="pdf-upload"
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <p className="text-sm text-gray-500">PDF files only, max 5MB</p>
          </div>
        </div>
      </Card>

      {/* Status Messages */}
      {error && (
        <Card className="p-4 border-red-200 bg-red-50">
          <div className="flex items-center gap-2 text-red-700">
            <XCircle size={20} />
            <span>{error}</span>
          </div>
        </Card>
      )}

      {status === 'success' && (
        <Card className="p-4 border-green-200 bg-green-50">
          <div className="flex items-center gap-2 text-green-700">
            <CheckCircle2 size={20} />
            <span>PDF parsed successfully! ATS analysis below.</span>
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 justify-center">
        {file && status === 'idle' && (
          <Button onClick={handleUpload} disabled={isUploading}>
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <FileText className="mr-2 h-4 w-4" />
                Analyze ATS Score
              </>
            )}
          </Button>
        )}
        
        {status === 'success' && (
          <Button variant="outline" onClick={handleReset}>
            <XCircle className="mr-2 h-4 w-4" />
            Upload Another Resume
          </Button>
        )}
      </div>

      {/* ATS Analysis Results */}
      {parsedData && status === 'success' && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold">ATS Analysis Results</h3>
          </div>
          <AdvancedATSScanner data={parsedData} />
        </div>
      )}
    </div>
  );
}
