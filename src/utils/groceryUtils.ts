
import { MealPlan } from '@/types/meal';

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  quantity?: string;
}

// Define grocery categories
export const groceryCategories = [
  { id: 'produce', name: 'Produce', icon: '🥦' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛' },
  { id: 'meat', name: 'Meat & Seafood', icon: '🥩' },
  { id: 'bakery', name: 'Bakery', icon: '🍞' },
  { id: 'pantry', name: 'Pantry', icon: '🥫' },
  { id: 'frozen', name: 'Frozen', icon: '❄️' },
  { id: 'other', name: 'Other', icon: '🛒' },
];

export const determineCategory = (ingredient: string): string => {
  if (/\b(fruit|apple|banana|berry|orange|lemon|lime|vegetable|lettuce|spinach|kale|carrot|broccoli|onion|garlic|potato|tomato|pepper)\b/i.test(ingredient)) {
    return 'produce';
  } else if (/\b(milk|cheese|yogurt|cream|butter|egg)\b/i.test(ingredient)) {
    return 'dairy';
  } else if (/\b(chicken|beef|pork|turkey|fish|salmon|shrimp|meat|sausage)\b/i.test(ingredient)) {
    return 'meat';
  } else if (/\b(bread|roll|bun|bagel|muffin|pastry|cake)\b/i.test(ingredient)) {
    return 'bakery';
  } else if (/\b(rice|pasta|bean|lentil|flour|sugar|oil|vinegar|sauce|spice|herb|canned|jar|can)\b/i.test(ingredient)) {
    return 'pantry';
  } else if (/\b(frozen|ice|pizza)\b/i.test(ingredient)) {
    return 'frozen';
  }
  return 'other';
};

export const createItemFromIngredient = (ingredient: string): GroceryItem => {
  return {
    id: Date.now().toString() + Math.random().toString(),
    name: ingredient,
    category: determineCategory(ingredient),
    checked: false
  };
};

export const extractMealPlanIngredients = (mealPlan: MealPlan, existingItems: GroceryItem[]): GroceryItem[] => {
  let newIngredients: GroceryItem[] = [];
  
  // Process all meal types
  Object.values(mealPlan.meals).forEach(mealArray => {
    mealArray.forEach(meal => {
      meal.ingredients.forEach(ingredient => {
        // Skip if this exact ingredient is already in the list
        if (existingItems.some(item => item.name.toLowerCase() === ingredient.toLowerCase())) {
          return;
        }
        
        newIngredients.push(createItemFromIngredient(ingredient));
      });
    });
  });
  
  return newIngredients;
};
