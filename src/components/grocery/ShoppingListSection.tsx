
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2 } from 'lucide-react';
import GroceryCategory from './GroceryCategory';
import GroceryList from './GroceryList';
import { MealPlan } from '@/types/meal';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  quantity?: string;
}

interface ShoppingListSectionProps {
  groceryItems: GroceryItem[];
  groceryCategories: Array<{ id: string; name: string; icon: string }>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  handleToggleChecked: (id: string) => void;
  handleRemoveItem: (id: string) => void;
  handleClearChecked: () => void;
  handleAddMealPlanIngredients: () => void;
  mealPlan: MealPlan | null;
}

const ShoppingListSection: React.FC<ShoppingListSectionProps> = ({
  groceryItems,
  groceryCategories,
  activeTab,
  setActiveTab,
  handleToggleChecked,
  handleRemoveItem,
  handleClearChecked,
  handleAddMealPlanIngredients,
  mealPlan,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">Shopping List</CardTitle>
          <div className="space-x-2">
            {mealPlan && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleAddMealPlanIngredients}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add Meal Plan Ingredients
              </Button>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClearChecked}
              className="flex items-center gap-2"
            >
              <Trash2 className="h-4 w-4" /> Clear Checked
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2">
                {groceryItems.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="unchecked">
              To Buy
              <Badge variant="secondary" className="ml-2">
                {groceryItems.filter(item => !item.checked).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="produce">Produce</TabsTrigger>
            <TabsTrigger value="pantry">Pantry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <ScrollArea className="h-[calc(100vh-350px)] pr-4">
              {groceryCategories.map(category => (
                <GroceryCategory
                  key={category.id}
                  category={category}
                  items={groceryItems.filter(item => item.category === category.id)}
                  onToggleItem={handleToggleChecked}
                  onRemoveItem={handleRemoveItem}
                />
              ))}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="unchecked" className="mt-0">
            <ScrollArea className="h-[calc(100vh-350px)] pr-4">
              <GroceryList 
                items={groceryItems.filter(item => !item.checked)}
                onToggleItem={handleToggleChecked}
                onRemoveItem={handleRemoveItem}
                groupByCategory={true}
              />
            </ScrollArea>
          </TabsContent>
          
          {groceryCategories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-0">
              <ScrollArea className="h-[calc(100vh-350px)] pr-4">
                <GroceryList 
                  items={groceryItems.filter(item => item.category === category.id)}
                  onToggleItem={handleToggleChecked}
                  onRemoveItem={handleRemoveItem}
                  groupByCategory={false}
                />
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ShoppingListSection;
