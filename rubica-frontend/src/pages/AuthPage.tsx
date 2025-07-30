import React from 'react';
import { useSearchParams } from 'react-router-dom';

export const AuthPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'login';
  const role = searchParams.get('role');
  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            {mode === 'signup' ? 'Sign Up' : 'Login'}
          </h1>
          {role && (
            <p className="text-center text-gray-600 mb-6">
              {role === 'provider' ? 'Provider Account' : 'Client Account'}
            </p>
          )}
          <p className="text-gray-500 text-center">
            Authentication form will be implemented here with email/password fields, 
            social login options, and role selection for signup.
          </p>
        </div>
      </div>
    </div>
  );
};