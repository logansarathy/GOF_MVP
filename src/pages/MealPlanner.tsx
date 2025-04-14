
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MealPlannerQuestionnaire from '@/components/MealPlannerQuestionnaire';
import MealPlannerResults from '@/components/MealPlannerResults';
import AiModelSettings from '@/components/AiModelSettings';
import { Button } from '@/components/ui/button';
import { MealPlan } from '@/types/meal';
import { useToast } from '@/hooks/use-toast';
import { generateMealPlan } from '@/api/mealPlannerApi';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Define the form data interface to match the questionnaire
interface MealPlannerFormData {
  dietaryPreferences: string;
  allergies: string;
  calorieGoal: string;
  mealCount: string;
  cookingSkill: string;
  additionalInfo: string;
  dietType: string;
  healthGoals: string[];
  modelChoice?: string; // Added model choice option
}

const MealPlanner = () => {
  const [step, setStep] = useState<'questionnaire' | 'results'>('questionnaire');
  const [isLoading, setIsLoading] = useState(false);
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [hasSeenIntro, setHasSeenIntro] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check if user has seen intro
  useEffect(() => {
    const checkUserPreferences = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user preferences:', error);
          return;
        }
        
        if (!data) {
          // Create default preferences if they don't exist
          const { error: insertError } = await supabase
            .from('user_preferences')
            .insert([{ user_id: user.id, has_seen_intro: false }]);
          
          if (insertError) {
            console.error('Error creating user preferences:', insertError);
            return;
          }
          
          setHasSeenIntro(false);
        } else {
          setHasSeenIntro(data.has_seen_intro);
        }
      } catch (error) {
        console.error('Error in user preferences check:', error);
      }
    };
    
    checkUserPreferences();
  }, [user]);

  const handleGetStarted = async () => {
    if (!user) return;
    
    try {
      await supabase
        .from('user_preferences')
        .update({ has_seen_intro: true })
        .eq('user_id', user.id);
      
      setHasSeenIntro(true);
    } catch (error) {
      console.error('Error updating user preferences:', error);
    }
  };

  const handleGenerateMealPlan = async (preferences: MealPlannerFormData) => {
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

      // If using custom model, check if the API key is set
      if (preferences.modelChoice === 'custom' && !localStorage.getItem('custom_model_api_key')) {
        toast({
          title: "API Key Missing",
          description: "Please configure your custom AI model API key in settings",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // If using OpenAI, check if the API key is set
      if (preferences.modelChoice === 'openai' && !localStorage.getItem('openai_api_key')) {
        toast({
          title: "API Key Missing",
          description: "Please configure your OpenAI API key in settings",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // If using Claude, check if the API key is set
      if (preferences.modelChoice === 'claude' && !localStorage.getItem('claude_api_key')) {
        toast({
          title: "API Key Missing",
          description: "Please configure your Claude API key in settings",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      const generatedMealPlan = await generateMealPlan(formattedPreferences);
      setMealPlan(generatedMealPlan);

      // Save the meal plan to Supabase if user is logged in
      if (user) {
        try {
          // Check if this is the first meal plan for the user
          const { data: existingPlans } = await supabase
            .from('meal_plans')
            .select('id')
            .eq('user_id', user.id);
          
          const isFirst = !existingPlans || existingPlans.length === 0;
          
          // Insert the new meal plan
          const { error } = await supabase
            .from('meal_plans')
            .insert([
              { 
                user_id: user.id, 
                plan_data: generatedMealPlan,
                is_active: isFirst, // Set as active if it's the first plan
                title: `Meal Plan - ${new Date().toLocaleDateString()}`
              }
            ]);
            
          if (error) {
            console.error('Error saving meal plan:', error);
            toast({
              title: "Warning",
              description: "Your meal plan was generated but couldn't be saved to your account.",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error('Error in saving meal plan:', error);
        }
      } else {
        toast({
          title: "Not Logged In",
          description: "Create an account to save your meal plans for future reference.",
        });
      }

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

  const renderIntroScreen = () => (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg border shadow-sm">
      <h1 className="text-3xl font-bold mb-6 text-center">Welcome to AI Meal Planner</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Let's create your personalized weekly meal plans based on your preferences and dietary needs.
      </p>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">What You Can Do:</h2>
        <ul className="space-y-3 list-disc list-inside">
          <li>Generate custom meal plans based on your dietary preferences</li>
          <li>Store multiple meal plans in your account</li>
          <li>Switch between different meal plans anytime</li>
          <li>Create shopping lists from your meal plans</li>
        </ul>
      </div>
      
      <Button 
        onClick={handleGetStarted} 
        className="w-full bg-god-green text-white hover:bg-green-600"
      >
        Get Started
      </Button>
    </div>
  );

  // If user is logged in and hasn't seen intro, show intro screen
  if (user && !hasSeenIntro) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          {renderIntroScreen()}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">AI Meal Planner</h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Get a personalized meal plan based on your preferences and dietary needs.
          </p>

          {user && (
            <div className="mb-6 flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => navigate('/meal-plans')}
                className="text-god-green border-god-green hover:bg-god-green/10"
              >
                View My Meal Plans
              </Button>
            </div>
          )}

          {step === 'questionnaire' ? (
            <>
              <MealPlannerQuestionnaire 
                onSubmit={handleGenerateMealPlan} 
                isLoading={isLoading} 
              />
              <div className="max-w-md mx-auto">
                <AiModelSettings />
              </div>
            </>
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
