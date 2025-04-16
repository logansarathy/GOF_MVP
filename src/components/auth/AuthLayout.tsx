
import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700">
      {/* Header */}
      <div className="flex items-center justify-between p-6 relative z-20">
        <Link to="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-7 w-7 text-white" />
          <span className="text-xl font-bold text-white">Gods Own Food</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/95 p-8 rounded-2xl shadow-2xl backdrop-blur-sm transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <div className="text-center space-y-4 mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Gods Own Food</h1>
            <p className="text-gray-600">Sign in to your account or create a new one</p>
          </div>
          
          {children}
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Secure login powered by Gods Own Food</p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="p-4 text-center text-white/80 text-sm">
        <p>© 2025 Gods Own Food. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AuthLayout;
