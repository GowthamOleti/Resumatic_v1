import { Plus, Trash2 } from 'lucide-react';
import { ResumeData, WorkExperience, Education, Skill, Language, Certification, Project } from '../types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value },
    });
  };

  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
    };
    onChange({ ...data, workExperience: [...data.workExperience, newExp] });
  };

  const updateWorkExperience = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      workExperience: data.workExperience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const updateWorkDescription = (id: string, index: number, value: string) => {
    onChange({
      ...data,
      workExperience: data.workExperience.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              description: exp.description.map((desc, i) =>
                i === index ? value : desc
              ),
            }
          : exp
      ),
    });
  };

  const addWorkDescriptionBullet = (id: string) => {
    onChange({
      ...data,
      workExperience: data.workExperience.map((exp) =>
        exp.id === id ? { ...exp, description: [...exp.description, ''] } : exp
      ),
    });
  };

  const removeWorkDescriptionBullet = (id: string, index: number) => {
    onChange({
      ...data,
      workExperience: data.workExperience.map((exp) =>
        exp.id === id
          ? {
              ...exp,
              description: exp.description.filter((_, i) => i !== index),
            }
          : exp
      ),
    });
  };

  const removeWorkExperience = (id: string) => {
    onChange({
      ...data,
      workExperience: data.workExperience.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      location: '',
      graduationDate: '',
      gpa: '',
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: '',
      category: 'Technical',
    };
    onChange({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkill = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      skills: data.skills.map((skill) =>
        skill.id === id ? { ...skill, [field]: value } : skill
      ),
    });
  };

  const removeSkill = (id: string) => {
    onChange({
      ...data,
      skills: data.skills.filter((skill) => skill.id !== id),
    });
  };

  // Language functions
  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: '',
      proficiency: 'Intermediate',
    };
    onChange({ ...data, languages: [...data.languages, newLanguage] });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      languages: data.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter((lang) => lang.id !== id),
    });
  };

  // Certification functions
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      url: '',
    };
    onChange({ ...data, certifications: [...data.certifications, newCert] });
  };

  const updateCertification = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      certifications: data.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((cert) => cert.id !== id),
    });
  };

  // Project functions
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      date: '',
    };
    onChange({ ...data, projects: [...data.projects, newProject] });
  };

  const updateProject = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      projects: data.projects.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      ),
    });
  };

  const updateProjectTechnologies = (id: string, value: string) => {
    const technologies = value.split(',').map(t => t.trim()).filter(t => t);
    updateProject(id, 'technologies', technologies);
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter((proj) => proj.id !== id),
    });
  };

  return (
    <div className="space-y-8">
      {/* Personal Information */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={data.personalInfo.fullName}
              onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updatePersonalInfo('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={data.personalInfo.phone}
                onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              type="text"
              value={data.personalInfo.location}
              onChange={(e) => updatePersonalInfo('location', e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                type="url"
                value={data.personalInfo.linkedin}
                onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div>
              <Label htmlFor="website">Website/Portfolio</Label>
              <Input
                id="website"
                type="url"
                value={data.personalInfo.website}
                onChange={(e) => updatePersonalInfo('website', e.target.value)}
                placeholder="johndoe.com"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={data.personalInfo.summary}
              onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              placeholder="Brief overview of your professional background and career objectives..."
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Work Experience */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
        <div className="space-y-4">
          {data.workExperience.map((exp) => (
            <Card key={exp.id} className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor={`company-${exp.id}`}>Company</Label>
                  <Input
                    id={`company-${exp.id}`}
                    type="text"
                    value={exp.company}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, 'company', e.target.value)
                    }
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <Label htmlFor={`position-${exp.id}`}>Position</Label>
                  <Input
                    id={`position-${exp.id}`}
                    type="text"
                    value={exp.position}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, 'position', e.target.value)
                    }
                    placeholder="Job Title"
                  />
                </div>
                <div>
                  <Label htmlFor={`exp-location-${exp.id}`}>Location</Label>
                  <Input
                    id={`exp-location-${exp.id}`}
                    type="text"
                    value={exp.location}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, 'location', e.target.value)
                    }
                    placeholder="City, State"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${exp.id}`}
                      type="text"
                      value={exp.startDate}
                      onChange={(e) =>
                        updateWorkExperience(exp.id, 'startDate', e.target.value)
                      }
                      placeholder="MM/YYYY"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${exp.id}`}
                      type="text"
                      value={exp.endDate}
                      onChange={(e) =>
                        updateWorkExperience(exp.id, 'endDate', e.target.value)
                      }
                      placeholder="MM/YYYY"
                      disabled={exp.current}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={exp.current}
                    onChange={(e) =>
                      updateWorkExperience(exp.id, 'current', e.target.checked)
                    }
                    id={`current-${exp.id}`}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor={`current-${exp.id}`} className="font-normal cursor-pointer">
                    Currently working here
                  </Label>
                </div>
                <div className="space-y-2">
                  <Label>Job Responsibilities</Label>
                  {exp.description.map((desc, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        type="text"
                        value={desc}
                        onChange={(e) =>
                          updateWorkDescription(exp.id, index, e.target.value)
                        }
                        placeholder="Describe your achievement or responsibility..."
                      />
                      {exp.description.length > 1 && (
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => removeWorkDescriptionBullet(exp.id, index)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addWorkDescriptionBullet(exp.id)}
                    className="gap-2"
                  >
                    <Plus size={16} />
                    Add Bullet Point
                  </Button>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => removeWorkExperience(exp.id)}
                  className="gap-2"
                >
                  <Trash2 size={16} />
                  Remove Experience
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addWorkExperience} className="gap-2 w-full">
            <Plus size={18} />
            Add Work Experience
          </Button>
        </div>
      </div>

      {/* Education */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Education</h2>
        <div className="space-y-4">
          {data.education.map((edu) => (
            <Card key={edu.id} className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor={`school-${edu.id}`}>School/University</Label>
                  <Input
                    id={`school-${edu.id}`}
                    type="text"
                    value={edu.school}
                    onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                    <Input
                      id={`degree-${edu.id}`}
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Bachelor of Science"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`field-${edu.id}`}>Field of Study</Label>
                    <Input
                      id={`field-${edu.id}`}
                      type="text"
                      value={edu.field}
                      onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                      placeholder="Computer Science"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`edu-location-${edu.id}`}>Location</Label>
                    <Input
                      id={`edu-location-${edu.id}`}
                      type="text"
                      value={edu.location}
                      onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`graduationDate-${edu.id}`}>Graduation Date</Label>
                    <Input
                      id={`graduationDate-${edu.id}`}
                      type="text"
                      value={edu.graduationDate}
                      onChange={(e) =>
                        updateEducation(edu.id, 'graduationDate', e.target.value)
                      }
                      placeholder="MM/YYYY"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
                  <Input
                    id={`gpa-${edu.id}`}
                    type="text"
                    value={edu.gpa || ''}
                    onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
                <Button
                  variant="destructive"
                  onClick={() => removeEducation(edu.id)}
                  className="gap-2"
                >
                  <Trash2 size={16} />
                  Remove Education
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addEducation} className="gap-2 w-full">
            <Plus size={18} />
            Add Education
          </Button>
        </div>
      </div>

      {/* Skills */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <div className="space-y-4">
          {data.skills.map((skill) => (
            <Card key={skill.id} className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`skill-name-${skill.id}`}>Skill Name</Label>
                    <Input
                      id={`skill-name-${skill.id}`}
                      type="text"
                      value={skill.name}
                      onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                      placeholder="React, Python, Leadership..."
                    />
                  </div>
                  <div>
                    <Label htmlFor={`skill-category-${skill.id}`}>Category</Label>
                    <Input
                      id={`skill-category-${skill.id}`}
                      type="text"
                      value={skill.category}
                      onChange={(e) => updateSkill(skill.id, 'category', e.target.value)}
                      placeholder="Technical, Soft Skills..."
                    />
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => removeSkill(skill.id)}
                  className="gap-2"
                >
                  <Trash2 size={16} />
                  Remove Skill
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addSkill} className="gap-2 w-full">
            <Plus size={18} />
            Add Skill
          </Button>
        </div>
      </div>

      {/* Languages */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Languages</h2>
        <div className="space-y-4">
          {data.languages.map((language) => (
            <Card key={language.id} className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`language-name-${language.id}`}>Language</Label>
                    <Input
                      id={`language-name-${language.id}`}
                      type="text"
                      value={language.name}
                      onChange={(e) => updateLanguage(language.id, 'name', e.target.value)}
                      placeholder="English, Spanish..."
                    />
                  </div>
                  <div>
                    <Label htmlFor={`language-proficiency-${language.id}`}>Proficiency</Label>
                    <Input
                      id={`language-proficiency-${language.id}`}
                      type="text"
                      value={language.proficiency}
                      onChange={(e) => updateLanguage(language.id, 'proficiency', e.target.value)}
                      placeholder="Native, Fluent, Intermediate..."
                    />
                  </div>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => removeLanguage(language.id)}
                  className="gap-2"
                >
                  <Trash2 size={16} />
                  Remove Language
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addLanguage} className="gap-2 w-full">
            <Plus size={18} />
            Add Language
          </Button>
        </div>
      </div>

      {/* Certifications */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Certifications</h2>
        <div className="space-y-4">
          {data.certifications.map((cert) => (
            <Card key={cert.id} className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor={`cert-name-${cert.id}`}>Certification Name</Label>
                  <Input
                    id={`cert-name-${cert.id}`}
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                    placeholder="AWS Solutions Architect..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`cert-issuer-${cert.id}`}>Issuing Organization</Label>
                    <Input
                      id={`cert-issuer-${cert.id}`}
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`cert-date-${cert.id}`}>Date Obtained</Label>
                    <Input
                      id={`cert-date-${cert.id}`}
                      type="text"
                      value={cert.date}
                      onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                      placeholder="MM/YYYY"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor={`cert-url-${cert.id}`}>Credential URL (Optional)</Label>
                  <Input
                    id={`cert-url-${cert.id}`}
                    type="url"
                    value={cert.url || ''}
                    onChange={(e) => updateCertification(cert.id, 'url', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <Button
                  variant="destructive"
                  onClick={() => removeCertification(cert.id)}
                  className="gap-2"
                >
                  <Trash2 size={16} />
                  Remove Certification
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addCertification} className="gap-2 w-full">
            <Plus size={18} />
            Add Certification
          </Button>
        </div>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <div className="space-y-4">
          {data.projects.map((project) => (
            <Card key={project.id} className="border-2">
              <CardContent className="pt-6 space-y-4">
                <div>
                  <Label htmlFor={`project-name-${project.id}`}>Project Name</Label>
                  <Input
                    id={`project-name-${project.id}`}
                    type="text"
                    value={project.name}
                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                    placeholder="E-commerce Platform"
                  />
                </div>
                <div>
                  <Label htmlFor={`project-desc-${project.id}`}>Description</Label>
                  <Textarea
                    id={`project-desc-${project.id}`}
                    value={project.description}
                    onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                    placeholder="Describe what the project does and your role..."
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`project-tech-${project.id}`}>Technologies (comma-separated)</Label>
                    <Input
                      id={`project-tech-${project.id}`}
                      type="text"
                      value={project.technologies.join(', ')}
                      onChange={(e) => updateProjectTechnologies(project.id, e.target.value)}
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`project-date-${project.id}`}>Date</Label>
                    <Input
                      id={`project-date-${project.id}`}
                      type="text"
                      value={project.date}
                      onChange={(e) => updateProject(project.id, 'date', e.target.value)}
                      placeholder="MM/YYYY"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor={`project-url-${project.id}`}>Project URL (Optional)</Label>
                  <Input
                    id={`project-url-${project.id}`}
                    type="url"
                    value={project.url || ''}
                    onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                    placeholder="https://github.com/..."
                  />
                </div>
                <Button
                  variant="destructive"
                  onClick={() => removeProject(project.id)}
                  className="gap-2"
                >
                  <Trash2 size={16} />
                  Remove Project
                </Button>
              </CardContent>
            </Card>
          ))}
          <Button onClick={addProject} className="gap-2 w-full">
            <Plus size={18} />
            Add Project
          </Button>
        </div>
      </div>
    </div>
  );
}
