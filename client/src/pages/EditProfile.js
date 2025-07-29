import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Save, Plus, X, Upload, User, GraduationCap, Award, Briefcase, Code, Globe, Heart } from 'lucide-react';
import styled from 'styled-components';

const EditContainer = styled.div`
  padding: 2rem 0;
  min-height: 90vh;
`;

const FormCard = styled.div`
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
`;

const ArraySection = styled.div`
  margin-bottom: 1.5rem;
`;

const ArrayItem = styled.div`
  background: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: var(--error-color);
  color: white;
  border: none;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 0.75rem;
  
  &:hover {
    background: #dc2626;
  }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--background-light);
  border: 1px dashed var(--border-color);
  border-radius: var(--border-radius);
  color: var(--text-secondary);
  cursor: pointer;
  transition: var(--transition);
  width: 100%;
  
  &:hover {
    background: white;
    border-color: var(--primary-color);
    color: var(--primary-color);
  }
`;

const FileUpload = styled.div`
  border: 2px dashed var(--border-color);
  border-radius: var(--border-radius);
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    border-color: var(--primary-color);
    background: var(--background-light);
  }
  
  input {
    display: none;
  }
`;

const CurrentAvatar = styled.div`
  margin-bottom: 1rem;
  text-align: center;
`;

const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    education: [],
    skills: [],
    experience: [],
    projects: [],
    certifications: [],
    languages: [],
    interests: []
  });
  const [currentProfile, setCurrentProfile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/profiles/${id}`);
      const profile = response.data;
      setCurrentProfile(profile);
      setFormData({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        bio: profile.bio || '',
        education: profile.education || [],
        skills: profile.skills || [],
        experience: profile.experience || [],
        projects: profile.projects || [],
        certifications: profile.certifications || [],
        languages: profile.languages || [],
        interests: profile.interests || []
      });
    } catch (error) {
      toast.error('Failed to load profile');
      navigate('/dashboard');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const addArrayItem = (field, item) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], item]
    });
  };

  const removeArrayItem = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index)
    });
  };

  const updateArrayItem = (field, index, updates) => {
    setFormData({
      ...formData,
      [field]: formData[field].map((item, i) => 
        i === index ? { ...item, ...updates } : item
      )
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add basic fields
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('bio', formData.bio);
      
      // Add arrays as JSON strings
      formDataToSend.append('education', JSON.stringify(formData.education));
      formDataToSend.append('skills', JSON.stringify(formData.skills));
      formDataToSend.append('experience', JSON.stringify(formData.experience));
      formDataToSend.append('projects', JSON.stringify(formData.projects));
      formDataToSend.append('certifications', JSON.stringify(formData.certifications));
      formDataToSend.append('languages', JSON.stringify(formData.languages));
      formDataToSend.append('interests', JSON.stringify(formData.interests));
      
      // Add avatar if selected
      if (avatar) {
        formDataToSend.append('avatar', avatar);
      }

      await axios.put(`/api/profiles/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('Profile updated successfully!');
      navigate(`/profile/${id}`);
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <EditContainer>
        <div className="container">
          <div className="flex justify-center items-center" style={{ minHeight: '50vh' }}>
            <div className="loading-spinner"></div>
          </div>
        </div>
      </EditContainer>
    );
  }

  return (
    <EditContainer className="fade-in">
      <div className="container">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">Edit Your Educational Profile</h1>
          <p className="text-lg text-secondary">
            Update your educational journey, skills, and achievements
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Information */}
          <FormCard>
            <SectionTitle>
              <User size={20} />
              Basic Information
            </SectionTitle>
            
            <div className="grid grid-2 mb-4">
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                className="form-input form-textarea"
                placeholder="Tell us about yourself, your goals, and what drives your learning..."
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Profile Picture</label>
              {currentProfile?.avatar && (
                <CurrentAvatar>
                  <img 
                    src={`http://localhost:5000${currentProfile.avatar}`} 
                    alt="Current avatar"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginBottom: '1rem'
                    }}
                  />
                  <p className="text-sm text-secondary">Current profile picture</p>
                </CurrentAvatar>
              )}
              <FileUpload onClick={() => document.getElementById('avatar').click()}>
                <input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <Upload size={24} style={{ marginBottom: '0.5rem' }} />
                <p>{avatar ? avatar.name : 'Click to upload new profile picture'}</p>
              </FileUpload>
            </div>
          </FormCard>

          {/* Education */}
          <FormCard>
            <SectionTitle>
              <GraduationCap size={20} />
              Education
            </SectionTitle>
            
            <ArraySection>
              {formData.education.map((edu, index) => (
                <ArrayItem key={index}>
                  <RemoveButton onClick={() => removeArrayItem('education', index)}>
                    <X size={12} />
                  </RemoveButton>
                  <div className="grid grid-2 mb-3">
                    <div className="form-group">
                      <label className="form-label">Institution</label>
                      <input
                        type="text"
                        className="form-input"
                        value={edu.institution || ''}
                        onChange={(e) => updateArrayItem('education', index, { institution: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Degree</label>
                      <input
                        type="text"
                        className="form-input"
                        value={edu.degree || ''}
                        onChange={(e) => updateArrayItem('education', index, { degree: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-2">
                    <div className="form-group">
                      <label className="form-label">Start Year</label>
                      <input
                        type="number"
                        className="form-input"
                        value={edu.startYear || ''}
                        onChange={(e) => updateArrayItem('education', index, { startYear: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Year</label>
                      <input
                        type="number"
                        className="form-input"
                        value={edu.endYear || ''}
                        onChange={(e) => updateArrayItem('education', index, { endYear: e.target.value })}
                      />
                    </div>
                  </div>
                </ArrayItem>
              ))}
              <AddButton 
                type="button"
                onClick={() => addArrayItem('education', { institution: '', degree: '', startYear: '', endYear: '' })}
              >
                <Plus size={16} />
                Add Education
              </AddButton>
            </ArraySection>
          </FormCard>

          {/* Skills */}
          <FormCard>
            <SectionTitle>
              <Code size={20} />
              Skills
            </SectionTitle>
            
            <ArraySection>
              {formData.skills.map((skill, index) => (
                <ArrayItem key={index}>
                  <RemoveButton onClick={() => removeArrayItem('skills', index)}>
                    <X size={12} />
                  </RemoveButton>
                  <div className="grid grid-2">
                    <div className="form-group">
                      <label className="form-label">Skill Name</label>
                      <input
                        type="text"
                        className="form-input"
                        value={skill.name || ''}
                        onChange={(e) => updateArrayItem('skills', index, { name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Proficiency Level</label>
                      <select
                        className="form-input"
                        value={skill.level || ''}
                        onChange={(e) => updateArrayItem('skills', index, { level: e.target.value })}
                      >
                        <option value="">Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>
                </ArrayItem>
              ))}
              <AddButton 
                type="button"
                onClick={() => addArrayItem('skills', { name: '', level: '' })}
              >
                <Plus size={16} />
                Add Skill
              </AddButton>
            </ArraySection>
          </FormCard>

          {/* Experience */}
          <FormCard>
            <SectionTitle>
              <Briefcase size={20} />
              Experience
            </SectionTitle>
            
            <ArraySection>
              {formData.experience.map((exp, index) => (
                <ArrayItem key={index}>
                  <RemoveButton onClick={() => removeArrayItem('experience', index)}>
                    <X size={12} />
                  </RemoveButton>
                  <div className="grid grid-2 mb-3">
                    <div className="form-group">
                      <label className="form-label">Company/Organization</label>
                      <input
                        type="text"
                        className="form-input"
                        value={exp.company || ''}
                        onChange={(e) => updateArrayItem('experience', index, { company: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Position</label>
                      <input
                        type="text"
                        className="form-input"
                        value={exp.position || ''}
                        onChange={(e) => updateArrayItem('experience', index, { position: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-input form-textarea"
                      value={exp.description || ''}
                      onChange={(e) => updateArrayItem('experience', index, { description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-2">
                    <div className="form-group">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-input"
                        value={exp.startDate || ''}
                        onChange={(e) => updateArrayItem('experience', index, { startDate: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        className="form-input"
                        value={exp.endDate || ''}
                        onChange={(e) => updateArrayItem('experience', index, { endDate: e.target.value })}
                      />
                    </div>
                  </div>
                </ArrayItem>
              ))}
              <AddButton 
                type="button"
                onClick={() => addArrayItem('experience', { company: '', position: '', description: '', startDate: '', endDate: '' })}
              >
                <Plus size={16} />
                Add Experience
              </AddButton>
            </ArraySection>
          </FormCard>

          {/* Projects */}
          <FormCard>
            <SectionTitle>
              <Award size={20} />
              Projects
            </SectionTitle>
            
            <ArraySection>
              {formData.projects.map((project, index) => (
                <ArrayItem key={index}>
                  <RemoveButton onClick={() => removeArrayItem('projects', index)}>
                    <X size={12} />
                  </RemoveButton>
                  <div className="form-group mb-3">
                    <label className="form-label">Project Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={project.name || ''}
                      onChange={(e) => updateArrayItem('projects', index, { name: e.target.value })}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-input form-textarea"
                      value={project.description || ''}
                      onChange={(e) => updateArrayItem('projects', index, { description: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">URL (optional)</label>
                    <input
                      type="url"
                      className="form-input"
                      value={project.url || ''}
                      onChange={(e) => updateArrayItem('projects', index, { url: e.target.value })}
                    />
                  </div>
                </ArrayItem>
              ))}
              <AddButton 
                type="button"
                onClick={() => addArrayItem('projects', { name: '', description: '', url: '' })}
              >
                <Plus size={16} />
                Add Project
              </AddButton>
            </ArraySection>
          </FormCard>

          {/* Languages & Interests */}
          <div className="grid grid-2">
            <FormCard>
              <SectionTitle>
                <Globe size={20} />
                Languages
              </SectionTitle>
              
              <ArraySection>
                {formData.languages.map((lang, index) => (
                  <ArrayItem key={index}>
                    <RemoveButton onClick={() => removeArrayItem('languages', index)}>
                      <X size={12} />
                    </RemoveButton>
                    <div className="grid grid-2">
                      <div className="form-group">
                        <label className="form-label">Language</label>
                        <input
                          type="text"
                          className="form-input"
                          value={lang.name || ''}
                          onChange={(e) => updateArrayItem('languages', index, { name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Proficiency</label>
                        <select
                          className="form-input"
                          value={lang.level || ''}
                          onChange={(e) => updateArrayItem('languages', index, { level: e.target.value })}
                        >
                          <option value="">Select Level</option>
                          <option value="Basic">Basic</option>
                          <option value="Conversational">Conversational</option>
                          <option value="Fluent">Fluent</option>
                          <option value="Native">Native</option>
                        </select>
                      </div>
                    </div>
                  </ArrayItem>
                ))}
                <AddButton 
                  type="button"
                  onClick={() => addArrayItem('languages', { name: '', level: '' })}
                >
                  <Plus size={16} />
                  Add Language
                </AddButton>
              </ArraySection>
            </FormCard>

            <FormCard>
              <SectionTitle>
                <Heart size={20} />
                Interests
              </SectionTitle>
              
              <ArraySection>
                {formData.interests.map((interest, index) => (
                  <ArrayItem key={index}>
                    <RemoveButton onClick={() => removeArrayItem('interests', index)}>
                      <X size={12} />
                    </RemoveButton>
                    <div className="form-group">
                      <label className="form-label">Interest</label>
                      <input
                        type="text"
                        className="form-input"
                        value={interest.name || ''}
                        onChange={(e) => updateArrayItem('interests', index, { name: e.target.value })}
                      />
                    </div>
                  </ArrayItem>
                ))}
                <AddButton 
                  type="button"
                  onClick={() => addArrayItem('interests', { name: '' })}
                >
                  <Plus size={16} />
                  Add Interest
                </AddButton>
              </ArraySection>
            </FormCard>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
              style={{ minWidth: '200px' }}
            >
              {loading ? (
                <div className="loading-spinner" />
              ) : (
                <>
                  <Save size={18} />
                  Update Profile
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </EditContainer>
  );
};

export default EditProfile;