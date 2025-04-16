
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative py-20 bg-gradient-to-b from-god-light-gray to-white">
      <div className="container flex flex-col items-center text-center lg:flex-row lg:text-left lg:gap-12">
        <div className="space-y-6 max-w-xl">
          <div className="flex items-center justify-center lg:justify-start mb-4">
            <img 
              src="/lovable-uploads/6c7819bc-833f-448a-bb29-10fd7528af4c.png" 
              alt="Gods Own Food" 
              className="h-16 w-16 mr-3" 
            />
            <span className="text-2xl font-semibold text-god-green">From the plate of god</span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Eat Healthier with <span className="text-god-green">AI-Powered</span> Meal Planning
          </h1>
          <p className="text-xl text-gray-600">
            Personalized meal plans based on your preferences, health goals, and dietary needs. 
            Connect with local stores for fresh ingredients delivered to your door.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button size="lg" className="bg-god-green hover:bg-green-600">
              Start Your Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-god-green text-god-green hover:bg-god-green hover:text-white">
              For Grocery Stores
            </Button>
          </div>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-1/2">
          <div className="relative">
            <div className="absolute -top-4 -left-4 bg-god-orange h-16 w-16 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -right-4 bg-god-green h-24 w-24 rounded-full opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3" 
              alt="Healthy meal preparation" 
              className="rounded-xl shadow-xl relative z-10 max-h-[450px] object-cover" 
            />
            <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg shadow-md">
              <img 
                src="/lovable-uploads/6c7819bc-833f-448a-bb29-10fd7528af4c.png" 
                alt="Gods Own Food" 
                className="h-12 w-12" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
