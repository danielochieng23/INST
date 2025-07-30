import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const AgeVerificationModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const hasVerified = localStorage.getItem('ageVerified');
    if (!hasVerified) {
      setIsVisible(true);
    }
  }, []);

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem('ageVerified', 'true');
      setIsVisible(false);
    } else {
      // Redirect to appropriate page or show warning
      window.location.href = 'https://www.google.com';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Age Verification Required
          </h3>
          
          <div className="text-sm text-gray-500 mb-6">
            <p className="mb-3">
              This website contains adult content and is intended for users 18 years of age or older.
            </p>
            <p className="mb-3">
              By entering this site, you confirm that:
            </p>
            <ul className="text-left list-disc list-inside space-y-1">
              <li>You are at least 18 years old</li>
              <li>You are legally allowed to view adult content in your jurisdiction</li>
              <li>You understand this site may contain explicit material</li>
              <li>You agree to our Terms of Service and Privacy Policy</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => handleVerify(true)}
              className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              I am 18 or older - Enter
            </button>
            <button
              onClick={() => handleVerify(false)}
              className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium"
            >
              I am under 18 - Exit
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            This verification is required by law and helps ensure compliance with age restrictions.
          </p>
        </div>
      </div>
    </div>
  );
};