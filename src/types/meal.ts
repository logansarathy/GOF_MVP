
export interface Meal {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  tags: string[];
  prepTime: number; // in minutes
  image?: string;
}

export interface MealPlan {
  id: string;
  meals: {
    breakfast: Meal[];
    lunch: Meal[];
    dinner: Meal[];
    snacks: Meal[];
  };
  summary: string;
  totalNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  generatedOn: string;
}
