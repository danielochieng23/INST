import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Plus, Edit, Eye, Trash2, User, GraduationCap, Award, Calendar } from 'lucide-react';
import styled from 'styled-components';

const DashboardContainer = styled.div`
  padding: 2rem 0;
  min-height: 90vh;
`;

const DashboardHeader = styled.div`
  background: white;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border-color);
`;

const WelcomeTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
`;

const WelcomeSubtitle = styled.p`
  color: var(--text-secondary);
  font-size: 1.125rem;
`;

const QuickActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
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

const ProfilesSection = styled.div`
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
  gap: 0.5rem;
`;

const ProfilesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ProfileCard = styled.div`
  background: var(--background-light);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 3rem;
  height: 3rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
`;

const ProfileDate = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
`;

const ProfileBio = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  background: white;
  color: var(--text-primary);
  border-radius: var(--border-radius);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background: var(--background-light);
    transform: translateY(-1px);
  }
  
  &.danger {
    border-color: var(--error-color);
    color: var(--error-color);
    
    &:hover {
      background: var(--error-color);
      color: white;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-secondary);
`;

const EmptyIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: var(--background-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: var(--text-light);
`;

const Dashboard = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const fetchUserProfiles = async () => {
    try {
      const response = await axios.get('/api/user/profiles');
      setProfiles(response.data);
    } catch (error) {
      toast.error('Failed to fetch profiles');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProfile = async (profileId) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      try {
        await axios.delete(`/api/profiles/${profileId}`);
        setProfiles(profiles.filter(p => p.id !== profileId));
        toast.success('Profile deleted successfully');
      } catch (error) {
        toast.error('Failed to delete profile');
      }
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
      <DashboardContainer>
        <div className="container">
          <div className="flex justify-center items-center" style={{ minHeight: '50vh' }}>
            <div className="loading-spinner"></div>
          </div>
        </div>
      </DashboardContainer>
    );
  }

  return (
    <DashboardContainer className="fade-in">
      <div className="container">
        <DashboardHeader>
          <WelcomeTitle>Welcome back, {user?.username}!</WelcomeTitle>
          <WelcomeSubtitle>
            Manage your educational profiles and showcase your learning journey.
          </WelcomeSubtitle>
          <QuickActions>
            <ActionButton to="/create-profile">
              <Plus size={18} />
              Create New Profile
            </ActionButton>
            <ActionButton to="/profiles">
              <Eye size={18} />
              Browse All Profiles
            </ActionButton>
          </QuickActions>
        </DashboardHeader>

        <ProfilesSection>
          <SectionTitle>
            <User size={24} />
            Your Profiles ({profiles.length})
          </SectionTitle>
          
          {profiles.length === 0 ? (
            <EmptyState>
              <EmptyIcon>
                <GraduationCap size={24} />
              </EmptyIcon>
              <h3 className="text-lg font-semibold mb-2">No profiles yet</h3>
              <p className="mb-4">
                Create your first educational profile to get started showcasing your achievements.
              </p>
              <ActionButton to="/create-profile">
                <Plus size={18} />
                Create Your First Profile
              </ActionButton>
            </EmptyState>
          ) : (
            <ProfilesGrid>
              {profiles.map((profile) => (
                <ProfileCard key={profile.id}>
                  <ProfileHeader>
                    {profile.avatar ? (
                      <img 
                        src={`http://localhost:5000${profile.avatar}`} 
                        alt="Avatar"
                        style={{
                          width: '3rem',
                          height: '3rem',
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
                        <Calendar size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        Created {formatDate(profile.createdAt)}
                      </ProfileDate>
                    </ProfileInfo>
                  </ProfileHeader>
                  
                  {profile.bio && (
                    <ProfileBio>{profile.bio}</ProfileBio>
                  )}
                  
                  <div className="flex items-center gap-4 mb-3 text-sm text-secondary">
                    {profile.education?.length > 0 && (
                      <span>
                        <GraduationCap size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {profile.education.length} Education
                      </span>
                    )}
                    {profile.skills?.length > 0 && (
                      <span>
                        <Award size={14} style={{ display: 'inline', marginRight: '0.25rem' }} />
                        {profile.skills.length} Skills
                      </span>
                    )}
                  </div>
                  
                  <ProfileActions>
                    <ActionBtn as={Link} to={`/profile/${profile.id}`}>
                      <Eye size={14} />
                      View
                    </ActionBtn>
                    <ActionBtn as={Link} to={`/edit-profile/${profile.id}`}>
                      <Edit size={14} />
                      Edit
                    </ActionBtn>
                    <ActionBtn 
                      className="danger"
                      onClick={() => handleDeleteProfile(profile.id)}
                    >
                      <Trash2 size={14} />
                      Delete
                    </ActionBtn>
                  </ProfileActions>
                </ProfileCard>
              ))}
            </ProfilesGrid>
          )}
        </ProfilesSection>
      </div>
    </DashboardContainer>
  );
};

export default Dashboard;