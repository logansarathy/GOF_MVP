
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { MealPlan } from '@/types/meal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Clock, Star, StarOff, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import MealPlannerResults from '@/components/MealPlannerResults';

interface StoredMealPlan {
  id: string;
  title: string;
  created_at: string;
  is_active: boolean;
  plan_data: MealPlan;
}

const MealPlans = () => {
  const [mealPlans, setMealPlans] = useState<StoredMealPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<StoredMealPlan | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchMealPlans = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('meal_plans')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Convert data to proper type
        const typedData = data as StoredMealPlan[];
        setMealPlans(typedData);
      } catch (error) {
        console.error('Error fetching meal plans:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your meal plans',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMealPlans();
  }, [user, navigate, toast]);

  const handleSetActive = async (planId: string) => {
    if (!user) return;

    try {
      // First, set all plans to inactive
      await supabase
        .from('meal_plans')
        .update({ is_active: false })
        .eq('user_id', user.id);

      // Then set the selected plan to active
      const { error } = await supabase
        .from('meal_plans')
        .update({ is_active: true })
        .eq('id', planId);

      if (error) {
        throw error;
      }

      // Update local state
      setMealPlans(prev => 
        prev.map(plan => ({
          ...plan,
          is_active: plan.id === planId
        }))
      );

      toast({
        title: 'Success',
        description: 'Active meal plan updated successfully',
      });
    } catch (error) {
      console.error('Error updating meal plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to update active meal plan',
        variant: 'destructive',
      });
    }
  };

  const handleDeletePlan = async () => {
    if (!planToDelete || !user) return;

    try {
      const { error } = await supabase
        .from('meal_plans')
        .delete()
        .eq('id', planToDelete)
        .eq('user_id', user.id);

      if (error) {
        throw error;
      }

      // Update local state
      setMealPlans(prev => prev.filter(plan => plan.id !== planToDelete));
      
      toast({
        title: 'Success',
        description: 'Meal plan deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting meal plan:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete meal plan',
        variant: 'destructive',
      });
    } finally {
      setShowDeleteDialog(false);
      setPlanToDelete(null);
    }
  };

  const confirmDelete = (planId: string) => {
    setPlanToDelete(planId);
    setShowDeleteDialog(true);
  };

  const handleViewMealPlan = (plan: StoredMealPlan) => {
    setSelectedPlan(plan);
  };

  const handleBackToList = () => {
    setSelectedPlan(null);
  };

  // Show meal plan detail view
  if (selectedPlan) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center">
              <Button variant="outline" onClick={handleBackToList} className="mr-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Meal Plans
              </Button>
              <h1 className="text-3xl font-bold">{selectedPlan.title}</h1>
            </div>
            
            <div className="mb-6">
              <MealPlannerResults 
                mealPlan={selectedPlan.plan_data} 
                onCreateNew={() => navigate('/meal-planner')} 
              />
            </div>
          </div>
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Meal Plans</h1>
            <Button 
              onClick={() => navigate('/meal-planner')}
              className="bg-god-green text-white hover:bg-green-600"
            >
              Create New Meal Plan
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading your meal plans...</p>
            </div>
          ) : mealPlans.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">No Meal Plans Yet</h3>
                  <p className="text-gray-500 mb-6">
                    You haven't created any meal plans yet. Get started by creating your first meal plan!
                  </p>
                  <Button 
                    onClick={() => navigate('/meal-planner')}
                    className="bg-god-green text-white hover:bg-green-600"
                  >
                    Create First Meal Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mealPlans.map(plan => (
                <Card 
                  key={plan.id} 
                  className={`cursor-pointer transition ${plan.is_active ? 'border-god-green' : ''}`}
                >
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">
                        {plan.title}
                        {plan.is_active && (
                          <span className="ml-2 text-xs bg-god-green text-white px-2 py-1 rounded-full">
                            Active
                          </span>
                        )}
                      </CardTitle>
                      <div className="flex space-x-1">
                        {!plan.is_active && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSetActive(plan.id);
                            }}
                            className="text-yellow-500"
                            title="Set as active"
                          >
                            <Star className="h-4 w-4" />
                          </Button>
                        )}
                        {plan.is_active && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            disabled
                            className="text-yellow-500"
                            title="Current active plan"
                          >
                            <StarOff className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(plan.id);
                          }}
                          className="text-red-500"
                          title="Delete plan"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent 
                    onClick={() => handleViewMealPlan(plan)}
                    className="pt-0"
                  >
                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Created: {new Date(plan.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex space-x-4 text-sm">
                      <div className="bg-gray-50 p-2 rounded flex flex-col items-center">
                        <span className="text-gray-500">Meals</span>
                        <span className="font-medium">
                          {Object.values(plan.plan_data.meals).flat().length}
                        </span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded flex flex-col items-center">
                        <span className="text-gray-500">Calories</span>
                        <span className="font-medium">
                          {plan.plan_data.totalNutrition.calories}/day
                        </span>
                      </div>
                      <div className="bg-gray-50 p-2 rounded flex flex-col items-center">
                        <span className="text-gray-500">Protein</span>
                        <span className="font-medium">
                          {plan.plan_data.totalNutrition.protein}g
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Meal Plan</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this meal plan? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowDeleteDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeletePlan}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default MealPlans;
