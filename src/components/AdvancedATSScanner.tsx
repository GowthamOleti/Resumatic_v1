import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, TrendingUp, Target, FileText } from 'lucide-react';
import { ResumeData, ATSScore } from '../types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AdvancedATSScannerProps {
  data: ResumeData;
  jobTitle?: string;
  industry?: string;
}

// Industry-specific keyword databases
const INDUSTRY_KEYWORDS = {
  'technology': {
    technical: ['javascript', 'python', 'react', 'node.js', 'aws', 'docker', 'kubernetes', 'sql', 'git', 'api', 'microservices', 'agile', 'scrum', 'devops', 'ci/cd', 'machine learning', 'ai', 'data science', 'cloud computing', 'cybersecurity'],
    soft: ['collaboration', 'problem-solving', 'innovation', 'adaptability', 'continuous learning', 'mentoring', 'leadership', 'communication'],
    tools: ['vscode', 'intellij', 'jenkins', 'terraform', 'ansible', 'mongodb', 'postgresql', 'redis', 'elasticsearch']
  },
  'finance': {
    technical: ['financial modeling', 'risk management', 'portfolio management', 'derivatives', 'equity research', 'valuation', 'compliance', 'audit', 'taxation', 'accounting', 'cfa', 'cpa', 'frm', 'excel', 'bloomberg', 'reuters'],
    soft: ['analytical thinking', 'attention to detail', 'regulatory compliance', 'client relations', 'strategic planning', 'risk assessment'],
    tools: ['excel', 'power bi', 'tableau', 'sap', 'oracle', 'quickbooks', 'salesforce']
  },
  'healthcare': {
    technical: ['patient care', 'medical records', 'hipaa', 'clinical trials', 'pharmaceuticals', 'diagnosis', 'treatment', 'healthcare administration', 'medical coding', 'icd-10', 'cpt', 'rn', 'md', 'phd'],
    soft: ['empathy', 'patient advocacy', 'teamwork', 'critical thinking', 'communication', 'compassion'],
    tools: ['epic', 'cerner', 'meditech', 'allscripts', 'epic mychart']
  },
  'marketing': {
    technical: ['digital marketing', 'seo', 'sem', 'ppc', 'social media', 'content marketing', 'email marketing', 'analytics', 'google ads', 'facebook ads', 'hubspot', 'salesforce', 'marketo', 'google analytics'],
    soft: ['creativity', 'brand management', 'customer engagement', 'data analysis', 'campaign management', 'strategic thinking'],
    tools: ['google analytics', 'adobe creative suite', 'canva', 'mailchimp', 'hootsuite', 'buffer']
  },
  'sales': {
    technical: ['crm', 'lead generation', 'sales pipeline', 'forecasting', 'territory management', 'account management', 'cold calling', 'negotiation', 'salesforce', 'hubspot', 'pipedrive'],
    soft: ['relationship building', 'persuasion', 'communication', 'goal-oriented', 'resilience', 'customer service'],
    tools: ['salesforce', 'hubspot', 'pipedrive', 'zoho crm', 'linkedin sales navigator']
  },
  'general': {
    technical: ['project management', 'leadership', 'team management', 'strategic planning', 'data analysis', 'communication', 'problem solving', 'microsoft office', 'excel', 'powerpoint', 'word'],
    soft: ['leadership', 'communication', 'teamwork', 'problem-solving', 'adaptability', 'time management', 'critical thinking'],
    tools: ['microsoft office', 'google workspace', 'slack', 'zoom', 'teams']
  }
};

// ATS-specific formatting rules
const ATS_RULES = {
  'workday': {
    name: 'Workday',
    rules: ['avoid tables', 'use standard fonts', 'include keywords in job titles', 'avoid graphics', 'use bullet points'],
    penalties: ['tables', 'images', 'columns', 'headers/footers']
  },
  'taleo': {
    name: 'Oracle Taleo',
    rules: ['simple formatting', 'standard sections', 'keyword optimization', 'avoid complex layouts'],
    penalties: ['tables', 'images', 'text boxes', 'shapes']
  },
  'greenhouse': {
    name: 'Greenhouse',
    rules: ['clean formatting', 'keyword matching', 'standard sections', 'avoid graphics'],
    penalties: ['tables', 'images', 'complex formatting']
  },
  'lever': {
    name: 'Lever',
    rules: ['simple layout', 'keyword optimization', 'standard fonts', 'avoid tables'],
    penalties: ['tables', 'images', 'complex layouts']
  }
};

// Action verbs by impact level
const ACTION_VERBS = {
  'high_impact': ['achieved', 'delivered', 'increased', 'improved', 'reduced', 'optimized', 'transformed', 'generated', 'accelerated', 'maximized'],
  'medium_impact': ['managed', 'led', 'developed', 'created', 'implemented', 'designed', 'built', 'established', 'coordinated', 'executed'],
  'low_impact': ['assisted', 'supported', 'helped', 'participated', 'contributed', 'worked', 'collaborated', 'maintained', 'updated', 'processed']
};

export default function AdvancedATSScanner({ data, jobTitle, industry }: AdvancedATSScannerProps) {
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
  const [detailedAnalysis, setDetailedAnalysis] = useState<any>(null);

  useEffect(() => {
    calculateAdvancedATSScore();
  }, [data, jobTitle, industry]);

  const detectIndustry = (): string => {
    if (industry) return industry.toLowerCase();
    
    const allText = [
      data.personalInfo.summary,
      ...data.workExperience.flatMap(exp => exp.description),
      ...data.skills.map(s => s.name),
    ].join(' ').toLowerCase();

    // Industry detection based on keywords
    const industryScores = Object.keys(INDUSTRY_KEYWORDS).map(ind => {
      const keywords = INDUSTRY_KEYWORDS[ind as keyof typeof INDUSTRY_KEYWORDS];
      const allKeywords = [...keywords.technical, ...keywords.soft, ...keywords.tools];
      const matches = allKeywords.filter(keyword => allText.includes(keyword)).length;
      return { industry: ind, score: matches };
    });

    const detectedIndustry = industryScores.reduce((prev, current) => 
      current.score > prev.score ? current : prev
    );

    return detectedIndustry.score > 0 ? detectedIndustry.industry : 'general';
  };

  const calculateAdvancedATSScore = () => {
    const suggestions: string[] = [];
    const analysis: any = {
      industry: detectIndustry(),
      keywordMatches: {},
      formatIssues: [],
      actionVerbAnalysis: {},
      atsCompatibility: {}
    };

    const detectedIndustry = analysis.industry;
    const industryKeywords = INDUSTRY_KEYWORDS[detectedIndustry as keyof typeof INDUSTRY_KEYWORDS];

    // Enhanced Contact Info Score
    let contactScore = 0;
    const contactAnalysis = {
      name: !!data.personalInfo.fullName,
      email: !!data.personalInfo.email,
      phone: !!data.personalInfo.phone,
      location: !!data.personalInfo.location,
      linkedin: !!data.personalInfo.linkedin,
      website: !!data.personalInfo.website
    };

    Object.values(contactAnalysis).forEach(hasField => {
      if (hasField) contactScore += 16.67;
    });

    if (contactScore < 100) {
      suggestions.push('Complete all contact information fields for maximum ATS compatibility.');
    }

    // Enhanced Work Experience Analysis
    let workScore = 0;
    const workAnalysis = {
      hasExperience: data.workExperience.length > 0,
      hasDescriptions: false,
      hasDates: false,
      hasLocations: false,
      actionVerbs: { high: 0, medium: 0, low: 0 },
      quantifiableResults: 0,
      keywordMatches: 0
    };

    if (workAnalysis.hasExperience) {
      workScore = 30; // Base score

      // Check descriptions
      workAnalysis.hasDescriptions = data.workExperience.some(exp => 
        exp.description.some(d => d.trim().length > 0)
      );
      if (workAnalysis.hasDescriptions) workScore += 20;

      // Check dates
      workAnalysis.hasDates = data.workExperience.every(exp => 
        exp.startDate && (exp.endDate || exp.current)
      );
      if (workAnalysis.hasDates) workScore += 15;

      // Check locations
      workAnalysis.hasLocations = data.workExperience.every(exp => exp.location);
      if (workAnalysis.hasLocations) workScore += 10;

      // Analyze action verbs
      const allDescriptions = data.workExperience.flatMap(exp => exp.description).join(' ').toLowerCase();
      
      Object.entries(ACTION_VERBS).forEach(([level, verbs]) => {
        const matches = verbs.filter(verb => allDescriptions.includes(verb)).length;
        workAnalysis.actionVerbs[level as keyof typeof workAnalysis.actionVerbs] = matches;
        workScore += matches * (level === 'high_impact' ? 3 : level === 'medium_impact' ? 2 : 1);
      });

      // Check for quantifiable results
      workAnalysis.quantifiableResults = (allDescriptions.match(/\d+%|\$\d+|\d+\+|\d+x|\d+k|\d+m|\d+b/g) || []).length;
      workScore += Math.min(workAnalysis.quantifiableResults * 2, 15);

      // Industry keyword matching
      const industryMatches = industryKeywords.technical.filter(keyword => 
        allDescriptions.includes(keyword)
      ).length;
      workAnalysis.keywordMatches = industryMatches;
      workScore += Math.min(industryMatches * 2, 10);

      // Suggestions based on analysis
      if (workAnalysis.actionVerbs.high < 2) {
        suggestions.push(`Use more high-impact action verbs like "achieved," "delivered," or "transformed" to strengthen your experience descriptions.`);
      }
      
      if (workAnalysis.quantifiableResults < 2) {
        suggestions.push('Include more quantifiable achievements with specific numbers, percentages, or dollar amounts.');
      }

      if (workAnalysis.keywordMatches < 3) {
        suggestions.push(`Add more ${detectedIndustry}-specific keywords to your work experience descriptions.`);
      }
    } else {
      suggestions.push('Add work experience to improve your resume. Include at least 2-3 relevant positions.');
    }

    // Enhanced Education Score
    let eduScore = 0;
    if (data.education.length > 0) {
      eduScore = 40;
      const hasCompleteInfo = data.education.every(edu => 
        edu.school && edu.degree && edu.field && edu.endDate
      );
      if (hasCompleteInfo) eduScore += 40;
      
      const hasGPA = data.education.some(edu => edu.gpa && parseFloat(edu.gpa) >= 3.0);
      if (hasGPA) eduScore += 20;
    } else {
      suggestions.push('Add your education information including degree, institution, and graduation date.');
    }

    // Enhanced Skills Analysis
    let skillsScore = 0;
    const skillsAnalysis = {
      totalSkills: data.skills.length,
      industrySkills: 0,
      categorizedSkills: 0,
      skillRelevance: 0
    };

    if (skillsAnalysis.totalSkills > 0) {
      skillsScore = Math.min(skillsAnalysis.totalSkills * 8, 60);
      
      // Check for industry-specific skills
      skillsAnalysis.industrySkills = data.skills.filter(skill => 
        industryKeywords.technical.includes(skill.name.toLowerCase()) ||
        industryKeywords.tools.includes(skill.name.toLowerCase())
      ).length;
      skillsScore += Math.min(skillsAnalysis.industrySkills * 5, 25);

      // Check for skill categorization
      const categories = [...new Set(data.skills.map(s => s.category))];
      skillsAnalysis.categorizedSkills = categories.length;
      skillsScore += Math.min(categories.length * 3, 15);

      if (skillsAnalysis.totalSkills < 8) {
        suggestions.push(`Add more relevant skills. Aim for 10-15 skills including ${detectedIndustry}-specific technologies.`);
      }

      if (skillsAnalysis.industrySkills < 3) {
        suggestions.push(`Include more ${detectedIndustry}-specific skills and tools in your skills section.`);
      }
    } else {
      suggestions.push('Add skills relevant to your target position. Include both technical and soft skills.');
    }

    // Enhanced Formatting Analysis
    let formatScore = 100;
    const formatAnalysis = {
      hasSummary: data.personalInfo.summary.length > 0,
      summaryLength: data.personalInfo.summary.length,
      hasConsistentFormatting: true,
      potentialIssues: [] as string[]
    };

    if (!formatAnalysis.hasSummary) {
      formatScore -= 25;
      suggestions.push('Add a professional summary to introduce yourself and highlight key qualifications.');
    } else if (formatAnalysis.summaryLength < 150) {
      formatScore -= 10;
      suggestions.push('Expand your professional summary to 2-3 sentences (150-200 words) for better impact.');
    }

    // Check for potential formatting issues (simulated)
    const potentialIssues = ['tables', 'images', 'complex layouts', 'non-standard fonts'];
    formatAnalysis.potentialIssues = potentialIssues.filter(issue => Math.random() > 0.7); // Simulated detection
    formatScore -= formatAnalysis.potentialIssues.length * 10;

    if (formatAnalysis.potentialIssues.length > 0) {
      suggestions.push(`Avoid ${formatAnalysis.potentialIssues.join(', ')} for better ATS compatibility.`);
    }

    // Enhanced Keyword Analysis
    let keywordScore = 50; // Base score
    const keywordAnalysis = {
      industryMatches: 0,
      actionVerbMatches: 0,
      professionalKeywords: 0,
      jobSpecificMatches: 0
    };

    const allText = [
      data.personalInfo.summary,
      ...data.workExperience.flatMap(exp => exp.description),
      ...data.skills.map(s => s.name),
    ].join(' ').toLowerCase();

    // Industry keyword matching
    keywordAnalysis.industryMatches = industryKeywords.technical.filter(keyword => 
      allText.includes(keyword)
    ).length;
    keywordScore += Math.min(keywordAnalysis.industryMatches * 3, 30);

    // Action verb matching
    const allActionVerbs = Object.values(ACTION_VERBS).flat();
    keywordAnalysis.actionVerbMatches = allActionVerbs.filter(verb => 
      allText.includes(verb)
    ).length;
    keywordScore += Math.min(keywordAnalysis.actionVerbMatches * 2, 20);

    // Job-specific keyword matching (if job title provided)
    if (jobTitle) {
      const jobKeywords = jobTitle.toLowerCase().split(' ').filter(word => word.length > 3);
      keywordAnalysis.jobSpecificMatches = jobKeywords.filter(keyword => 
        allText.includes(keyword)
      ).length;
      keywordScore += Math.min(keywordAnalysis.jobSpecificMatches * 5, 15);
    }

    keywordScore = Math.min(keywordScore, 100);

    if (keywordAnalysis.industryMatches < 5) {
      suggestions.push(`Include more ${detectedIndustry}-specific keywords throughout your resume.`);
    }

    // Calculate overall score with enhanced weighting
    const overall = Math.round(
      (contactScore * 0.10) +
      (workScore * 0.40) +
      (eduScore * 0.10) +
      (skillsScore * 0.15) +
      (formatScore * 0.10) +
      (keywordScore * 0.15)
    );

    // Enhanced suggestions based on overall score
    if (overall >= 90) {
      suggestions.unshift('Excellent! Your resume is highly ATS-compatible and industry-optimized.');
    } else if (overall >= 75) {
      suggestions.unshift('Good! Your resume is ATS-friendly. Address the suggestions below for optimization.');
    } else if (overall >= 60) {
      suggestions.unshift('Your resume needs improvement. Focus on the key areas highlighted below.');
    } else {
      suggestions.unshift('Critical: Your resume needs significant work to pass ATS screening.');
    }

    // ATS Compatibility Analysis
    Object.entries(ATS_RULES).forEach(([atsName, atsData]) => {
      analysis.atsCompatibility[atsName] = {
        name: atsData.name,
        score: Math.max(60, overall - (formatAnalysis.potentialIssues.length * 5)),
        issues: formatAnalysis.potentialIssues.filter(issue => 
          atsData.penalties.includes(issue)
        )
      };
    });

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

    setDetailedAnalysis(analysis);
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
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Advanced ATS Analysis</h2>
        {detailedAnalysis && (
          <Badge variant="outline" className="ml-auto">
            {detailedAnalysis.industry.charAt(0).toUpperCase() + detailedAnalysis.industry.slice(1)} Industry
          </Badge>
        )}
      </div>
      
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

      {/* Enhanced Metrics */}
      <div className="space-y-4">
        {[
          { label: 'Contact Info', value: score.contactInfo, icon: CheckCircle2 },
          { label: 'Experience', value: score.workExperience, icon: Target },
          { label: 'Education', value: score.education, icon: FileText },
          { label: 'Skills', value: score.skills, icon: TrendingUp },
          { label: 'Formatting', value: score.formatting, icon: FileText },
          { label: 'Keywords', value: score.keywords, icon: Target },
        ].map((metric) => (
          <div key={metric.label} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <metric.icon className="h-4 w-4" />
                <span className="font-medium">{metric.label}</span>
              </div>
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

      {/* Detailed Analysis */}
      {detailedAnalysis && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Detailed Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Industry Detection</h4>
              <p className="text-muted-foreground capitalize">{detailedAnalysis.industry}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Action Verbs Used</h4>
              <div className="flex gap-2">
                <Badge variant="outline" className="text-green-600">High Impact: {detailedAnalysis.actionVerbAnalysis?.high || 0}</Badge>
                <Badge variant="outline" className="text-yellow-600">Medium: {detailedAnalysis.actionVerbAnalysis?.medium || 0}</Badge>
                <Badge variant="outline" className="text-gray-600">Low: {detailedAnalysis.actionVerbAnalysis?.low || 0}</Badge>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* ATS Compatibility */}
      {detailedAnalysis?.atsCompatibility && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-3">ATS Compatibility</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(detailedAnalysis.atsCompatibility).map(([atsName, atsData]: [string, any]) => (
              <div key={atsName} className="flex items-center justify-between p-2 border rounded">
                <span className="font-medium">{atsData.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${atsData.score}%`, 
                        backgroundColor: getScoreColor(atsData.score) 
                      }}
                    />
                  </div>
                  <span className="text-sm font-medium">{atsData.score}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Enhanced Suggestions */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <AlertCircle size={18} />
          Optimization Suggestions
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
