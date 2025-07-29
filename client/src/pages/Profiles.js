import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Search, Users, GraduationCap, Award, Calendar, ExternalLink } from 'lucide-react';
import styled from 'styled-components';

const ProfilesContainer = styled.div`
  padding: 2rem 0;
  min-height: 90vh;
`;

const SearchSection = styled.div`
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
`;

const SearchInput = styled.div`
  position: relative;
  max-width: 500px;
  margin: 0 auto;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
`;

const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  font-size: 1rem;
  transition: var(--transition);
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgb(102 126 234 / 0.1);
  }
`;

const ProfilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2rem;
  border: 1px solid var(--border-color);
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Avatar = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const ProfileInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProfileName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`;

const ProfileDate = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ProfileBio = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProfileStats = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const Stat = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const SkillTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const SkillTag = styled.span`
  background: var(--background-light);
  color: var(--text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  border: 1px solid var(--border-color);
`;

const ViewButton = styled(Link)`
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
    box-shadow: var(--shadow-md);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);
`;

const EmptyIcon = styled.div`
  width: 5rem;
  height: 5rem;
  background: var(--background-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--text-light);
`;

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  useEffect(() => {
    filterProfiles();
  }, [profiles, searchTerm]);

  const fetchProfiles = async () => {
    try {
      const response = await axios.get('/api/profiles');
      setProfiles(response.data);
    } catch (error) {
      console.error('Failed to fetch profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProfiles = () => {
    if (!searchTerm.trim()) {
      setFilteredProfiles(profiles);
      return;
    }

    const filtered = profiles.filter(profile => {
      const fullName = `${profile.firstName} ${profile.lastName}`.toLowerCase();
      const bio = profile.bio?.toLowerCase() || '';
      const skills = profile.skills?.map(s => s.name?.toLowerCase()).join(' ') || '';
      const education = profile.education?.map(e => `${e.institution} ${e.degree}`.toLowerCase()).join(' ') || '';
      
      const searchLower = searchTerm.toLowerCase();
      
      return fullName.includes(searchLower) || 
             bio.includes(searchLower) || 
             skills.includes(searchLower) || 
             education.includes(searchLower);
    });

    setFilteredProfiles(filtered);
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
      <ProfilesContainer>
        <div className="container">
          <div className="flex justify-center items-center" style={{ minHeight: '50vh' }}>
            <div className="loading-spinner"></div>
          </div>
        </div>
      </ProfilesContainer>
    );
  }

  return (
    <ProfilesContainer className="fade-in">
      <div className="container">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Browse Educational Profiles</h1>
          <p className="text-lg text-secondary">
            Discover talented learners and their educational journeys
          </p>
        </div>

        <SearchSection>
          <SearchInput>
            <SearchIcon>
              <Search size={20} />
            </SearchIcon>
            <Input
              type="text"
              placeholder="Search profiles by name, skills, education..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchInput>
        </SearchSection>

        {filteredProfiles.length === 0 ? (
          <EmptyState>
            <EmptyIcon>
              <Users size={32} />
            </EmptyIcon>
            <h3 className="text-xl font-semibold mb-2">
              {searchTerm ? 'No profiles found' : 'No profiles yet'}
            </h3>
            <p className="text-lg">
              {searchTerm 
                ? 'Try adjusting your search terms or browse all profiles.' 
                : 'Be the first to create an educational profile and showcase your journey!'
              }
            </p>
          </EmptyState>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-secondary">
                Showing {filteredProfiles.length} of {profiles.length} profiles
              </p>
            </div>
            
            <ProfilesGrid>
              {filteredProfiles.map((profile) => (
                <ProfileCard key={profile.id}>
                  <ProfileHeader>
                    {profile.avatar ? (
                      <img 
                        src={`http://localhost:5000${profile.avatar}`} 
                        alt="Avatar"
                        style={{
                          width: '4rem',
                          height: '4rem',
                          borderRadius: '50%',
                          objectFit: 'cover'
                        }}
                      />
                    ) : (
                      <Avatar>
                        {getInitials(profile.firstName, profile.lastName)}
                      </Avatar>
                    )}
                    <ProfileInfo>
                      <ProfileName>
                        {profile.firstName} {profile.lastName}
                      </ProfileName>
                      <ProfileDate>
                        <Calendar size={14} />
                        Joined {formatDate(profile.createdAt)}
                      </ProfileDate>
                    </ProfileInfo>
                  </ProfileHeader>
                  
                  {profile.bio && (
                    <ProfileBio>{profile.bio}</ProfileBio>
                  )}
                  
                  <ProfileStats>
                    {profile.education?.length > 0 && (
                      <Stat>
                        <GraduationCap size={16} />
                        {profile.education.length} Education
                      </Stat>
                    )}
                    {profile.skills?.length > 0 && (
                      <Stat>
                        <Award size={16} />
                        {profile.skills.length} Skills
                      </Stat>
                    )}
                  </ProfileStats>
                  
                  {profile.skills?.length > 0 && (
                    <SkillTags>
                      {profile.skills.slice(0, 4).map((skill, index) => (
                        <SkillTag key={index}>
                          {skill.name}
                        </SkillTag>
                      ))}
                      {profile.skills.length > 4 && (
                        <SkillTag>+{profile.skills.length - 4} more</SkillTag>
                      )}
                    </SkillTags>
                  )}
                  
                  <ViewButton to={`/profile/${profile.id}`}>
                    <ExternalLink size={16} />
                    View Profile
                  </ViewButton>
                </ProfileCard>
              ))}
            </ProfilesGrid>
          </>
        )}
      </div>
    </ProfilesContainer>
  );
};

export default Profiles;