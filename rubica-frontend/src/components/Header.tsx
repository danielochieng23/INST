import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, User, MessageCircle, Settings } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Mock user state - replace with actual auth context
  const isLoggedIn = false;
  const [userRole] = useState<'client' | 'provider'>('client');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const location = formData.get('location') as string;
    const service = formData.get('service') as string;
    
    navigate(`/search?location=${encodeURIComponent(location)}&service=${encodeURIComponent(service)}`);
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Rubica</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <div className="flex-1 flex">
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <select
                  name="service"
                  className="px-4 py-2 border-t border-b border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Services</option>
                  <option value="massage">Massage</option>
                  <option value="escort">Escort</option>
                  <option value="outcall">Outcall</option>
                  <option value="companionship">Companionship</option>
                </select>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary-600 text-white rounded-r-lg hover:bg-primary-700 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/messages" className="text-gray-700 hover:text-primary-600 p-2">
                  <MessageCircle className="w-5 h-5" />
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 p-2"
                  >
                    <User className="w-5 h-5" />
                    <span className="text-sm">Account</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {userRole === 'provider' ? 'Provider Dashboard' : 'My Account'}
                      </Link>
                      <Link
                        to="/messages"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Messages
                      </Link>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/auth?mode=login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2"
                >
                  Login
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch} className="flex flex-col space-y-2">
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="input-field"
            />
            <div className="flex space-x-2">
              <select name="service" className="flex-1 input-field">
                <option value="">All Services</option>
                <option value="massage">Massage</option>
                <option value="escort">Escort</option>
                <option value="outcall">Outcall</option>
                <option value="companionship">Companionship</option>
              </select>
              <button type="submit" className="btn-primary px-6">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-2">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2"
                  >
                    {userRole === 'provider' ? 'Provider Dashboard' : 'My Account'}
                  </Link>
                  <Link
                    to="/messages"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2"
                  >
                    Messages
                  </Link>
                  <button className="text-left text-gray-700 hover:text-primary-600 px-3 py-2">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth?mode=login"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth?mode=signup"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};