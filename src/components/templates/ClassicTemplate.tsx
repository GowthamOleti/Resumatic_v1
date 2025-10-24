import { ResumeData } from '../../types';
import { ensureProtocol } from '../../utils/urlHelper';

interface TemplateProps {
  data: ResumeData;
}

export default function ClassicTemplate({ data }: TemplateProps) {
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
      fontFamily: 'Georgia, "Times New Roman", serif',
      padding: '12px',
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      color: '#000',
      lineHeight: '1.5',
      boxSizing: 'border-box'
    }}>
      {/* Header - Classic Centered Style */}
      <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '14px', borderBottom: '2px solid #000' }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: '700', 
          marginBottom: '8px', 
          color: '#000', 
          letterSpacing: '2px',
          textTransform: 'uppercase',
          lineHeight: '1.2'
        }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div style={{ fontSize: '12px', color: '#333', lineHeight: '1.6' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span> | </span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {(personalInfo.email || personalInfo.phone) && personalInfo.location && <span> | </span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.website) && (
          <div style={{ fontSize: '11px', color: '#555', marginTop: '4px' }}>
            {personalInfo.linkedin && <a href={ensureProtocol(personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>{personalInfo.linkedin}</a>}
            {personalInfo.linkedin && personalInfo.website && <span> | </span>}
            {personalInfo.website && <a href={ensureProtocol(personalInfo.website)} target="_blank" rel="noopener noreferrer" style={{ color: '#0066cc', textDecoration: 'none' }}>{personalInfo.website}</a>}
          </div>
        )}
      </div>

      {/* Summary */}
      {personalInfo.summary && (
        <div style={{ marginBottom: '24px', lineHeight: '1.6', color: '#222', fontSize: '13px', textAlign: 'justify' }}>
          {personalInfo.summary}
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#000', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px', 
            borderBottom: '1.5px solid #000', 
            paddingBottom: '6px' 
          }}>
            Professional Experience
          </h2>
          {workExperience.map((exp, index) => (
            <div key={exp.id} style={{ marginBottom: index < workExperience.length - 1 ? '16px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#000' }}>
                  {exp.position}
                </h3>
                <span style={{ fontSize: '12px', color: '#555', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div style={{ fontSize: '13px', color: '#444', marginBottom: '6px', fontStyle: 'italic' }}>
                {exp.company}{exp.location && `, ${exp.location}`}
              </div>
              {exp.description.some(d => d.trim()) && (
                <ul style={{ marginLeft: '20px', color: '#333', fontSize: '12.5px', marginTop: '4px' }}>
                  {exp.description.filter(d => d.trim()).map((desc, idx) => (
                    <li key={idx} style={{ marginBottom: '4px', lineHeight: '1.5' }}>{desc}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#000', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px', 
            borderBottom: '1.5px solid #000', 
            paddingBottom: '6px' 
          }}>
            Projects
          </h2>
          {projects.map((project, index) => (
            <div key={project.id} style={{ marginBottom: index < projects.length - 1 ? '14px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#000' }}>
                  {project.name}
                </h3>
                <span style={{ fontSize: '12px', color: '#555', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {project.date}
                </span>
              </div>
              {project.description && (
                <div style={{ color: '#333', marginBottom: '4px', lineHeight: '1.5', fontSize: '12.5px' }}>
                  {project.description}
                </div>
              )}
              <div style={{ fontSize: '12px', color: '#555', marginTop: '4px' }}>
                {project.technologies.length > 0 && (
                  <span><span style={{ fontWeight: '600' }}>Technologies: </span>{project.technologies.join(', ')}</span>
                )}
                {project.url && project.technologies.length > 0 && <span> | </span>}
                {project.url && <span style={{ textDecoration: 'underline' }}>{project.url}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#000', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px', 
            borderBottom: '1.5px solid #000', 
            paddingBottom: '6px' 
          }}>
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={edu.id} style={{ marginBottom: index < education.length - 1 ? '14px' : '0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#000', marginBottom: '4px' }}>
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </h3>
                  <div style={{ fontSize: '13px', color: '#444', fontStyle: 'italic' }}>
                    {edu.school}{edu.location && `, ${edu.location}`}
                  </div>
                  {edu.gpa && (
                    <div style={{ fontSize: '12px', color: '#555', marginTop: '2px' }}>
                      GPA: {edu.gpa}
                    </div>
                  )}
                </div>
                <span style={{ fontSize: '12px', color: '#555', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '12px' }}>
                  {edu.graduationDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#000', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px', 
            borderBottom: '1.5px solid #000', 
            paddingBottom: '6px' 
          }}>
            Skills & Expertise
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {Object.entries(groupedSkills).map(([category, skillList]) => (
              <div key={category} style={{ fontSize: '12.5px', lineHeight: '1.5' }}>
                <span style={{ fontWeight: '700', color: '#000' }}>{category}: </span>
                <span style={{ color: '#333' }}>{skillList.join(', ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '14px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#000', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px', 
            borderBottom: '1.5px solid #000', 
            paddingBottom: '6px' 
          }}>
            Certifications
          </h2>
          {certifications.map((cert, index) => (
            <div key={cert.id} style={{ marginBottom: index < certifications.length - 1 ? '10px' : '0', fontSize: '12.5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontWeight: '700', color: '#000' }}>{cert.name}</span>
                  <span style={{ color: '#444' }}>, {cert.issuer}</span>
                  {cert.url && <span style={{ color: '#555', marginLeft: '4px', fontSize: '11px' }}>({cert.url})</span>}
                </div>
                <span style={{ fontSize: '12px', color: '#555', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: '12px' }}>
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
            fontSize: '14px', 
            fontWeight: '700', 
            marginBottom: '12px', 
            color: '#000', 
            textTransform: 'uppercase', 
            letterSpacing: '1.5px', 
            borderBottom: '1.5px solid #000', 
            paddingBottom: '6px' 
          }}>
            Languages
          </h2>
          <div style={{ fontSize: '12.5px' }}>
            {languages.map((lang, index) => (
              <span key={lang.id}>
                <span style={{ fontWeight: '700', color: '#000' }}>{lang.name}</span>
                <span style={{ color: '#333' }}> ({lang.proficiency})</span>
                {index < languages.length - 1 && <span style={{ color: '#555', margin: '0 8px' }}>•</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
