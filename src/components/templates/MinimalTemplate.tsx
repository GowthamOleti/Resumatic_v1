import { ResumeData } from '../../types';
import { ensureProtocol } from '../../utils/urlHelper';

interface TemplateProps {
  data: ResumeData;
}

export default function MinimalTemplate({ data }: TemplateProps) {
  const { personalInfo, workExperience, education, skills, languages, certifications, projects } = data;

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
      padding: '32px 40px',
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      color: '#000',
      lineHeight: '1.5',
      fontSize: '13px',
      boxSizing: 'border-box'
    }}>
      {/* Header - Ultra Minimal */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '300', 
          marginBottom: '8px', 
          color: '#000', 
          letterSpacing: '-0.5px',
          lineHeight: '1.1'
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '12px', color: '#666', display: 'flex', flexWrap: 'wrap', gap: '2px 10px', lineHeight: '1.4' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <a href={ensureProtocol(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: 'underline' }}>{personalInfo.linkedin}</a>}
          {personalInfo.website && <a href={ensureProtocol(personalInfo.website)} target="_blank" rel="noopener noreferrer" style={{ color: '#000000', textDecoration: 'underline' }}>{personalInfo.website}</a>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '28px', lineHeight: '1.6', color: '#333', fontSize: '13px' }}>
          {personalInfo.summary}
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '11px', 
            fontWeight: '600', 
            marginBottom: '14px', 
            color: '#000', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px' 
          }}>
            Experience
          </h2>
          {workExperience.map((exp, index) => (
            <div key={exp.id} style={{ marginBottom: index < workExperience.length - 1 ? '18px' : '0' }}>
              <div style={{ marginBottom: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>
                    {exp.position}
                  </h3>
                  <span style={{ fontSize: '11px', color: '#999', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div style={{ fontSize: '12.5px', color: '#666' }}>
                  {exp.company} · {exp.location}
                </div>
              </div>
              {exp.description.some(d => d.trim()) && (
                <div style={{ marginTop: '6px', color: '#444', fontSize: '12.5px' }}>
                  {exp.description.filter(d => d.trim()).map((desc, idx) => (
                    <div key={idx} style={{ marginBottom: '3px', lineHeight: '1.5' }}>
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
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '11px', 
            fontWeight: '600', 
            marginBottom: '14px', 
            color: '#000', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px' 
          }}>
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={project.id} style={{ marginBottom: index < projects.length - 1 ? '16px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>
                  {project.name}
                </h3>
                <span style={{ fontSize: '11px', color: '#999', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {project.date}
                </span>
              </div>
              {project.description && (
                <div style={{ color: '#444', marginBottom: '4px', lineHeight: '1.5', fontSize: '12.5px' }}>
                  {project.description}
                </div>
              )}
              <div style={{ fontSize: '11.5px', color: '#666', marginTop: '4px' }}>
                {project.technologies.length > 0 && <span>{project.technologies.join(' · ')}</span>}
                {project.url && project.technologies.length > 0 && <span> · </span>}
                {project.url && <span>{project.url}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '11px', 
            fontWeight: '600', 
            marginBottom: '14px', 
            color: '#000', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px' 
          }}>
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={edu.id} style={{ marginBottom: index < education.length - 1 ? '14px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '500', color: '#000' }}>
                  {edu.degree}{edu.field && ` in ${edu.field}`}
                </h3>
                <span style={{ fontSize: '11px', color: '#999', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
              <div style={{ fontSize: '12.5px', color: '#666' }}>
                {edu.school} · {edu.location}
                {edu.gpa && <span style={{ color: '#999', marginLeft: '6px' }}>(GPA: {edu.gpa})</span>}
                {edu.percentage && <span style={{ color: '#999', marginLeft: '6px' }}>(Percentage: {edu.percentage})</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '11px', 
            fontWeight: '600', 
            marginBottom: '14px', 
            color: '#000', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px' 
          }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(groupedSkills).map(([category, skillList]) => (
              <div key={category} style={{ fontSize: '12.5px', lineHeight: '1.4' }}>
                <span style={{ fontWeight: '500', color: '#000' }}>{category} </span>
                <span style={{ color: '#444' }}>{skillList.join(' · ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h2 style={{ 
            fontSize: '11px', 
            fontWeight: '600', 
            marginBottom: '14px', 
            color: '#000', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px' 
          }}>
            Certifications
          </h2>
          {certifications.map((cert, index) => (
            <div key={cert.id} style={{ marginBottom: index < certifications.length - 1 ? '10px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ flex: 1, fontSize: '12.5px' }}>
                  <span style={{ fontWeight: '500', color: '#000' }}>{cert.name}</span>
                  <span style={{ color: '#666', marginLeft: '6px' }}>· {cert.issuer}</span>
                  {cert.url && <span style={{ color: '#999', marginLeft: '6px', fontSize: '11px' }}>· {cert.url}</span>}
                </div>
                <span style={{ fontSize: '11px', color: '#999', whiteSpace: 'nowrap', marginLeft: '12px' }}>
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
            fontSize: '11px', 
            fontWeight: '600', 
            marginBottom: '14px', 
            color: '#000', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px' 
          }}>
            Languages
          </h2>
          <div style={{ fontSize: '12.5px', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            {languages.map((lang) => (
              <span key={lang.id}>
                <span style={{ fontWeight: '500', color: '#000' }}>{lang.name}</span>
                <span style={{ color: '#666' }}> {lang.proficiency}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
