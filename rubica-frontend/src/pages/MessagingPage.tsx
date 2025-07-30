import React from 'react';

export const MessagingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Messages</h1>
          <p className="text-gray-500">
            Secure messaging system will be implemented here with encrypted 
            communication, message threads, and booking requests.
          </p>
        </div>
      </div>
    </div>
  );
};