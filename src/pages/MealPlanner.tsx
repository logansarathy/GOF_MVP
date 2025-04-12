
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MealPlannerQuestionnaire from '@/components/MealPlannerQuestionnaire';
import MealPlannerResults from '@/components/MealPlannerResults';
import { MealPlan } from '@/types/meal';
import { useToast } from '@/hooks/use-toast';
import { generateMealPlan } from '@/api/mealPlannerApi';

const MealPlanner = () => {
  const [step, setStep] = useState<'questionnaire' | 'results'>('questionnaire');
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const { toast } = useToast();

  const handleGenerateMealPlan = async (preferences: Record<string, string | string[]>) => {
    setIsLoading(true);

    try {
      // Convert any array values to comma-separated strings for the API
      const formattedPreferences = Object.entries(preferences).reduce(
        (acc, [key, value]) => {
          acc[key] = Array.isArray(value) ? value.join(', ') : value;
          return acc;
        },
        {} as Record<string, string>
      );

      const generatedMealPlan = await generateMealPlan(formattedPreferences);
      setMealPlan(generatedMealPlan);
      setStep('results');
      toast({
        title: "Success!",
        description: "Your customized meal plan is ready.",
      });
    } catch (error) {
      console.error('Error generating meal plan:', error);
      toast({
        title: "Error",
        description: "Failed to generate meal plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep('questionnaire');
    setMealPlan(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">AI Meal Planner</h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Get a personalized meal plan based on your preferences and dietary needs.
          </p>

          {step === 'questionnaire' ? (
            <MealPlannerQuestionnaire 
              onSubmit={handleGenerateMealPlan} 
              isLoading={isLoading} 
            />
          ) : (
            <MealPlannerResults 
              mealPlan={mealPlan} 
              onCreateNew={handleReset} 
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MealPlanner;
