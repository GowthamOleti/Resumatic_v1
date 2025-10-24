import { ResumeData } from '../../types';
import { ensureProtocol } from '../../utils/urlHelper';

interface TemplateProps {
  data: ResumeData;
}

export default function CreativeTemplate({ data }: TemplateProps) {
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
      padding: '12px',
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      color: '#1f2937',
      lineHeight: '1.5',
      boxSizing: 'border-box'
    }}>
      {/* Header with Color Accent */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '36px 32px',
        marginBottom: '28px'
      }}>
        <h1 style={{ 
          fontSize: '38px', 
          fontWeight: '800', 
          marginBottom: '6px', 
          color: '#ffffff',
          letterSpacing: '-0.8px',
          lineHeight: '1.1'
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div style={{ 
          fontSize: '15px', 
          color: '#e0e7ff',
          fontWeight: '500',
          marginBottom: '12px'
        }}>
          Creative Professional
        </div>
        <div style={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '12px', 
          fontSize: '12px', 
          color: '#ffffff',
          marginTop: '14px'
        }}>
          {personalInfo.email && (
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.15)', 
              padding: '6px 12px', 
              borderRadius: '6px',
              backdropFilter: 'blur(10px)'
            }}>
              {personalInfo.email}
            </div>
          )}
          {personalInfo.phone && (
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.15)', 
              padding: '6px 12px', 
              borderRadius: '6px',
              backdropFilter: 'blur(10px)'
            }}>
              {personalInfo.phone}
            </div>
          )}
          {personalInfo.location && (
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.15)', 
              padding: '6px 12px', 
              borderRadius: '6px',
              backdropFilter: 'blur(10px)'
            }}>
              {personalInfo.location}
            </div>
          )}
          {personalInfo.linkedin && (
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.15)', 
              padding: '6px 12px', 
              borderRadius: '6px',
              backdropFilter: 'blur(10px)'
            }}>
              <a href={ensureProtocol(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>{personalInfo.linkedin}</a>
            </div>
          )}
          {personalInfo.website && (
            <div style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.15)', 
              padding: '6px 12px', 
              borderRadius: '6px',
              backdropFilter: 'blur(10px)'
            }}>
              <a href={ensureProtocol(personalInfo.website)} target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none' }}>{personalInfo.website}</a>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '0 32px 32px' }}>
        {/* Summary */}
        {personalInfo.summary && (
          <div style={{ marginBottom: '28px' }}>
            <div style={{ 
              fontSize: '13.5px', 
              lineHeight: '1.7', 
              color: '#4b5563',
              padding: '16px',
              backgroundColor: '#f3f4f6',
              borderRadius: '12px',
              borderLeft: '4px solid #667eea'
            }}>
              {personalInfo.summary}
            </div>
          </div>
        )}

        {/* Two Column Layout */}
        <div style={{ display: 'flex', gap: '24px' }}>
          {/* Left Column */}
          <div style={{ flex: '1.5' }}>
            {/* Work Experience */}
            {workExperience.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  marginBottom: '16px', 
                  color: '#667eea',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ 
                    width: '6px', 
                    height: '6px', 
                    backgroundColor: '#667eea', 
                    borderRadius: '50%',
                    display: 'inline-block'
                  }} />
                  Experience
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {workExperience.map((exp) => (
                    <div key={exp.id} style={{ 
                      paddingLeft: '18px',
                      borderLeft: '2px solid #e5e7eb',
                      position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: '-5px',
                        top: '6px',
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#667eea',
                        borderRadius: '50%',
                        border: '2px solid #ffffff'
                      }} />
                      <h3 style={{ 
                        fontSize: '15px', 
                        fontWeight: '700', 
                        color: '#1f2937',
                        marginBottom: '4px'
                      }}>
                        {exp.position}
                      </h3>
                      <div style={{ 
                        fontSize: '13px', 
                        color: '#667eea',
                        fontWeight: '600',
                        marginBottom: '2px'
                      }}>
                        {exp.company}
                      </div>
                      <div style={{ 
                        fontSize: '11.5px', 
                        color: '#9ca3af',
                        marginBottom: '8px'
                      }}>
                        {exp.startDate} – {exp.current ? 'Present' : exp.endDate} {exp.location && `• ${exp.location}`}
                      </div>
                      {exp.description.some(d => d.trim()) && (
                        <ul style={{ 
                          marginLeft: '16px', 
                          color: '#4b5563', 
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
              <div style={{ marginBottom: '28px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  marginBottom: '16px', 
                  color: '#667eea',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ 
                    width: '6px', 
                    height: '6px', 
                    backgroundColor: '#667eea', 
                    borderRadius: '50%',
                    display: 'inline-block'
                  }} />
                  Projects
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {projects.map((project) => (
                    <div key={project.id} style={{ 
                      padding: '14px',
                      backgroundColor: '#f9fafb',
                      borderRadius: '10px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <div style={{ marginBottom: '6px' }}>
                        <h3 style={{ 
                          fontSize: '14px', 
                          fontWeight: '700', 
                          color: '#1f2937',
                          display: 'inline'
                        }}>
                          {project.name}
                        </h3>
                        <span style={{ 
                          fontSize: '11px', 
                          color: '#9ca3af',
                          marginLeft: '8px'
                        }}>
                          {project.date}
                        </span>
                      </div>
                      {project.description && (
                        <div style={{ 
                          fontSize: '12.5px', 
                          color: '#4b5563',
                          lineHeight: '1.6',
                          marginBottom: '6px'
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
                              fontSize: '10.5px',
                              padding: '3px 8px',
                              backgroundColor: '#e0e7ff',
                              color: '#667eea',
                              borderRadius: '4px',
                              fontWeight: '600'
                            }}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div style={{ width: '35%' }}>
            {/* Skills */}
            {skills.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  marginBottom: '14px', 
                  color: '#667eea',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ 
                    width: '6px', 
                    height: '6px', 
                    backgroundColor: '#667eea', 
                    borderRadius: '50%',
                    display: 'inline-block'
                  }} />
                  Skills
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {Object.entries(groupedSkills).map(([category, skillList]) => (
                    <div key={category}>
                      <div style={{ 
                        fontSize: '12px', 
                        fontWeight: '700', 
                        color: '#1f2937',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>
                        {category}
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        flexWrap: 'wrap', 
                        gap: '6px'
                      }}>
                        {skillList.map((skill, idx) => (
                          <span key={idx} style={{ 
                            fontSize: '11px',
                            padding: '4px 10px',
                            backgroundColor: '#f3f4f6',
                            color: '#4b5563',
                            borderRadius: '6px',
                            border: '1px solid #e5e7eb'
                          }}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  marginBottom: '14px', 
                  color: '#667eea',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ 
                    width: '6px', 
                    height: '6px', 
                    backgroundColor: '#667eea', 
                    borderRadius: '50%',
                    display: 'inline-block'
                  }} />
                  Education
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {education.map((edu) => (
                    <div key={edu.id}>
                      <h3 style={{ 
                        fontSize: '13px', 
                        fontWeight: '700', 
                        color: '#1f2937',
                        marginBottom: '3px',
                        lineHeight: '1.3'
                      }}>
                        {edu.degree}
                      </h3>
                      {edu.field && (
                        <div style={{ 
                          fontSize: '12px', 
                          color: '#667eea',
                          fontWeight: '600',
                          marginBottom: '2px'
                        }}>
                          {edu.field}
                        </div>
                      )}
                      <div style={{ fontSize: '11.5px', color: '#6b7280' }}>
                        {edu.school}
                      </div>
                      <div style={{ 
                        fontSize: '10.5px', 
                        color: '#9ca3af',
                        marginTop: '2px'
                      }}>
                        {edu.graduationDate}
                        {edu.gpa && ` • GPA: ${edu.gpa}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications.length > 0 && (
              <div style={{ marginBottom: '28px' }}>
                <h2 style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  marginBottom: '14px', 
                  color: '#667eea',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ 
                    width: '6px', 
                    height: '6px', 
                    backgroundColor: '#667eea', 
                    borderRadius: '50%',
                    display: 'inline-block'
                  }} />
                  Certifications
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {certifications.map((cert) => (
                    <div key={cert.id} style={{ fontSize: '11.5px' }}>
                      <div style={{ fontWeight: '700', color: '#1f2937', marginBottom: '2px' }}>
                        {cert.name}
                      </div>
                      <div style={{ color: '#6b7280' }}>{cert.issuer}</div>
                      <div style={{ color: '#9ca3af', fontSize: '10.5px', marginTop: '2px' }}>
                        {cert.date}
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
                  fontSize: '18px', 
                  fontWeight: '700', 
                  marginBottom: '14px', 
                  color: '#667eea',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{ 
                    width: '6px', 
                    height: '6px', 
                    backgroundColor: '#667eea', 
                    borderRadius: '50%',
                    display: 'inline-block'
                  }} />
                  Languages
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {languages.map((lang) => (
                    <div key={lang.id} style={{ fontSize: '11.5px', color: '#4b5563' }}>
                      <span style={{ fontWeight: '600', color: '#1f2937' }}>{lang.name}</span>
                      <span style={{ color: '#9ca3af', marginLeft: '6px' }}>— {lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

