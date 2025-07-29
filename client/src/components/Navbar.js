import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { User, LogOut, Menu, X, GraduationCap } from 'lucide-react';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  transition: var(--transition);

  &:hover {
    transform: scale(1.05);
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(10px);
    flex-direction: column;
    padding: 1rem;
    border-bottom: 1px solid var(--border-color);
    box-shadow: var(--shadow-lg);
  }
`;

const NavLink = styled(Link)`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: var(--border-radius);
  transition: var(--transition);

  &:hover {
    background: var(--background-light);
    color: var(--primary-color);
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-weight: 500;
  transition: var(--transition);

  &:hover {
    background: var(--background-light);
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--text-primary);

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <NavContent>
        <Logo to="/">
          <GraduationCap size={24} />
          EduProfile
        </Logo>

        <NavLinks isOpen={isOpen}>
          <NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink>
          <NavLink to="/profiles" onClick={() => setIsOpen(false)}>Browse Profiles</NavLink>
          
          {user ? (
            <>
              <NavLink to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</NavLink>
              <NavLink to="/create-profile" onClick={() => setIsOpen(false)}>Create Profile</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setIsOpen(false)}>Login</NavLink>
              <NavLink to="/register" onClick={() => setIsOpen(false)}>Register</NavLink>
            </>
          )}
        </NavLinks>

        <UserMenu>
          {user && (
            <>
              <UserButton>
                <User size={20} />
                {user.username}
              </UserButton>
              <UserButton onClick={handleLogout}>
                <LogOut size={20} />
                Logout
              </UserButton>
            </>
          )}
          
          <MobileMenuButton onClick={toggleMenu}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </MobileMenuButton>
        </UserMenu>
      </NavContent>
    </NavbarContainer>
  );
};

export default Navbar;