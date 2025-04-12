
import React from 'react';
import { Button } from '@/components/ui/button';
import { MealPlan } from '@/types/meal';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Clock, Download, Printer, RotateCcw } from 'lucide-react';

interface MealPlannerResultsProps {
  mealPlan: MealPlan | null;
  onCreateNew: () => void;
}

const MealPlannerResults: React.FC<MealPlannerResultsProps> = ({ mealPlan, onCreateNew }) => {
  if (!mealPlan) {
    return <div>No meal plan available. Please generate a new one.</div>;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-semibold">Your Personalized Meal Plan</h2>
            <p className="text-gray-500">Generated on {formatDate(mealPlan.generatedOn)}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-1" />
              Save
            </Button>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-md mb-6">
          <h3 className="font-medium mb-2">Summary</h3>
          <p className="text-gray-700">{mealPlan.summary}</p>
        </div>
        
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-god-green/10 p-3 rounded-md text-center">
            <p className="text-sm text-gray-500">Daily Calories</p>
            <p className="text-xl font-bold text-god-green">{mealPlan.totalNutrition.calories}</p>
          </div>
          <div className="bg-god-green/10 p-3 rounded-md text-center">
            <p className="text-sm text-gray-500">Protein</p>
            <p className="text-xl font-bold text-god-green">{mealPlan.totalNutrition.protein}g</p>
          </div>
          <div className="bg-god-green/10 p-3 rounded-md text-center">
            <p className="text-sm text-gray-500">Carbs</p>
            <p className="text-xl font-bold text-god-green">{mealPlan.totalNutrition.carbs}g</p>
          </div>
          <div className="bg-god-green/10 p-3 rounded-md text-center">
            <p className="text-sm text-gray-500">Fat</p>
            <p className="text-xl font-bold text-god-green">{mealPlan.totalNutrition.fat}g</p>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="breakfast">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="lunch">Lunch</TabsTrigger>
          <TabsTrigger value="dinner">Dinner</TabsTrigger>
          <TabsTrigger value="snacks">Snacks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breakfast" className="space-y-4">
          {mealPlan.meals.breakfast.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </TabsContent>
        
        <TabsContent value="lunch" className="space-y-4">
          {mealPlan.meals.lunch.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </TabsContent>
        
        <TabsContent value="dinner" className="space-y-4">
          {mealPlan.meals.dinner.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </TabsContent>
        
        <TabsContent value="snacks" className="space-y-4">
          {mealPlan.meals.snacks.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-center mt-8">
        <Button 
          onClick={onCreateNew}
          variant="outline"
          className="flex items-center"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Create New Meal Plan
        </Button>
      </div>
    </div>
  );
};

const MealCard = ({ meal }: { meal: any }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{meal.name}</CardTitle>
          <Button variant="ghost" size="icon" className="text-god-green">
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" /> {meal.prepTime} min
        </div>
        <CardDescription>{meal.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Ingredients</h4>
            <ul className="list-disc pl-5 space-y-1">
              {meal.ingredients.map((ingredient: string, index: number) => (
                <li key={index} className="text-sm">{ingredient}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Instructions</h4>
            <ol className="list-decimal pl-5 space-y-1">
              {meal.instructions.map((instruction: string, index: number) => (
                <li key={index} className="text-sm">{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          {meal.tags.map((tag: string, index: number) => (
            <span key={index} className="px-2 py-1 bg-god-green/10 text-god-green text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="text-sm text-gray-500">
          {meal.nutritionalInfo.calories} cal | {meal.nutritionalInfo.protein}g protein
        </div>
      </CardFooter>
    </Card>
  );
};

export default MealPlannerResults;
