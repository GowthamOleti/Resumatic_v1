import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { ResumeData, ATSScore } from '../types';
import { Card } from '@/components/ui/card';

interface ATSScannerProps {
  data: ResumeData;
}

export default function ATSScanner({ data }: ATSScannerProps) {
  const [score, setScore] = useState<ATSScore>({
    overall: 0,
    contactInfo: 0,
    workExperience: 0,
    education: 0,
    skills: 0,
    formatting: 0,
    keywords: 0,
    suggestions: [],
  });

  useEffect(() => {
    calculateATSScore();
  }, [data]);

  const calculateATSScore = () => {
    const suggestions: string[] = [];
    
    // Contact Info Score (0-100)
    let contactScore = 0;
    if (data.personalInfo.fullName) contactScore += 20;
    if (data.personalInfo.email) contactScore += 20;
    if (data.personalInfo.phone) contactScore += 20;
    if (data.personalInfo.location) contactScore += 20;
    if (data.personalInfo.linkedin || data.personalInfo.website) contactScore += 20;
    
    if (contactScore < 100) {
      suggestions.push('Add all contact information including email, phone, and location for better ATS compatibility.');
    }

    // Work Experience Score (0-100)
    let workScore = 0;
    if (data.workExperience.length > 0) {
      workScore = 40;
      const hasDescriptions = data.workExperience.some(exp => 
        exp.description.some(d => d.trim().length > 0)
      );
      if (hasDescriptions) workScore += 30;
      
      const hasDates = data.workExperience.every(exp => exp.startDate && (exp.endDate || exp.current));
      if (hasDates) workScore += 15;
      
      const hasLocations = data.workExperience.every(exp => exp.location);
      if (hasLocations) workScore += 15;
      
      // Check for action verbs and quantifiable achievements
      const descriptionText = data.workExperience
        .flatMap(exp => exp.description)
        .join(' ')
        .toLowerCase();
      
      const actionVerbs = ['led', 'managed', 'developed', 'created', 'improved', 'increased', 'reduced', 'implemented', 'designed', 'built', 'achieved', 'delivered'];
      const hasActionVerbs = actionVerbs.some(verb => descriptionText.includes(verb));
      
      if (!hasActionVerbs) {
        suggestions.push('Use strong action verbs (led, managed, developed, improved) in your work experience descriptions.');
      }
      
      const hasNumbers = /\d+/.test(descriptionText);
      if (!hasNumbers) {
        suggestions.push('Include quantifiable achievements with numbers and percentages in your experience bullets.');
      }
    } else {
      suggestions.push('Add work experience to improve your resume. Include at least 2-3 relevant positions.');
    }

    // Education Score (0-100)
    let eduScore = 0;
    if (data.education.length > 0) {
      eduScore = 50;
      const hasCompleteInfo = data.education.every(edu => 
        edu.school && edu.degree && edu.field && edu.graduationDate
      );
      if (hasCompleteInfo) eduScore += 50;
    } else {
      suggestions.push('Add your education information including degree, institution, and graduation date.');
    }

    // Skills Score (0-100)
    let skillsScore = 0;
    const skillCount = data.skills.length;
    if (skillCount > 0) {
      skillsScore = Math.min(100, skillCount * 10);
      
      if (skillCount < 5) {
        suggestions.push('Add more relevant skills. Aim for at least 8-12 skills relevant to your target role.');
      }
      
      const hasCategories = data.skills.some(s => s.category !== 'Technical');
      if (!hasCategories) {
        suggestions.push('Categorize your skills (Technical, Soft Skills, Languages, etc.) for better organization.');
      }
    } else {
      suggestions.push('Add skills relevant to your target position. Include both technical and soft skills.');
    }

    // Formatting Score (0-100)
    let formatScore = 100;
    const summaryLength = data.personalInfo.summary.length;
    if (summaryLength === 0) {
      formatScore -= 20;
      suggestions.push('Add a professional summary to introduce yourself and highlight key qualifications.');
    } else if (summaryLength < 100) {
      formatScore -= 10;
      suggestions.push('Expand your professional summary to 2-3 sentences (150-200 words) for better impact.');
    }

    // Keywords Score (0-100)
    let keywordScore = 70; // Base score
    const allText = [
      data.personalInfo.summary,
      ...data.workExperience.flatMap(exp => exp.description),
      ...data.skills.map(s => s.name),
    ].join(' ').toLowerCase();

    // Check for common professional keywords
    const professionalKeywords = ['team', 'project', 'manage', 'develop', 'lead', 'collaborate', 'analyze', 'design', 'implement'];
    const keywordCount = professionalKeywords.filter(kw => allText.includes(kw)).length;
    keywordScore = Math.min(100, 60 + (keywordCount * 4));

    if (keywordScore < 80) {
      suggestions.push('Include more industry-specific keywords and action-oriented language throughout your resume.');
    }

    // Calculate overall score
    const overall = Math.round(
      (contactScore * 0.15) +
      (workScore * 0.35) +
      (eduScore * 0.15) +
      (skillsScore * 0.15) +
      (formatScore * 0.10) +
      (keywordScore * 0.10)
    );

    // Add general suggestions based on overall score
    if (overall >= 90) {
      suggestions.unshift('Excellent! Your resume is highly ATS-compatible. Make final reviews and you\'re ready to apply.');
    } else if (overall >= 75) {
      suggestions.unshift('Good! Your resume is ATS-friendly. Address the suggestions below for optimization.');
    } else if (overall >= 60) {
      suggestions.unshift('Your resume needs improvement. Focus on the key areas highlighted below.');
    } else {
      suggestions.unshift('Critical: Your resume needs significant work to pass ATS screening. Address all suggestions.');
    }

    setScore({
      overall,
      contactInfo: contactScore,
      workExperience: workScore,
      education: eduScore,
      skills: skillsScore,
      formatting: formatScore,
      keywords: keywordScore,
      suggestions,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#22c55e';
    if (score >= 60) return '#eab308';
    return '#ef4444';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">ATS Score</h2>
      
      {/* Overall Score Circle */}
      <div className="flex flex-col items-center">
        <div 
          className="w-36 h-36 rounded-full flex flex-col items-center justify-center border-8 relative"
          style={{ borderColor: getScoreColor(score.overall) }}
        >
          <div className="text-5xl font-bold" style={{ color: getScoreColor(score.overall) }}>
            {score.overall}
          </div>
          <div className="text-sm text-muted-foreground mt-1">out of 100</div>
        </div>
        <div className="mt-3 text-lg font-semibold" style={{ color: getScoreColor(score.overall) }}>
          {getScoreLabel(score.overall)}
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        {[
          { label: 'Contact Info', value: score.contactInfo },
          { label: 'Experience', value: score.workExperience },
          { label: 'Education', value: score.education },
          { label: 'Skills', value: score.skills },
          { label: 'Formatting', value: score.formatting },
          { label: 'Keywords', value: score.keywords },
        ].map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{metric.label}</span>
              <span className="font-semibold">{metric.value}</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ 
                  width: `${metric.value}%`, 
                  backgroundColor: getScoreColor(metric.value) 
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertCircle size={18} />
          Suggestions
        </h3>
        <div className="space-y-2">
          {score.suggestions.map((suggestion, index) => (
            <Card key={index} className="p-3 border-l-4 border-l-blue-500">
              <p className="text-sm leading-relaxed">{suggestion}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
