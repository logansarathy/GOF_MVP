
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTA = () => {
  return (
    <section className="py-20 bg-god-green text-white">
      <div className="container text-center max-w-3xl">
        <h2 className="text-3xl font-bold mb-4">Start Your Healthy Eating Journey Today</h2>
        <p className="text-xl mb-8 opacity-90">
          Personalized meal plans, smart grocery lists, and local store connections — all in one place.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-god-green hover:bg-gray-100">
            Sign Up For Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
            For Grocery Stores
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
