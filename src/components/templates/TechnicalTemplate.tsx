import { ResumeData } from '../../types';
import { ensureProtocol } from '../../utils/urlHelper';

interface TemplateProps {
  data: ResumeData;
}

export default function TechnicalTemplate({ data }: TemplateProps) {
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
      fontFamily: '"JetBrains Mono", "Fira Code", "SF Mono", Monaco, "Courier New", monospace',
      padding: '32px',
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      color: '#1f2937',
      lineHeight: '1.5',
      boxSizing: 'border-box',
      fontSize: '12px'
    }}>
      {/* Header with Terminal Style */}
      <div style={{ 
        marginBottom: '24px',
        padding: '20px',
        backgroundColor: '#0f172a',
        borderRadius: '8px',
        color: '#ffffff',
        border: '2px solid #1e293b'
      }}>
        <div style={{ 
          fontSize: '10px', 
          color: '#64748b',
          marginBottom: '12px',
          fontFamily: 'monospace'
        }}>
          <span style={{ color: '#22c55e' }}>~/portfolio/resume</span>
          <span style={{ color: '#64748b' }}> $ cat personal_info.txt</span>
        </div>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          marginBottom: '8px', 
          color: '#10b981',
          letterSpacing: '-0.5px',
          lineHeight: '1.2'
        }}>
          {personalInfo.fullName || '> Your_Name'}
        </h1>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '8px 16px', 
          fontSize: '11.5px', 
          color: '#94a3b8',
          lineHeight: '1.6'
        }}>
          {personalInfo.email && (
            <div>
              <span style={{ color: '#38bdf8' }}>email:</span> {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div>
              <span style={{ color: '#38bdf8' }}>phone:</span> {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div>
              <span style={{ color: '#38bdf8' }}>location:</span> {personalInfo.location}
            </div>
          )}
          {personalInfo.linkedin && (
            <div>
              <span style={{ color: '#38bdf8' }}>linkedin:</span> <a href={ensureProtocol(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>{personalInfo.linkedin}</a>
            </div>
          )}
          {personalInfo.website && (
            <div>
              <span style={{ color: '#38bdf8' }}>website:</span> <a href={ensureProtocol(personalInfo.website)} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none' }}>{personalInfo.website}</a>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '13px', 
            fontWeight: '700', 
            marginBottom: '10px', 
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'monospace'
          }}>
            <span style={{ color: '#10b981' }}>#</span> About
          </h2>
          <div style={{ 
            fontSize: '12px', 
            lineHeight: '1.7', 
            color: '#475569',
            paddingLeft: '16px',
            borderLeft: '3px solid #e2e8f0'
          }}>
            {personalInfo.summary}
          </div>
        </div>
      )}

      {/* Skills - Priority Section for Technical Resume */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '13px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'monospace'
          }}>
            <span style={{ color: '#10b981' }}>#</span> Technical_Skills
          </h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '12px'
          }}>
            {Object.entries(groupedSkills).map(([category, skillList]) => (
              <div key={category} style={{ 
                padding: '12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px'
              }}>
                <div style={{ 
                  fontSize: '11px', 
                  fontWeight: '700', 
                  color: '#0f172a',
                  marginBottom: '6px',
                  fontFamily: 'monospace'
                }}>
                  <span style={{ color: '#10b981' }}>const</span> {category.toLowerCase().replace(/\s+/g, '_')} = [
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: '#475569',
                  paddingLeft: '12px',
                  lineHeight: '1.6'
                }}>
                  {skillList.map((skill, idx) => (
                    <div key={idx}>
                      <span style={{ color: '#64748b' }}>"</span>
                      <span style={{ color: '#0891b2' }}>{skill}</span>
                      <span style={{ color: '#64748b' }}>"</span>
                      {idx < skillList.length - 1 && <span style={{ color: '#64748b' }}>,</span>}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: '11px', color: '#64748b' }}>];</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '13px', 
            fontWeight: '700', 
            marginBottom: '14px', 
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'monospace'
          }}>
            <span style={{ color: '#10b981' }}>#</span> Work_Experience
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {workExperience.map((exp, index) => (
              <div key={exp.id} style={{ 
                padding: '14px',
                backgroundColor: '#f8fafc',
                borderRadius: '6px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px' }}>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ 
                      fontSize: '13px', 
                      fontWeight: '700', 
                      color: '#0f172a',
                      marginBottom: '3px'
                    }}>
                      <span style={{ color: '#10b981' }}>[{index + 1}]</span> {exp.position}
                    </h3>
                    <div style={{ 
                      fontSize: '11.5px', 
                      color: '#0891b2',
                      fontWeight: '600',
                      marginBottom: '2px'
                    }}>
                      @ {exp.company}
                    </div>
                  </div>
                  <div style={{ 
                    fontSize: '10px', 
                    color: '#64748b',
                    backgroundColor: '#e2e8f0',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    marginLeft: '12px'
                  }}>
                    {exp.startDate} → {exp.current ? 'now' : exp.endDate}
                  </div>
                </div>
                {exp.location && (
                  <div style={{ 
                    fontSize: '10.5px', 
                    color: '#64748b',
                    marginBottom: '8px'
                  }}>
                    📍 {exp.location}
                  </div>
                )}
                {exp.description.some(d => d.trim()) && (
                  <div style={{ marginTop: '8px', color: '#475569', fontSize: '11.5px', lineHeight: '1.6' }}>
                    {exp.description.filter(d => d.trim()).map((desc, idx) => (
                      <div key={idx} style={{ marginBottom: '4px' }}>
                        - {desc}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects - High Priority for Technical Resume */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '13px', 
            fontWeight: '700', 
            marginBottom: '14px', 
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'monospace'
          }}>
            <span style={{ color: '#10b981' }}>#</span> Featured_Projects
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {projects.map((project, index) => (
              <div key={project.id} style={{ 
                padding: '14px',
                backgroundColor: '#f8fafc',
                borderRadius: '6px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ marginBottom: '6px' }}>
                  <h3 style={{ 
                    fontSize: '13px', 
                    fontWeight: '700', 
                    color: '#0f172a',
                    marginBottom: '4px'
                  }}>
                    <span style={{ color: '#10b981' }}>project_{index + 1}:</span> {project.name}
                  </h3>
                  {project.url && (
                    <div style={{ 
                      fontSize: '10px', 
                      color: '#0891b2',
                      marginBottom: '6px'
                    }}>
                      🔗 {project.url}
                    </div>
                  )}
                </div>
                {project.description && (
                  <div style={{ 
                    fontSize: '11.5px', 
                    color: '#475569',
                    lineHeight: '1.6',
                    marginBottom: '8px'
                  }}>
                    {project.description}
                  </div>
                )}
                {project.technologies.length > 0 && (
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '6px',
                    marginTop: '8px'
                  }}>
                    {project.technologies.map((tech, idx) => (
                      <span key={idx} style={{ 
                        fontSize: '10px',
                        padding: '3px 8px',
                        backgroundColor: '#dbeafe',
                        color: '#0369a1',
                        borderRadius: '4px',
                        fontWeight: '600',
                        border: '1px solid #bfdbfe'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div style={{ 
                  fontSize: '10px', 
                  color: '#94a3b8',
                  marginTop: '8px'
                }}>
                  <span style={{ color: '#64748b' }}>date:</span> {project.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '13px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'monospace'
          }}>
            <span style={{ color: '#10b981' }}>#</span> Education
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {education.map((edu) => (
              <div key={edu.id} style={{ 
                padding: '12px',
                backgroundColor: '#f8fafc',
                borderRadius: '6px',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ 
                  fontSize: '12.5px', 
                  fontWeight: '700', 
                  color: '#0f172a',
                  marginBottom: '3px'
                }}>
                  {edu.degree}{edu.field && ` in ${edu.field}`}
                </h3>
                <div style={{ fontSize: '11.5px', color: '#0891b2', marginBottom: '3px' }}>
                  @ {edu.school}
                </div>
                <div style={{ fontSize: '10.5px', color: '#64748b' }}>
                  {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                  {edu.location && ` • ${edu.location}`}
                  {edu.gpa && ` • GPA: ${edu.gpa}`}
                  {edu.percentage && ` • Percentage: ${edu.percentage}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '13px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'monospace'
          }}>
            <span style={{ color: '#10b981' }}>#</span> Certifications
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {certifications.map((cert, index) => (
              <div key={cert.id} style={{ 
                display: 'flex',
                alignItems: 'start',
                gap: '12px',
                padding: '10px',
                backgroundColor: '#f8fafc',
                borderRadius: '6px',
                border: '1px solid #e2e8f0'
              }}>
                <span style={{ 
                  color: '#10b981',
                  fontSize: '10px',
                  fontWeight: '700',
                  minWidth: '20px'
                }}>
                  [{index + 1}]
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#0f172a', marginBottom: '2px' }}>
                    {cert.name}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#64748b' }}>
                    {cert.issuer} • {cert.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div>
          <h2 style={{ 
            fontSize: '13px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#0f172a',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'monospace'
          }}>
            <span style={{ color: '#10b981' }}>#</span> Languages
          </h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '10px'
          }}>
            {languages.map((lang) => (
              <div key={lang.id} style={{ 
                fontSize: '11px',
                padding: '8px 12px',
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '6px'
              }}>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>{lang.name}</span>
                <span style={{ color: '#64748b' }}> : </span>
                <span style={{ color: '#0891b2' }}>"{lang.proficiency}"</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

