import { ResumeData } from '../../types';
import { ensureProtocol } from '../../utils/urlHelper';

interface TemplateProps {
  data: ResumeData;
}

export default function UglyTemplate({ data }: TemplateProps) {
  const { personalInfo, workExperience, education, skills, languages, certifications, projects } = data;

  return (
    <div style={{ 
      fontFamily: 'Comic Sans MS, cursive',
      padding: '12px',
      width: '100%',
      minHeight: '100%',
      backgroundColor: '#ffffff',
      color: '#000000',
      lineHeight: '1.2',
      boxSizing: 'border-box'
    }}>
      {/* Header */}
      <div style={{ 
        textAlign: 'center',
        marginBottom: '30px',
        transform: 'rotate(-2deg)',
        padding: '20px',
        backgroundColor: '#ff69b4',
        border: '5px dashed #00ff00',
        boxShadow: '10px 10px 0px #ff0000'
      }}>
        <h1 style={{ 
          fontSize: '48px', 
          fontWeight: 'bold',
          marginBottom: '10px',
          color: '#0000ff',
          textShadow: '3px 3px #ff0000, 6px 6px #00ff00',
          letterSpacing: '8px',
          textDecoration: 'underline wavy #ff00ff',
          fontFamily: 'Impact, fantasy'
        }}>
          {personalInfo.fullName?.toUpperCase() || 'YOUR NAME HERE'}
        </h1>
        <div style={{ 
          fontSize: '18px', 
          color: '#ff0000',
          fontWeight: 'bold',
          backgroundColor: '#ffff00',
          padding: '10px',
          border: '3px solid #0000ff',
          display: 'inline-block',
          transform: 'rotate(1deg)'
        }}>
          🚫 I DON'T WANT A JOB 🚫
        </div>
      </div>

      {/* Contact Info */}
      <div style={{ 
        marginBottom: '25px',
        backgroundColor: '#00ffff',
        padding: '15px',
        border: '4px double #ff00ff',
        transform: 'rotate(1deg)'
      }}>
        <h2 style={{ 
          fontSize: '28px',
          color: '#ff0000',
          textDecoration: 'underline',
          fontFamily: 'Courier New, monospace',
          marginBottom: '10px'
        }}>
          ~~~ CONTACT ME (OR DON'T) ~~~
        </h2>
        <div style={{ fontSize: '16px', color: '#0000ff', fontWeight: 'bold' }}>
          {personalInfo.email && <div style={{ marginBottom: '5px' }}>📧 {personalInfo.email}</div>}
          {personalInfo.phone && <div style={{ marginBottom: '5px' }}>☎️ {personalInfo.phone}</div>}
          {personalInfo.location && <div style={{ marginBottom: '5px' }}>🌍 {personalInfo.location}</div>}
          {personalInfo.linkedin && <div style={{ marginBottom: '5px' }}>💼 <a href={ensureProtocol(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#ff00ff', textDecoration: 'underline' }}>{personalInfo.linkedin}</a></div>}
          {personalInfo.website && <div>🌐 <a href={ensureProtocol(personalInfo.website)} target="_blank" rel="noopener noreferrer" style={{ color: '#ff00ff', textDecoration: 'underline' }}>{personalInfo.website}</a></div>}
        </div>
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ 
          marginBottom: '25px',
          backgroundColor: '#ffff00',
          padding: '15px',
          border: '5px solid #ff0000',
          transform: 'rotate(-1deg)'
        }}>
          <h2 style={{ 
            fontSize: '26px',
            color: '#00ff00',
            textShadow: '2px 2px #000000',
            fontFamily: 'Brush Script MT, cursive',
            marginBottom: '10px'
          }}>
            ★★★ About Me ★★★
          </h2>
          <p style={{ fontSize: '15px', color: '#0000ff', lineHeight: '1.8', fontStyle: 'italic' }}>
            {personalInfo.summary}
          </p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div style={{ 
          marginBottom: '25px',
          backgroundColor: '#ff00ff',
          padding: '15px',
          border: '6px ridge #00ff00',
          transform: 'rotate(1.5deg)'
        }}>
          <h2 style={{ 
            fontSize: '30px',
            color: '#ffff00',
            textDecoration: 'underline wavy',
            fontFamily: 'Papyrus, fantasy',
            marginBottom: '15px',
            textShadow: '2px 2px #000000'
          }}>
            💼💼 WORK STUFF 💼💼
          </h2>
          {workExperience.map((exp) => (
            <div key={exp.id} style={{ 
              marginBottom: '20px',
              backgroundColor: '#00ffff',
              padding: '12px',
              border: '3px dotted #ff0000'
            }}>
              <h3 style={{ fontSize: '20px', color: '#0000ff', fontWeight: 'bold', marginBottom: '5px' }}>
                {exp.position}
              </h3>
              <div style={{ fontSize: '16px', color: '#ff0000', fontWeight: 'bold', marginBottom: '8px' }}>
                {exp.company} | {exp.location}
              </div>
              <div style={{ fontSize: '14px', color: '#00ff00', marginBottom: '8px', fontStyle: 'italic' }}>
                {exp.startDate} - {exp.current ? 'Still Suffering Here' : exp.endDate}
              </div>
              <ul style={{ paddingLeft: '20px' }}>
                {exp.description.map((item, index) => (
                  item && <li key={index} style={{ marginBottom: '5px', color: '#000000', fontSize: '14px' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ 
          marginBottom: '25px',
          backgroundColor: '#00ff00',
          padding: '15px',
          border: '5px inset #ff00ff',
          transform: 'rotate(-1deg)'
        }}>
          <h2 style={{ 
            fontSize: '28px',
            color: '#ff0000',
            textDecoration: 'line-through',
            fontFamily: 'Courier New, monospace',
            marginBottom: '15px'
          }}>
            🎓 SCHOOL THINGS 🎓
          </h2>
          {education.map((edu) => (
            <div key={edu.id} style={{ 
              marginBottom: '15px',
              backgroundColor: '#ffff00',
              padding: '10px',
              border: '2px solid #0000ff'
            }}>
              <h3 style={{ fontSize: '18px', color: '#ff00ff', fontWeight: 'bold' }}>
                {edu.degree} - {edu.field}
              </h3>
              <div style={{ fontSize: '15px', color: '#0000ff' }}>
                {edu.school} | {edu.graduationDate}
              </div>
              {edu.gpa && (
                <div style={{ fontSize: '14px', color: '#ff0000', fontWeight: 'bold' }}>
                  GPA: {edu.gpa} (Who cares?)
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ 
          marginBottom: '25px',
          backgroundColor: '#ff0000',
          padding: '15px',
          border: '4px outset #00ff00',
          transform: 'rotate(1deg)'
        }}>
          <h2 style={{ 
            fontSize: '26px',
            color: '#ffff00',
            fontFamily: 'Impact, fantasy',
            marginBottom: '15px',
            textShadow: '3px 3px #000000'
          }}>
            ⚡ RANDOM SKILLS ⚡
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {skills.map((skill) => (
              <span
                key={skill.id}
                style={{
                  backgroundColor: '#00ffff',
                  color: '#ff00ff',
                  padding: '8px 15px',
                  border: '3px solid #0000ff',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  transform: `rotate(${Math.random() * 6 - 3}deg)`,
                  boxShadow: '4px 4px #000000'
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div style={{ 
          marginBottom: '25px',
          backgroundColor: '#00ffff',
          padding: '15px',
          border: '5px groove #ff0000'
        }}>
          <h2 style={{ 
            fontSize: '24px',
            color: '#ff00ff',
            fontFamily: 'Brush Script MT, cursive',
            marginBottom: '10px'
          }}>
            🗣️ Languages I Speak 🗣️
          </h2>
          {languages.map((lang) => (
            <div key={lang.id} style={{ fontSize: '15px', color: '#0000ff', marginBottom: '5px', fontWeight: 'bold' }}>
              • {lang.name} - {lang.proficiency}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ 
          marginBottom: '25px',
          backgroundColor: '#ffff00',
          padding: '15px',
          border: '4px dashed #ff00ff',
          transform: 'rotate(-1deg)'
        }}>
          <h2 style={{ 
            fontSize: '28px',
            color: '#00ff00',
            textShadow: '2px 2px #ff0000',
            fontFamily: 'Papyrus, fantasy',
            marginBottom: '15px'
          }}>
            🚀 MY PROJECTS 🚀
          </h2>
          {projects.map((project) => (
            <div key={project.id} style={{ marginBottom: '15px', backgroundColor: '#ff69b4', padding: '10px', border: '2px solid #0000ff' }}>
              <h3 style={{ fontSize: '18px', color: '#ffffff', fontWeight: 'bold' }}>
                {project.name}
              </h3>
              <p style={{ fontSize: '14px', color: '#000000', marginTop: '5px' }}>
                {project.description}
              </p>
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" style={{ color: '#0000ff', fontSize: '13px', textDecoration: 'underline' }}>
                  🔗 {project.url}
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ 
          backgroundColor: '#ff00ff',
          padding: '15px',
          border: '5px solid #00ff00',
          transform: 'rotate(1deg)'
        }}>
          <h2 style={{ 
            fontSize: '26px',
            color: '#ffff00',
            fontFamily: 'Impact, fantasy',
            marginBottom: '10px',
            textDecoration: 'underline'
          }}>
            🏆 CERTIFICATES 🏆
          </h2>
          {certifications.map((cert) => (
            <div key={cert.id} style={{ marginBottom: '10px', color: '#ffffff', fontSize: '14px', fontWeight: 'bold' }}>
              ★ {cert.name} - {cert.issuer} ({cert.date})
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div style={{ 
        marginTop: '30px',
        textAlign: 'center',
        fontSize: '20px',
        color: '#ff0000',
        fontWeight: 'bold',
        backgroundColor: '#00ff00',
        padding: '15px',
        border: '4px solid #0000ff',
        transform: 'rotate(-2deg)'
      }}>
        🎉 PLEASE DON'T HIRE ME 🎉
      </div>
    </div>
  );
}

