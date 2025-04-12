
import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

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
      dietType: '',
      healthGoals: [],
    },
  });

  const handleDietTypeSelect = (value: string) => {
    form.setValue('dietType', value);
    // Update dietary preferences field with the selected diet type
    const currentPreferences = form.getValues('dietaryPreferences');
    if (currentPreferences && !currentPreferences.includes(value)) {
      form.setValue('dietaryPreferences', currentPreferences ? `${currentPreferences}, ${value}` : value);
    } else if (!currentPreferences) {
      form.setValue('dietaryPreferences', value);
    }
  };

  const handleSubmit = (data: Record<string, string>) => {
    onSubmit(data);
  };

  const dietTypes = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'keto', label: 'Keto' },
    { value: 'paleo', label: 'Paleo' },
    { value: 'mediterranean', label: 'Mediterranean' },
    { value: 'glutenFree', label: 'Gluten-Free' },
  ];

  const healthGoals = [
    { id: 'weight-loss', label: 'Weight Loss' },
    { id: 'muscle-gain', label: 'Muscle Gain' },
    { id: 'maintenance', label: 'Maintenance' },
    { id: 'heart-health', label: 'Heart Health' },
    { id: 'energy-boost', label: 'Energy Boost' },
  ];

  return (
    <div className="bg-white p-8 rounded-lg border shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Tell us about your preferences</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormLabel>Diet Type</FormLabel>
            <ToggleGroup 
              type="single" 
              className="flex flex-wrap gap-2 justify-start"
              onValueChange={handleDietTypeSelect}
              value={form.watch('dietType')}
            >
              {dietTypes.map((diet) => (
                <ToggleGroupItem 
                  key={diet.value} 
                  value={diet.value}
                  className="bg-gray-100 data-[state=on]:bg-god-green data-[state=on]:text-white"
                >
                  {diet.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
            <FormDescription>
              Select your primary diet type. This will help us tailor your meal plan.
            </FormDescription>
          </div>
          
          <FormField
            control={form.control}
            name="dietaryPreferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Dietary Preferences</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., low-sodium, dairy-free, pescatarian" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Enter any additional dietary preferences or requirements you follow.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="healthGoals"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Health Goals</FormLabel>
                  <FormDescription>
                    Select the health goals you want your meal plan to support.
                  </FormDescription>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {healthGoals.map((goal) => (
                    <FormField
                      key={goal.id}
                      control={form.control}
                      name="healthGoals"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={goal.id}
                            className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(goal.id)}
                                onCheckedChange={(checked) => {
                                  const values = field.value || [];
                                  return checked
                                    ? field.onChange([...values, goal.id])
                                    : field.onChange(
                                        values.filter((value: string) => value !== goal.id)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {goal.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
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
                <RadioGroup 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="3" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      3 (Breakfast, Lunch, Dinner)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="5" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      5 (Including Snacks)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="6" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      6 (Small Frequent Meals)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
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
