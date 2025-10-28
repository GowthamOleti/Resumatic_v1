export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  gpa?: string;
  percentage?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  date: string;
}

export interface SpacingSettings {
  pageMargin: number; // in mm
  sectionSpacing: number; // in mm
  lineSpacing: number; // multiplier
  bulletSpacing: number; // in mm
  headerSpacing: number; // in mm
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  certifications: Certification[];
  projects: Project[];
  spacing?: SpacingSettings;
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'professional' | 'executive' | 'technical' | 'ugly';

export interface ATSScore {
  overall: number;
  contactInfo: number;
  workExperience: number;
  education: number;
  skills: number;
  formatting: number;
  keywords: number;
  suggestions: string[];
}

