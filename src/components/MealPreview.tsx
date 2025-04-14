import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Heart } from 'lucide-react';

const MealPlanPreview = () => {
  return (
    <section className="py-20 bg-god-light-gray">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Discover Your Perfect Meal Plan</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Swipe through AI-recommended recipes tailored to your preferences and dietary needs.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="meal-swiper">
            <div className="flex items-center justify-center">
              <Button variant="outline" className="mr-4 rounded-full h-10 w-10 p-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <Card className="w-full max-w-md">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3" 
                      alt="Healthy Buddha Bowl" 
                      className="w-full h-64 object-cover rounded-t-lg" 
                    />
                    <Button variant="ghost" className="absolute top-2 right-2 h-10 w-10 rounded-full p-0 bg-white text-god-green hover:text-white hover:bg-god-green">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-xl font-semibold">Mediterranean Buddha Bowl</h3>
                      <div className="text-god-green font-medium">520 cal</div>
                    </div>
                    <div className="flex gap-2 mb-4">
                      <span className="px-2 py-1 bg-god-green/10 text-god-green text-xs rounded-full">Vegetarian</span>
                      <span className="px-2 py-1 bg-god-green/10 text-god-green text-xs rounded-full">High Protein</span>
                      <span className="px-2 py-1 bg-god-green/10 text-god-green text-xs rounded-full">30 min</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      A nourishing bowl with quinoa, roasted vegetables, chickpeas, and tahini dressing. Rich in protein and fiber.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" className="bg-white text-god-green border-god-green hover:bg-god-green hover:text-white flex-1">
                        See Recipe
                      </Button>
                      <Button className="bg-god-orange text-white hover:bg-orange-600 flex-1">
                        Add to Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button variant="outline" className="ml-4 rounded-full h-10 w-10 p-0">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button className="bg-god-green text-white hover:bg-green-600">
              Start Your Meal Plan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MealPlanPreview;
