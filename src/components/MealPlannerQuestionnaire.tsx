
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MealPlannerQuestionnaireProps {
  onSubmit: (data: Record<string, string>) => void;
  isLoading: boolean;
}

const MealPlannerQuestionnaire: React.FC<MealPlannerQuestionnaireProps> = ({ onSubmit, isLoading }) => {
  const form = useForm({
    defaultValues: {
      dietaryPreferences: '',
      allergies: '',
      calorieGoal: '',
      mealCount: '3',
      cookingSkill: 'intermediate',
      additionalInfo: '',
    },
  });

  const handleSubmit = (data: Record<string, string>) => {
    onSubmit(data);
  };

  return (
    <div className="bg-white p-8 rounded-lg border shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Tell us about your preferences</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="dietaryPreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dietary Preferences</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., vegetarian, keto, paleo, Mediterranean" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Enter any dietary preferences or requirements you follow.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="allergies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Allergies or Restrictions</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., nuts, dairy, gluten, shellfish" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  List any food allergies or ingredients you want to avoid.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="calorieGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Daily Calorie Goal</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 2000" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Enter your daily calorie target (leave blank if unsure).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="mealCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meals Per Day</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of meals" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="3">3 (Breakfast, Lunch, Dinner)</SelectItem>
                    <SelectItem value="5">5 (Including Snacks)</SelectItem>
                    <SelectItem value="6">6 (Small Frequent Meals)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose how many meals you prefer per day.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cookingSkill"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cooking Skill Level</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select skill level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select your cooking experience level.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="additionalInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Information</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any other preferences, dislikes, or information that might help us create your meal plan..." 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Share any other details that could help personalize your meal plan.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-god-green text-white hover:bg-green-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating meal plan...
              </>
            ) : (
              'Generate My Meal Plan'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default MealPlannerQuestionnaire;
