import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MealPlan, Meal } from '@/types/meal';
import { useNavigate } from 'react-router-dom';
import { Clock, ChefHat, ArrowLeft, ShoppingCart } from 'lucide-react';

interface MealPlannerResultsProps {
  mealPlan: MealPlan | null;
  onCreateNew: () => void;
}

const MealPlannerResults: React.FC<MealPlannerResultsProps> = ({ mealPlan, onCreateNew }) => {
  const navigate = useNavigate();

  // Store the meal plan in local storage when it's displayed
  React.useEffect(() => {
    if (mealPlan) {
      localStorage.setItem('lastMealPlan', JSON.stringify(mealPlan));
    }
  }, [mealPlan]);

  if (!mealPlan) {
    return <div>No meal plan available</div>;
  }

  const getMealCount = () => {
    let count = 0;
    Object.values(mealPlan.meals).forEach(mealArray => {
      count += mealArray.length;
    });
    return count;
  };

  const renderMealCard = (meal: Meal) => (
    <Card key={meal.id} className="mb-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{meal.name}</CardTitle>
        <div className="flex flex-wrap gap-1 mt-1">
          {meal.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-god-green/10 text-god-green border-none">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{meal.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Clock className="h-4 w-4 mr-1" />
          <span>{meal.prepTime} min</span>
          <span className="mx-2">•</span>
          <ChefHat className="h-4 w-4 mr-1" />
          <span>
            {meal.prepTime < 15 
              ? 'Easy' 
              : meal.prepTime < 30 
                ? 'Medium' 
                : 'Advanced'}
          </span>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Ingredients:</h4>
          <ul className="list-disc list-inside space-y-1">
            {meal.ingredients.slice(0, 5).map((ingredient, index) => (
              <li key={index} className="text-sm">{ingredient}</li>
            ))}
            {meal.ingredients.length > 5 && (
              <li className="text-sm text-gray-500">+{meal.ingredients.length - 5} more ingredients</li>
            )}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">Nutritional Info:</h4>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-sm font-medium">{meal.nutritionalInfo.calories}</div>
              <div className="text-xs text-gray-500">calories</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-sm font-medium">{meal.nutritionalInfo.protein}g</div>
              <div className="text-xs text-gray-500">protein</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-sm font-medium">{meal.nutritionalInfo.carbs}g</div>
              <div className="text-xs text-gray-500">carbs</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-sm font-medium">{meal.nutritionalInfo.fat}g</div>
              <div className="text-xs text-gray-500">fat</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Personalized Meal Plan</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onCreateNew}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            New Plan
          </Button>
          <Button 
            size="sm" 
            className="flex items-center gap-2" 
            onClick={() => navigate('/grocery-list')}
          >
            <ShoppingCart className="h-4 w-4" />
            Grocery List
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Plan Summary</h3>
              <p className="text-gray-600">{mealPlan.summary}</p>
            </div>
            <div className="flex flex-wrap gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-god-green">{getMealCount()}</div>
                <div className="text-sm text-gray-500">Meals</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-god-green">{mealPlan.totalNutrition.calories}</div>
                <div className="text-sm text-gray-500">Calories/day</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-god-green">{mealPlan.totalNutrition.protein}g</div>
                <div className="text-sm text-gray-500">Protein/day</div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="breakfast">
            <TabsList className="mb-4 grid grid-cols-4">
              <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
              <TabsTrigger value="lunch">Lunch</TabsTrigger>
              <TabsTrigger value="dinner">Dinner</TabsTrigger>
              <TabsTrigger value="snacks">Snacks</TabsTrigger>
            </TabsList>
            <TabsContent value="breakfast" className="mt-0">
              {mealPlan.meals.breakfast.length > 0 ? (
                mealPlan.meals.breakfast.map(renderMealCard)
              ) : (
                <p className="text-gray-500 py-4 text-center">No breakfast meals in this plan</p>
              )}
            </TabsContent>
            <TabsContent value="lunch" className="mt-0">
              {mealPlan.meals.lunch.length > 0 ? (
                mealPlan.meals.lunch.map(renderMealCard)
              ) : (
                <p className="text-gray-500 py-4 text-center">No lunch meals in this plan</p>
              )}
            </TabsContent>
            <TabsContent value="dinner" className="mt-0">
              {mealPlan.meals.dinner.length > 0 ? (
                mealPlan.meals.dinner.map(renderMealCard)
              ) : (
                <p className="text-gray-500 py-4 text-center">No dinner meals in this plan</p>
              )}
            </TabsContent>
            <TabsContent value="snacks" className="mt-0">
              {mealPlan.meals.snacks.length > 0 ? (
                mealPlan.meals.snacks.map(renderMealCard)
              ) : (
                <p className="text-gray-500 py-4 text-center">No snacks in this plan</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default MealPlannerResults;
