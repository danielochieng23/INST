import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { GraduationCap, Users, Award, BookOpen, Star, ArrowRight } from 'lucide-react';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  padding: 4rem 0;
  text-align: center;
  color: white;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border-radius: var(--border-radius-lg);
  font-weight: 600;
  text-decoration: none;
  transition: var(--transition);
  
  &.primary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 2px solid rgba(255, 255, 255, 0.3);
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background: white;
    color: var(--primary-color);
    border: 2px solid white;
    
    &:hover {
      background: var(--background-light);
      transform: translateY(-2px);
    }
  }
`;

const FeaturesSection = styled.section`
  padding: 4rem 0;
  background: var(--background-light);
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: var(--transition);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
`;

const FeatureIcon = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
`;

const StatsSection = styled.section`
  padding: 3rem 0;
  background: white;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatCard = styled.div`
  padding: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: var(--text-secondary);
  font-weight: 500;
`;

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="fade-in">
      <HeroSection>
        <HeroContent>
          <HeroTitle>
            Showcase Your Educational Journey
          </HeroTitle>
          <HeroSubtitle>
            Create comprehensive educational profiles that highlight your achievements, 
            skills, and learning experiences. Connect with peers and showcase your growth.
          </HeroSubtitle>
          <CTAButtons>
            {user ? (
              <>
                <CTAButton to="/dashboard" className="primary">
                  <Users size={20} />
                  Go to Dashboard
                </CTAButton>
                <CTAButton to="/create-profile" className="secondary">
                  <Award size={20} />
                  Create Profile
                </CTAButton>
              </>
            ) : (
              <>
                <CTAButton to="/register" className="primary">
                  <ArrowRight size={20} />
                  Get Started
                </CTAButton>
                <CTAButton to="/profiles" className="secondary">
                  <BookOpen size={20} />
                  Browse Profiles
                </CTAButton>
              </>
            )}
          </CTAButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose EduProfile?</h2>
            <p className="text-lg text-secondary mb-8 max-w-2xl mx-auto">
              Our platform provides everything you need to create, manage, and share 
              your educational achievements with the world.
            </p>
          </div>
          
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>
                <GraduationCap size={24} />
              </FeatureIcon>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Profiles</h3>
              <p className="text-secondary">
                Create detailed profiles showcasing your education, skills, projects, 
                and certifications in one beautiful, organized format.
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <Users size={24} />
              </FeatureIcon>
              <h3 className="text-xl font-semibold mb-3">Connect & Network</h3>
              <p className="text-secondary">
                Discover like-minded learners, connect with peers, and build 
                meaningful professional relationships within your field.
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <Award size={24} />
              </FeatureIcon>
              <h3 className="text-xl font-semibold mb-3">Showcase Achievements</h3>
              <p className="text-secondary">
                Highlight your accomplishments, certifications, and projects 
                with rich media support and detailed descriptions.
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <BookOpen size={24} />
              </FeatureIcon>
              <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
              <p className="text-secondary">
                Monitor your learning journey, set goals, and track your 
                educational progress over time with detailed analytics.
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <Star size={24} />
              </FeatureIcon>
              <h3 className="text-xl font-semibold mb-3">Professional Design</h3>
              <p className="text-secondary">
                Beautiful, modern templates that make your profile stand out 
                and leave a lasting impression on viewers.
              </p>
            </FeatureCard>
            
            <FeatureCard>
              <FeatureIcon>
                <ArrowRight size={24} />
              </FeatureIcon>
              <h3 className="text-xl font-semibold mb-3">Easy to Use</h3>
              <p className="text-secondary">
                Intuitive interface makes it simple to create and update 
                your profile, even if you're not tech-savvy.
              </p>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      <StatsSection>
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-lg text-secondary">
              Thousands of learners trust EduProfile to showcase their educational journey
            </p>
          </div>
          
          <StatsGrid>
            <StatCard>
              <StatNumber>1,000+</StatNumber>
              <StatLabel>Active Profiles</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>50+</StatNumber>
              <StatLabel>Countries</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>5,000+</StatNumber>
              <StatLabel>Skills Tracked</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>10,000+</StatNumber>
              <StatLabel>Achievements Shared</StatLabel>
            </StatCard>
          </StatsGrid>
        </div>
      </StatsSection>
    </div>
  );
};

export default Home;