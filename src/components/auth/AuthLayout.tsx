
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

      {/* Food Your Way Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <h1 className="text-7xl font-bold text-white tracking-tight mb-4">Food</h1>
        <h1 className="text-7xl font-bold text-white tracking-tight mb-4">Your</h1>
        <h1 className="text-7xl font-bold text-white tracking-tight mb-32">Way</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-end justify-center pb-16 relative z-20">
        <div className="w-full max-w-md flex flex-col items-center gap-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
