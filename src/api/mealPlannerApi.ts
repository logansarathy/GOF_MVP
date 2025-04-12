
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Mock meal plan data structure for fallback when API is not available
const mockMealPlan = {
  id: "mock-meal-plan-1",
  meals: {
    breakfast: [
      {
        id: "breakfast-1",
        name: "Greek Yogurt Parfait",
        description: "A delicious layered parfait with Greek yogurt, fresh berries, and granola.",
        ingredients: [
          "1 cup Greek yogurt", 
          "1/2 cup mixed berries", 
          "1/4 cup granola", 
          "1 tbsp honey"
        ],
        instructions: [
          "Layer half of the yogurt in a glass or bowl.",
          "Add half of the berries.",
          "Sprinkle half of the granola.",
          "Repeat layers.",
          "Drizzle with honey."
        ],
        nutritionalInfo: {
          calories: 320,
          protein: 20,
          carbs: 40,
          fat: 10
        },
        tags: ["High Protein", "Vegetarian", "Quick"],
        prepTime: 5
      }
    ],
    lunch: [
      {
        id: "lunch-1",
        name: "Mediterranean Salad with Grilled Chicken",
        description: "A fresh salad with grilled chicken, feta cheese, and a lemon vinaigrette.",
        ingredients: [
          "4 oz grilled chicken breast",
          "2 cups mixed greens",
          "1/4 cup cherry tomatoes, halved",
          "1/4 cup cucumber, diced",
          "2 tbsp feta cheese",
          "1 tbsp olive oil",
          "1 tsp lemon juice",
          "Salt and pepper to taste"
        ],
        instructions: [
          "Combine mixed greens, tomatoes, and cucumber in a bowl.",
          "Slice the grilled chicken and add to the salad.",
          "Sprinkle with feta cheese.",
          "Mix olive oil and lemon juice for the dressing.",
          "Season with salt and pepper.",
          "Drizzle dressing over salad."
        ],
        nutritionalInfo: {
          calories: 350,
          protein: 35,
          carbs: 10,
          fat: 18
        },
        tags: ["High Protein", "Low Carb", "Mediterranean"],
        prepTime: 15
      }
    ],
    dinner: [
      {
        id: "dinner-1",
        name: "Baked Salmon with Quinoa and Roasted Vegetables",
        description: "Oven-baked salmon fillet served with fluffy quinoa and seasonal roasted vegetables.",
        ingredients: [
          "5 oz salmon fillet",
          "1/2 cup cooked quinoa",
          "1 cup mixed vegetables (broccoli, bell peppers, zucchini)",
          "1 tbsp olive oil",
          "1 clove garlic, minced",
          "1 tsp lemon zest",
          "Salt and pepper to taste",
          "Fresh herbs (optional)"
        ],
        instructions: [
          "Preheat oven to 400°F (200°C).",
          "Place salmon on a lined baking sheet, season with salt, pepper, and lemon zest.",
          "Toss vegetables with olive oil, garlic, salt and pepper.",
          "Spread vegetables on another baking sheet.",
          "Bake salmon for 12-15 minutes and vegetables for 20-25 minutes until done.",
          "Serve salmon and vegetables over cooked quinoa."
        ],
        nutritionalInfo: {
          calories: 450,
          protein: 35,
          carbs: 30,
          fat: 20
        },
        tags: ["High Protein", "Gluten-Free", "Omega-3"],
        prepTime: 35
      }
    ],
    snacks: [
      {
        id: "snack-1",
        name: "Apple with Almond Butter",
        description: "Simple, satisfying snack of fresh apple slices with natural almond butter.",
        ingredients: [
          "1 medium apple",
          "1 tbsp almond butter"
        ],
        instructions: [
          "Slice the apple into wedges.",
          "Serve with almond butter for dipping."
        ],
        nutritionalInfo: {
          calories: 180,
          protein: 4,
          carbs: 25,
          fat: 9
        },
        tags: ["Vegan", "Gluten-Free", "Quick"],
        prepTime: 2
      }
    ]
  },
  summary: "This balanced meal plan provides a good mix of protein, healthy fats, and complex carbohydrates. It's designed to keep you satisfied throughout the day while meeting your nutritional needs.",
  totalNutrition: {
    calories: 1300,
    protein: 94,
    carbs: 105,
    fat: 57
  },
  generatedOn: new Date().toISOString()
};

export const generateMealPlan = async (preferences: Record<string, string>) => {
  try {
    // Call the Supabase Edge Function to generate a meal plan
    const { data, error } = await supabase.functions.invoke('generate-meal-plan', {
      body: {
        preferences,
        userId: (await supabase.auth.getUser()).data.user?.id || 'anonymous',
      },
    });

    if (error) {
      console.error('Error calling generate-meal-plan function:', error);
      toast({
        title: 'Error',
        description: 'Failed to generate meal plan. Using sample data instead.',
        variant: 'destructive',
      });
      return mockMealPlan;
    }

    return data.mealPlan;
  } catch (error) {
    console.error('Error generating meal plan:', error);
    toast({
      title: 'Error',
      description: 'Failed to generate meal plan. Using sample data instead.',
      variant: 'destructive',
    });
    return mockMealPlan;
  }
};
