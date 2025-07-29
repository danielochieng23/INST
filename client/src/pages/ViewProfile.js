import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import axios from 'axios';
import { 
  Edit, 
  Calendar, 
  MapPin, 
  Mail, 
  GraduationCap, 
  Award, 
  Briefcase, 
  Code, 
  Globe, 
  Heart,
  ExternalLink,
  ArrowLeft
} from 'lucide-react';
import styled from 'styled-components';

const ViewContainer = styled.div`
  padding: 2rem 0;
  min-height: 90vh;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  
  &:hover {
    background: var(--background-light);
    color: var(--primary-color);
  }
`;

const ProfileHeader = styled.div`
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
  text-align: center;
`;

const Avatar = styled.div`
  width: 8rem;
  height: 8rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 2.5rem;
  margin: 0 auto 1.5rem;
  box-shadow: var(--shadow-lg);
`;

const ProfileName = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const ProfileDate = styled.p`
  color: var(--text-secondary);
  font-size: 1rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const ProfileBio = styled.p`
  color: var(--text-secondary);
  font-size: 1.125rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const EditButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  text-decoration: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Section = styled.div`
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2rem;
  border: 1px solid var(--border-color);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--border-color);
`;

const ItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Item = styled.div`
  padding: 1.5rem;
  background: var(--background-light);
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
`;

const ItemTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`;

const ItemSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const ItemDate = styled.span`
  color: var(--text-light);
  font-size: 0.75rem;
  white-space: nowrap;
`;

const ItemDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
`;

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

const SkillItem = styled.div`
  background: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  text-align: center;
`;

const SkillName = styled.h4`
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const SkillLevel = styled.span`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  font-weight: 500;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const Tag = styled.span`
  background: var(--background-light);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  font-size: 0.875rem;
  border: 1px solid var(--border-color);
`;

const ProjectLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const ViewProfile = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`/api/profiles/${id}`);
      setProfile(response.data);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase();
  };

  if (loading) {
    return (
      <ViewContainer>
        <div className="container">
          <div className="flex justify-center items-center" style={{ minHeight: '50vh' }}>
            <div className="loading-spinner"></div>
          </div>
        </div>
      </ViewContainer>
    );
  }

  if (!profile) {
    return (
      <ViewContainer>
        <div className="container">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Profile not found</h2>
            <Link to="/profiles" className="btn btn-primary">
              Browse Profiles
            </Link>
          </div>
        </div>
      </ViewContainer>
    );
  }

  const isOwner = user && profile.userId === user.id;

  return (
    <ViewContainer className="fade-in">
      <div className="container">
        <BackButton to="/profiles">
          <ArrowLeft size={16} />
          Back to Profiles
        </BackButton>

        <ProfileHeader>
          {profile.avatar ? (
            <img 
              src={`http://localhost:5000${profile.avatar}`} 
              alt="Profile"
              style={{
                width: '8rem',
                height: '8rem',
                borderRadius: '50%',
                objectFit: 'cover',
                margin: '0 auto 1.5rem',
                boxShadow: 'var(--shadow-lg)'
              }}
            />
          ) : (
            <Avatar>
              {getInitials(profile.firstName, profile.lastName)}
            </Avatar>
          )}
          
          <ProfileName>
            {profile.firstName} {profile.lastName}
          </ProfileName>
          
          <ProfileDate>
            <Calendar size={16} />
            Joined {formatDate(profile.createdAt)}
          </ProfileDate>
          
          {profile.bio && (
            <ProfileBio>{profile.bio}</ProfileBio>
          )}
          
          {isOwner && (
            <EditButton to={`/edit-profile/${profile.id}`}>
              <Edit size={16} />
              Edit Profile
            </EditButton>
          )}
        </ProfileHeader>

        <ContentGrid>
          <MainContent>
            {/* Education */}
            {profile.education?.length > 0 && (
              <Section>
                <SectionTitle>
                  <GraduationCap size={24} />
                  Education
                </SectionTitle>
                <ItemList>
                  {profile.education.map((edu, index) => (
                    <Item key={index}>
                      <ItemHeader>
                        <div>
                          <ItemTitle>{edu.degree}</ItemTitle>
                          <ItemSubtitle>{edu.institution}</ItemSubtitle>
                        </div>
                        <ItemDate>
                          {edu.startYear} - {edu.endYear || 'Present'}
                        </ItemDate>
                      </ItemHeader>
                    </Item>
                  ))}
                </ItemList>
              </Section>
            )}

            {/* Experience */}
            {profile.experience?.length > 0 && (
              <Section>
                <SectionTitle>
                  <Briefcase size={24} />
                  Experience
                </SectionTitle>
                <ItemList>
                  {profile.experience.map((exp, index) => (
                    <Item key={index}>
                      <ItemHeader>
                        <div>
                          <ItemTitle>{exp.position}</ItemTitle>
                          <ItemSubtitle>{exp.company}</ItemSubtitle>
                        </div>
                        <ItemDate>
                          {exp.startDate && formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                        </ItemDate>
                      </ItemHeader>
                      {exp.description && (
                        <ItemDescription>{exp.description}</ItemDescription>
                      )}
                    </Item>
                  ))}
                </ItemList>
              </Section>
            )}

            {/* Projects */}
            {profile.projects?.length > 0 && (
              <Section>
                <SectionTitle>
                  <Award size={24} />
                  Projects
                </SectionTitle>
                <ItemList>
                  {profile.projects.map((project, index) => (
                    <Item key={index}>
                      <ItemTitle>{project.name}</ItemTitle>
                      {project.description && (
                        <ItemDescription>{project.description}</ItemDescription>
                      )}
                      {project.url && (
                        <ProjectLink href={project.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={14} />
                          View Project
                        </ProjectLink>
                      )}
                    </Item>
                  ))}
                </ItemList>
              </Section>
            )}
          </MainContent>

          <Sidebar>
            {/* Skills */}
            {profile.skills?.length > 0 && (
              <Section>
                <SectionTitle>
                  <Code size={20} />
                  Skills
                </SectionTitle>
                <SkillsGrid>
                  {profile.skills.map((skill, index) => (
                    <SkillItem key={index}>
                      <SkillName>{skill.name}</SkillName>
                      {skill.level && (
                        <SkillLevel>{skill.level}</SkillLevel>
                      )}
                    </SkillItem>
                  ))}
                </SkillsGrid>
              </Section>
            )}

            {/* Languages */}
            {profile.languages?.length > 0 && (
              <Section>
                <SectionTitle>
                  <Globe size={20} />
                  Languages
                </SectionTitle>
                <ItemList>
                  {profile.languages.map((lang, index) => (
                    <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 0' }}>
                      <span className="font-medium">{lang.name}</span>
                      {lang.level && (
                        <SkillLevel>{lang.level}</SkillLevel>
                      )}
                    </div>
                  ))}
                </ItemList>
              </Section>
            )}

            {/* Interests */}
            {profile.interests?.length > 0 && (
              <Section>
                <SectionTitle>
                  <Heart size={20} />
                  Interests
                </SectionTitle>
                <TagList>
                  {profile.interests.map((interest, index) => (
                    <Tag key={index}>{interest.name}</Tag>
                  ))}
                </TagList>
              </Section>
            )}
          </Sidebar>
        </ContentGrid>
      </div>
    </ViewContainer>
  );
};

export default ViewProfile;