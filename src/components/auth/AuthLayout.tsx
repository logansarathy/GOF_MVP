
import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-yellow-50 to-green-100">
      {/* Header */}
      <div className="flex items-center justify-between p-6 relative z-20">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/6c7819bc-833f-448a-bb29-10fd7528af4c.png" 
            alt="Gods Own Food" 
            className="h-14 w-14"
          />
          <span className="text-xl font-bold text-god-green">Gods Own Food</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/95 p-8 rounded-2xl shadow-2xl backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-40 h-40 opacity-10">
            <img 
              src="/lovable-uploads/6c7819bc-833f-448a-bb29-10fd7528af4c.png" 
              alt="Background Logo" 
              className="w-full h-full"
            />
          </div>
          
          <div className="text-center space-y-4 mb-6 relative z-10">
            <div className="flex justify-center mb-2">
              <img 
                src="/lovable-uploads/6c7819bc-833f-448a-bb29-10fd7528af4c.png" 
                alt="Gods Own Food" 
                className="h-20 w-20"
              />
            </div>
            <h1 className="text-3xl font-bold text-god-green">Gods Own Food</h1>
            <p className="text-gray-600">From the plate of god</p>
          </div>
          
          {children}
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Secure login powered by Gods Own Food</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-4 text-center text-god-green/80 text-sm">
        <p>© 2025 Gods Own Food. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AuthLayout;
