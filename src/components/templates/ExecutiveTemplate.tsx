import { ResumeData } from '../../types';
import { ensureProtocol } from '../../utils/urlHelper';

interface TemplateProps {
  data: ResumeData;
}

export default function ExecutiveTemplate({ data }: TemplateProps) {
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
      display: 'flex',
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      lineHeight: '1.5',
      boxSizing: 'border-box'
    }}>
      {/* Left Sidebar - Dark Navy */}
      <div style={{ 
        width: '35%', 
        backgroundColor: '#1e3a5f',
        color: '#ffffff',
        padding: '40px 28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px'
      }}>
        {/* Contact Info */}
        <div>
          <h3 style={{ 
            fontSize: '13px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#93c5fd',
            textTransform: 'uppercase',
            letterSpacing: '1.2px'
          }}>
            Contact
          </h3>
          <div style={{ fontSize: '11.5px', lineHeight: '1.7', color: '#e5e7eb' }}>
            {personalInfo.email && <div style={{ marginBottom: '6px', wordBreak: 'break-word' }}>{personalInfo.email}</div>}
            {personalInfo.phone && <div style={{ marginBottom: '6px' }}>{personalInfo.phone}</div>}
            {personalInfo.location && <div style={{ marginBottom: '6px' }}>{personalInfo.location}</div>}
            {personalInfo.linkedin && <div style={{ marginBottom: '6px', wordBreak: 'break-word' }}><a href={ensureProtocol(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#93c5fd', textDecoration: 'none' }}>{personalInfo.linkedin}</a></div>}
            {personalInfo.website && <div style={{ wordBreak: 'break-word' }}><a href={ensureProtocol(personalInfo.website)} target="_blank" rel="noopener noreferrer" style={{ color: '#93c5fd', textDecoration: 'none' }}>{personalInfo.website}</a></div>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div>
            <h3 style={{ 
              fontSize: '13px', 
              fontWeight: '700', 
              marginBottom: '12px', 
              color: '#93c5fd',
              textTransform: 'uppercase',
              letterSpacing: '1.2px'
            }}>
              Expertise
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {Object.entries(groupedSkills).map(([category, skillList]) => (
                <div key={category}>
                  <div style={{ fontSize: '11px', fontWeight: '600', color: '#93c5fd', marginBottom: '4px' }}>
                    {category}
                  </div>
                  <div style={{ fontSize: '11px', color: '#e5e7eb', lineHeight: '1.6' }}>
                    {skillList.join(' • ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h3 style={{ 
              fontSize: '13px', 
              fontWeight: '700', 
              marginBottom: '12px', 
              color: '#93c5fd',
              textTransform: 'uppercase',
              letterSpacing: '1.2px'
            }}>
              Languages
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {languages.map((lang) => (
                <div key={lang.id} style={{ fontSize: '11.5px', color: '#e5e7eb' }}>
                  <span style={{ fontWeight: '600' }}>{lang.name}</span>
                  <span style={{ opacity: 0.8, marginLeft: '4px' }}>({lang.proficiency})</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h3 style={{ 
              fontSize: '13px', 
              fontWeight: '700', 
              marginBottom: '12px', 
              color: '#93c5fd',
              textTransform: 'uppercase',
              letterSpacing: '1.2px'
            }}>
              Certifications
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {certifications.map((cert) => (
                <div key={cert.id} style={{ fontSize: '11px', color: '#e5e7eb', lineHeight: '1.5' }}>
                  <div style={{ fontWeight: '600', marginBottom: '2px' }}>{cert.name}</div>
                  <div style={{ opacity: 0.8 }}>{cert.issuer}</div>
                  <div style={{ opacity: 0.7, fontSize: '10px', marginTop: '2px' }}>{cert.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content Area */}
      <div style={{ 
        flex: 1, 
        padding: '40px 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px'
      }}>
        {/* Header */}
        <div>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: '700', 
            marginBottom: '8px', 
            color: '#1e3a5f',
            letterSpacing: '-0.5px',
            lineHeight: '1.1'
          }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          <div style={{ 
            fontSize: '15px', 
            color: '#64748b',
            fontWeight: '500',
            letterSpacing: '0.3px'
          }}>
            Executive Professional
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div>
            <h2 style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              marginBottom: '10px', 
              color: '#1e3a5f',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Professional Summary
            </h2>
            <div style={{ 
              fontSize: '13px', 
              lineHeight: '1.7', 
              color: '#475569',
              textAlign: 'justify'
            }}>
              {personalInfo.summary}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              marginBottom: '16px', 
              color: '#1e3a5f',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Professional Experience
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {workExperience.map((exp) => (
                <div key={exp.id}>
                  <div style={{ marginBottom: '6px' }}>
                    <h3 style={{ 
                      fontSize: '15px', 
                      fontWeight: '700', 
                      color: '#1e3a5f',
                      marginBottom: '3px'
                    }}>
                      {exp.position}
                    </h3>
                    <div style={{ 
                      fontSize: '13px', 
                      color: '#64748b',
                      fontWeight: '600'
                    }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                    <div style={{ 
                      fontSize: '11.5px', 
                      color: '#94a3b8',
                      fontStyle: 'italic',
                      marginTop: '2px'
                    }}>
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </div>
                  </div>
                  {exp.description.some(d => d.trim()) && (
                    <ul style={{ 
                      marginLeft: '16px', 
                      color: '#475569', 
                      fontSize: '12.5px',
                      lineHeight: '1.6'
                    }}>
                      {exp.description.filter(d => d.trim()).map((desc, idx) => (
                        <li key={idx} style={{ marginBottom: '4px' }}>{desc}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              marginBottom: '16px', 
              color: '#1e3a5f',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Key Projects
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {projects.map((project) => (
                <div key={project.id}>
                  <div style={{ marginBottom: '4px' }}>
                    <h3 style={{ 
                      fontSize: '14px', 
                      fontWeight: '700', 
                      color: '#1e3a5f',
                      display: 'inline'
                    }}>
                      {project.name}
                    </h3>
                    <span style={{ 
                      fontSize: '11.5px', 
                      color: '#94a3b8',
                      fontStyle: 'italic',
                      marginLeft: '8px'
                    }}>
                      {project.date}
                    </span>
                  </div>
                  {project.description && (
                    <div style={{ 
                      fontSize: '12.5px', 
                      color: '#475569',
                      lineHeight: '1.6',
                      marginBottom: '4px'
                    }}>
                      {project.description}
                    </div>
                  )}
                  {project.technologies.length > 0 && (
                    <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
                      <span style={{ fontWeight: '600' }}>Technologies:</span> {project.technologies.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              marginBottom: '16px', 
              color: '#1e3a5f',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Education
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 style={{ 
                    fontSize: '14px', 
                    fontWeight: '700', 
                    color: '#1e3a5f',
                    marginBottom: '3px'
                  }}>
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#64748b' }}>
                    {edu.school}
                    {edu.location && ` • ${edu.location}`}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </div>
                  <div style={{ 
                    fontSize: '11.5px', 
                    color: '#94a3b8',
                    fontStyle: 'italic',
                    marginTop: '2px'
                  }}>
                    {edu.graduationDate}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

