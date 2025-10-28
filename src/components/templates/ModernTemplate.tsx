import { ResumeData } from '../../types';
import { ensureProtocol } from '../../utils/urlHelper';

interface TemplateProps {
  data: ResumeData;
}

export default function ModernTemplate({ data }: TemplateProps) {
  const { personalInfo, workExperience, education, skills, languages, certifications, projects, spacing } = data;
  
  // Default spacing values
  const defaultSpacing = {
    pageMargin: 20,
    sectionSpacing: 8,
    lineSpacing: 1.2,
    bulletSpacing: 4,
    headerSpacing: 6,
  };
  
  const spacingSettings = spacing || defaultSpacing;

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill.name);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div style={{ 
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", sans-serif',
      padding: `${spacingSettings.pageMargin}px`,
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      color: '#1f2937',
      lineHeight: spacingSettings.lineSpacing,
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{ marginBottom: `${spacingSettings.headerSpacing * 4}px`, paddingBottom: `${spacingSettings.headerSpacing * 2}px` }}>
        <h1 style={{ 
          fontSize: '32px', 
          fontWeight: '700', 
          marginBottom: '8px', 
          color: '#1f2937',
          letterSpacing: '-0.5px',
          lineHeight: '1.2'
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-start', 
          flexWrap: 'wrap', 
          gap: '4px 12px', 
          fontSize: '13px', 
          color: '#6b7280',
          lineHeight: '1.4'
        }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>•</span>}
          {personalInfo.linkedin && <a href={ensureProtocol(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{personalInfo.linkedin}</a>}
          {personalInfo.website && <span>•</span>}
          {personalInfo.website && <a href={ensureProtocol(personalInfo.website)} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{personalInfo.website}</a>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: `${spacingSettings.sectionSpacing * 3}px`, lineHeight: spacingSettings.lineSpacing, color: '#4b5563', fontSize: '13.5px' }}>
          {personalInfo.summary}
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div style={{ marginBottom: `${spacingSettings.sectionSpacing * 3}px` }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#3b82f6', 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Experience
          </h2>
          {workExperience.map((exp, index) => (
            <div key={exp.id} style={{ marginBottom: index < workExperience.length - 1 ? '16px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937' }}>
                  {exp.position}
                </h3>
                <span style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '12px', fontStyle: 'italic' }}>
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ fontSize: '13.5px', color: '#6b7280', marginBottom: '6px', fontWeight: '500' }}>
                {exp.company}{exp.location && ` • ${exp.location}`}
              </div>
              {exp.description.some(d => d.trim()) && (
                <div style={{ marginTop: `${spacingSettings.bulletSpacing}px`, color: '#4b5563', fontSize: '13px' }}>
                  {exp.description.filter(d => d.trim()).map((desc, idx) => (
                    <div key={idx} style={{ marginBottom: `${spacingSettings.bulletSpacing}px`, lineHeight: spacingSettings.lineSpacing, paddingLeft: '0' }}>
                      - {desc}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#3b82f6', 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={project.id} style={{ marginBottom: index < projects.length - 1 ? '14px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937' }}>
                  {project.name}
                </h3>
                <span style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '12px', fontStyle: 'italic' }}>
                  {project.date}
                </span>
              </div>
              {project.description && (
                <div style={{ color: '#4b5563', marginBottom: '4px', lineHeight: '1.5', fontSize: '13px' }}>
                  {project.description}
                </div>
              )}
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                {project.technologies.length > 0 && (
                  <span><span style={{ fontWeight: '600' }}>Tech:</span> {project.technologies.join(', ')}</span>
                )}
                {project.url && project.technologies.length > 0 && <span> • </span>}
                {project.url && <span style={{ color: '#3b82f6' }}>{project.url}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#3b82f6', 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={edu.id} style={{ marginBottom: index < education.length - 1 ? '14px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1f2937' }}>
                  {edu.degree}{edu.field && ` in ${edu.field}`}
                </h3>
                <span style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '12px', fontStyle: 'italic' }}>
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
              <div style={{ fontSize: '13.5px', color: '#6b7280' }}>
                {edu.school}{edu.location && ` • ${edu.location}`}
                {edu.gpa && <span style={{ fontWeight: '500' }}> • GPA: {edu.gpa}</span>}
                {edu.percentage && <span style={{ fontWeight: '500' }}> • Percentage: {edu.percentage}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#3b82f6', 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(groupedSkills).map(([category, skillList]) => (
              <div key={category} style={{ fontSize: '13px', lineHeight: '1.5' }}>
                <span style={{ fontWeight: '600', color: '#1f2937', marginRight: '8px' }}>{category}:</span>
                <span style={{ color: '#4b5563' }}>{skillList.join(' • ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#3b82f6', 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Certifications
          </h2>
          {certifications.map((cert, index) => (
            <div key={cert.id} style={{ marginBottom: index < certifications.length - 1 ? '10px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{cert.name}</span>
                  <span style={{ fontSize: '13px', color: '#6b7280', marginLeft: '8px' }}>• {cert.issuer}</span>
                  {cert.url && <span style={{ fontSize: '12px', color: '#3b82f6', marginLeft: '8px' }}>• {cert.url}</span>}
                </div>
                <span style={{ fontSize: '12px', color: '#9ca3af', whiteSpace: 'nowrap', marginLeft: '12px', fontStyle: 'italic' }}>
                  {cert.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 style={{ 
            fontSize: '15px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#3b82f6', 
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Languages
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {languages.map((lang) => (
              <span key={lang.id} style={{ fontSize: '13px' }}>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>{lang.name}:</span>{' '}
                <span style={{ color: '#4b5563' }}>{lang.proficiency}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
