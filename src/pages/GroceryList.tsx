
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart, Plus, Trash2, ListChecks, Package, ArrowDownToLine } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { MealPlan } from '@/types/meal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

// Grocery item type
interface GroceryItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  quantity: string;
}

// Group grocery items by category
type GroupedItems = {
  [category: string]: GroceryItem[];
};

const GroceryList = () => {
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Produce');
  const [newItemQuantity, setNewItemQuantity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastMealPlan, setLastMealPlan] = useState<MealPlan | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load items from local storage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('groceryItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
    
    // Try to load the last meal plan from local storage
    const savedMealPlan = localStorage.getItem('lastMealPlan');
    if (savedMealPlan) {
      setLastMealPlan(JSON.parse(savedMealPlan));
    }
  }, []);

  // Save items to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('groceryItems', JSON.stringify(items));
  }, [items]);

  // Add a new item
  const addItem = () => {
    if (!newItemName.trim()) {
      toast({
        title: "Item name required",
        description: "Please enter a name for the item.",
        variant: "destructive",
      });
      return;
    }

    const newItem: GroceryItem = {
      id: crypto.randomUUID(),
      name: newItemName.trim(),
      category: newItemCategory,
      checked: false,
      quantity: newItemQuantity,
    };

    setItems(prevItems => [...prevItems, newItem]);
    setNewItemName('');
    setNewItemQuantity('');
    
    toast({
      title: "Item added",
      description: `${newItemName} added to your grocery list.`,
    });
  };

  // Toggle item checked state
  const toggleItemCheck = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Delete an item
  const deleteItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item removed from your grocery list.",
    });
  };

  // Clear all checked items
  const clearCheckedItems = () => {
    setItems(prevItems => prevItems.filter(item => !item.checked));
    toast({
      title: "Checked items cleared",
      description: "All checked items have been removed from your list.",
    });
  };

  // Group items by category
  const groupedItems = items.reduce<GroupedItems>((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {});

  // Extract ingredients from meal plan
  const extractIngredientsFromMealPlan = () => {
    if (!lastMealPlan) {
      toast({
        title: "No meal plan found",
        description: "Please create a meal plan first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Create a set to deduplicate ingredients
      const ingredients = new Set<string>();
      const { meals } = lastMealPlan;
      
      // Extract ingredients from all meals
      Object.values(meals).forEach(mealCategory => {
        mealCategory.forEach(meal => {
          meal.ingredients.forEach(ingredient => {
            // Clean up ingredient text to extract just the item name
            const cleanIngredient = ingredient
              .replace(/^\d+(\.\d+)?\s*(cup|tbsp|tsp|oz|g|lb|ml|l|bunch|clove|pinch|to taste).+\s+/, '')
              .replace(/,.*$/, '')
              .trim();
            
            ingredients.add(cleanIngredient);
          });
        });
      });
      
      // Create new grocery items from ingredients
      const newItems = Array.from(ingredients).map(name => ({
        id: crypto.randomUUID(),
        name,
        category: guessCategory(name),
        checked: false,
        quantity: '',
      }));
      
      // Add all new items that don't already exist (by name)
      const existingNames = new Set(items.map(item => item.name.toLowerCase()));
      const itemsToAdd = newItems.filter(item => !existingNames.has(item.name.toLowerCase()));
      
      if (itemsToAdd.length > 0) {
        setItems(prev => [...prev, ...itemsToAdd]);
        toast({
          title: "Ingredients added",
          description: `${itemsToAdd.length} ingredients added from your meal plan.`,
        });
      } else {
        toast({
          title: "No new ingredients",
          description: "All ingredients from your meal plan are already in your list.",
        });
      }
    } catch (error) {
      console.error("Error extracting ingredients:", error);
      toast({
        title: "Error",
        description: "Failed to extract ingredients from meal plan.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Guess category based on ingredient name
  const guessCategory = (ingredient: string): string => {
    ingredient = ingredient.toLowerCase();
    
    // Define category patterns
    const categories: Record<string, string[]> = {
      "Produce": ["apple", "banana", "lettuce", "tomato", "onion", "garlic", "potato", "carrot", "broccoli", "spinach", "kale", "avocado", "lemon", "lime", "berry", "fruit", "vegetable"],
      "Meat & Seafood": ["chicken", "beef", "pork", "lamb", "turkey", "fish", "salmon", "tuna", "shrimp", "meat"],
      "Dairy & Eggs": ["milk", "cheese", "yogurt", "butter", "cream", "egg"],
      "Bakery": ["bread", "roll", "bun", "bagel", "tortilla", "pastry", "cake", "pie"],
      "Pantry": ["rice", "pasta", "flour", "sugar", "oil", "vinegar", "sauce", "spice", "herb", "bean", "lentil", "canned", "soup", "cereal"],
      "Frozen": ["frozen", "ice cream"],
      "Beverages": ["water", "juice", "soda", "coffee", "tea"],
      "Snacks": ["chip", "cracker", "cookie", "candy", "chocolate", "nut", "popcorn"],
    };
    
    // Check each category for matching patterns
    for (const [category, patterns] of Object.entries(categories)) {
      if (patterns.some(pattern => ingredient.includes(pattern))) {
        return category;
      }
    }
    
    return "Other";
  };

  const goToMealPlanner = () => {
    navigate('/meal-planner');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Smart Grocery List</h1>
              <p className="text-gray-600">
                Organize your shopping needs and sync with your meal plans
              </p>
            </div>
            {lastMealPlan && (
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={extractIngredientsFromMealPlan}
                disabled={isLoading}
              >
                <ArrowDownToLine className="h-4 w-4" />
                Import From Meal Plan
              </Button>
            )}
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="list" className="flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                My Grocery List
              </TabsTrigger>
              <TabsTrigger value="add" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Items
              </TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="h-5 w-5" />
                      Your Grocery List
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={clearCheckedItems}
                        disabled={!items.some(item => item.checked)}
                      >
                        <ListChecks className="h-4 w-4 mr-2" />
                        Clear Checked
                      </Button>
                      {!lastMealPlan && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={goToMealPlanner}
                        >
                          Create Meal Plan
                        </Button>
                      )}
                    </div>
                  </div>
                  <CardDescription>
                    {items.length === 0 
                      ? "Your grocery list is empty. Add some items to get started."
                      : `You have ${items.length} ${items.length === 1 ? 'item' : 'items'} in your list`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {items.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                      <p className="text-gray-500">No items in your grocery list</p>
                      <Button className="mt-4" variant="outline" onClick={() => document.querySelector('[data-value="add"]')?.click()}>
                        Add Your First Item
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {Object.entries(groupedItems).map(([category, categoryItems]) => (
                        <div key={category}>
                          <h3 className="font-medium text-sm text-gray-500 mb-2">{category}</h3>
                          <div className="space-y-2">
                            {categoryItems.map(item => (
                              <div 
                                key={item.id} 
                                className={`flex items-center justify-between p-3 rounded-md border ${item.checked ? 'bg-gray-50' : ''}`}
                              >
                                <div className="flex items-center gap-3">
                                  <Checkbox 
                                    id={`item-${item.id}`}
                                    checked={item.checked}
                                    onCheckedChange={() => toggleItemCheck(item.id)}
                                  />
                                  <div className={`${item.checked ? 'line-through text-gray-400' : ''}`}>
                                    <label 
                                      htmlFor={`item-${item.id}`}
                                      className="font-medium cursor-pointer"
                                    >
                                      {item.name}
                                    </label>
                                    {item.quantity && (
                                      <p className="text-sm text-gray-500">{item.quantity}</p>
                                    )}
                                  </div>
                                </div>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => deleteItem(item.id)}
                                  className="text-gray-400 hover:text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                          <Separator className="my-4" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Add New Items
                  </CardTitle>
                  <CardDescription>
                    Add new items to your grocery list
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div>
                      <label htmlFor="item-name" className="block text-sm font-medium mb-1">
                        Item Name
                      </label>
                      <Input
                        id="item-name"
                        placeholder="Enter item name"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="item-category" className="block text-sm font-medium mb-1">
                          Category
                        </label>
                        <select
                          id="item-category"
                          value={newItemCategory}
                          onChange={(e) => setNewItemCategory(e.target.value)}
                          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        >
                          {["Produce", "Meat & Seafood", "Dairy & Eggs", "Bakery", "Pantry", "Frozen", "Beverages", "Snacks", "Other"].map(
                            (category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="item-quantity" className="block text-sm font-medium mb-1">
                          Quantity (Optional)
                        </label>
                        <Input
                          id="item-quantity"
                          placeholder="e.g., 2 lbs, 3 bags"
                          value={newItemQuantity}
                          onChange={(e) => setNewItemQuantity(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                    
                    <Button onClick={addItem} className="mt-2 w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Item
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GroceryList;
