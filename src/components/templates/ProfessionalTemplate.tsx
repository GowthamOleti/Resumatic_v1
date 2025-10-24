import { ResumeData } from '../../types';

interface TemplateProps {
  data: ResumeData;
}

export default function ProfessionalTemplate({ data }: TemplateProps) {
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
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: '0',
      width: '100%',
      height: '100%',
      backgroundColor: '#ffffff',
      lineHeight: '1.5',
      boxSizing: 'border-box'
    }}>
      {/* Left Sidebar with Background */}
      <div style={{ backgroundColor: '#f8fafc', padding: '32px 20px', borderRight: '3px solid #e2e8f0' }}>
        {/* Contact Info */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ 
            fontSize: '11px', 
            fontWeight: '700', 
            marginBottom: '10px', 
            color: '#1e293b', 
            textTransform: 'uppercase', 
            letterSpacing: '1.2px' 
          }}>
            Contact
          </h2>
          <div style={{ fontSize: '10.5px', color: '#475569', lineHeight: '1.7' }}>
            {personalInfo.email && <div style={{ marginBottom: '6px', wordBreak: 'break-word' }}>{personalInfo.email}</div>}
            {personalInfo.phone && <div style={{ marginBottom: '6px' }}>{personalInfo.phone}</div>}
            {personalInfo.location && <div style={{ marginBottom: '6px' }}>{personalInfo.location}</div>}
            {personalInfo.linkedin && <div style={{ marginBottom: '6px', wordBreak: 'break-word' }}><a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{personalInfo.linkedin}</a></div>}
            {personalInfo.website && <div style={{ wordBreak: 'break-word' }}><a href={personalInfo.website} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>{personalInfo.website}</a></div>}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              marginBottom: '10px', 
              color: '#1e293b', 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px' 
            }}>
              Skills
            </h2>
            {Object.entries(groupedSkills).map(([category, skillList]) => (
              <div key={category} style={{ marginBottom: '14px' }}>
                <h3 style={{ fontSize: '11px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  {category}
                </h3>
                <div style={{ fontSize: '10px', color: '#64748b', lineHeight: '1.6' }}>
                  {skillList.join(', ')}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              marginBottom: '10px', 
              color: '#1e293b', 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px' 
            }}>
              Languages
            </h2>
            {languages.map((lang) => (
              <div key={lang.id} style={{ marginBottom: '8px', fontSize: '10.5px' }}>
                <div style={{ fontWeight: '600', color: '#334155' }}>{lang.name}</div>
                <div style={{ color: '#64748b', fontSize: '10px' }}>{lang.proficiency}</div>
              </div>
            ))}
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              marginBottom: '10px', 
              color: '#1e293b', 
              textTransform: 'uppercase', 
              letterSpacing: '1.2px' 
            }}>
              Certifications
            </h2>
            {certifications.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '12px' }}>
                <h3 style={{ fontSize: '10.5px', fontWeight: '600', color: '#334155', marginBottom: '2px', lineHeight: '1.3' }}>
                  {cert.name}
                </h3>
                <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '2px' }}>
                  {cert.issuer}
                </div>
                <div style={{ fontSize: '9.5px', color: '#94a3b8' }}>
                  {cert.date}
                </div>
                {cert.url && (
                  <div style={{ fontSize: '9px', color: '#3b82f6', marginTop: '2px', wordBreak: 'break-word' }}>
                    {cert.url}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Content */}
      <div style={{ padding: '32px' }}>
        {/* Header */}
        <div style={{ marginBottom: '24px', paddingBottom: '14px', borderBottom: '2px solid #e2e8f0' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px', color: '#1e293b', letterSpacing: '-0.5px', lineHeight: '1.1' }}>
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {personalInfo.summary && (
            <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#475569', marginTop: '8px' }}>
              {personalInfo.summary}
            </p>
          )}
        </div>

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              marginBottom: '14px', 
              color: '#1e293b', 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
            }}>
              Experience
            </h2>
            {workExperience.map((exp, index) => (
              <div key={exp.id} style={{ marginBottom: index < workExperience.length - 1 ? '18px' : '0' }}>
                <div style={{ marginBottom: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
                      {exp.position}
                    </h3>
                    <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '12px', fontStyle: 'italic' }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                    {exp.company} • {exp.location}
                  </div>
                </div>
                {exp.description.some(d => d.trim()) && (
                  <ul style={{ marginLeft: '16px', color: '#475569', fontSize: '12.5px', marginTop: '6px' }}>
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
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              marginBottom: '14px', 
              color: '#1e293b', 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
            }}>
              Projects
            </h2>
            {projects.map((project, index) => (
              <div key={project.id} style={{ marginBottom: index < projects.length - 1 ? '16px' : '0' }}>
                <div style={{ marginBottom: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
                      {project.name}
                    </h3>
                    <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '12px', fontStyle: 'italic' }}>
                      {project.date}
                    </span>
                  </div>
                </div>
                {project.description && (
                  <div style={{ color: '#475569', marginBottom: '6px', lineHeight: '1.5', fontSize: '12.5px' }}>
                    {project.description}
                  </div>
                )}
                <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px' }}>
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
          <div>
            <h2 style={{ 
              fontSize: '14px', 
              fontWeight: '700', 
              marginBottom: '14px', 
              color: '#1e293b', 
              textTransform: 'uppercase', 
              letterSpacing: '1px' 
            }}>
              Education
            </h2>
            {education.map((edu, index) => (
              <div key={edu.id} style={{ marginBottom: index < education.length - 1 ? '14px' : '0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b' }}>
                    {edu.degree}{edu.field && ` in ${edu.field}`}
                  </h3>
                  <span style={{ fontSize: '11px', color: '#94a3b8', whiteSpace: 'nowrap', marginLeft: '12px', fontStyle: 'italic' }}>
                    {edu.graduationDate}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>
                  {edu.school} • {edu.location}
                  {edu.gpa && <span style={{ fontWeight: '500' }}> • GPA: {edu.gpa}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
