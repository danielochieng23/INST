import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold">Rubica</span>
            </div>
            <p className="text-secondary-300 mb-4 max-w-md">
              Connecting clients with professional service providers in a safe, secure, and discreet environment.
            </p>
            <div className="flex items-center space-x-2 text-secondary-300 mb-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">18+ Adult Platform</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-300">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Verified & Secure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/search" className="text-secondary-300 hover:text-white transition-colors">
                  Browse Services
                </Link>
              </li>
              <li>
                <Link to="/auth?mode=signup&role=provider" className="text-secondary-300 hover:text-white transition-colors">
                  Become a Provider
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-secondary-300 hover:text-white transition-colors">
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-secondary-300 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-secondary-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-secondary-300 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-secondary-300 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-secondary-300 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-secondary-700 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center space-x-2 text-secondary-300">
              <Mail className="w-4 h-4" />
              <span className="text-sm">support@rubicahub.com</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-300">
              <Phone className="w-4 h-4" />
              <span className="text-sm">1-800-RUBICA-1</span>
            </div>
            <div className="flex items-center space-x-2 text-secondary-300">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Available Worldwide</span>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-secondary-700">
            <p className="text-secondary-400 text-sm mb-4 md:mb-0">
              © 2024 Rubica. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <span className="text-secondary-400 text-sm">
                🔒 SSL Secured
              </span>
              <span className="text-secondary-400 text-sm">
                🛡️ GDPR Compliant
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};