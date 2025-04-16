
import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          muted 
          loop 
          className="w-full h-full object-cover"
        >
          <source src="https://player.vimeo.com/external/451536000.sd.mp4?s=ea9eb7afa9e1bb77e7797be7a41d4446f507728b&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-6 relative z-20">
        <Link to="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-7 w-7 text-god-orange" />
          <span className="text-xl font-bold text-white">Gods Own Food</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-20">
        <div className="w-full max-w-md bg-white/85 p-8 rounded-2xl shadow-2xl backdrop-blur-sm transform transition-all duration-300 hover:shadow-god-orange/20 hover:shadow-xl">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-god-green to-god-orange bg-clip-text text-transparent">Gods Own Food</h1>
            <p className="text-gray-600">Sign in to your account or create a new one</p>
          </div>
          
          {children}
        </div>
      </div>
      
      {/* Footer */}
      <div className="relative z-20 p-4 text-center text-white/80 text-sm">
        <p>© 2025 Gods Own Food. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AuthLayout;
