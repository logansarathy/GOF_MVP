
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
        <div className="absolute inset-0 bg-black/50 z-10"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-center p-4 border-b relative z-20">
        <Link to="/" className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-god-green" />
          <span className="text-xl font-bold text-god-green">Gods Own Food</span>
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-6 relative z-20">
        <div className="w-full max-w-md space-y-6 bg-white/90 p-8 rounded-lg shadow-xl backdrop-blur-sm">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Welcome to Gods Own Food</h1>
            <p className="text-muted-foreground">Sign in to your account or create a new one</p>
          </div>
          
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
