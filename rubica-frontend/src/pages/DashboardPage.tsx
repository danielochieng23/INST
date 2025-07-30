import React from 'react';

export const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          <p className="text-gray-500">
            Provider dashboard will include profile management, message handling, 
            booking management, analytics, and payment settings.
          </p>
        </div>
      </div>
    </div>
  );
};