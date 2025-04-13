
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Plus, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MealPlan } from '@/types/meal';
import GroceryCategory from '@/components/grocery/GroceryCategory';
import GroceryAddItemForm from '@/components/grocery/GroceryAddItemForm';
import GroceryList from '@/components/grocery/GroceryList';
import StoreInventory from '@/components/grocery/StoreInventory';

// Define the grocery item interface
interface GroceryItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  quantity?: string;
}

// Define grocery categories
const groceryCategories = [
  { id: 'produce', name: 'Produce', icon: '🥦' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛' },
  { id: 'meat', name: 'Meat & Seafood', icon: '🥩' },
  { id: 'bakery', name: 'Bakery', icon: '🍞' },
  { id: 'pantry', name: 'Pantry', icon: '🥫' },
  { id: 'frozen', name: 'Frozen', icon: '❄️' },
  { id: 'other', name: 'Other', icon: '🛒' },
];

const GroceryListPage = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
  const [newItem, setNewItem] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('produce');
  const [activeTab, setActiveTab] = useState('all');
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const { toast } = useToast();

  // Load grocery items from local storage on component mount
  useEffect(() => {
    const savedItems = localStorage.getItem('groceryItems');
    if (savedItems) {
      setGroceryItems(JSON.parse(savedItems));
    }
    
    const savedMealPlan = localStorage.getItem('lastMealPlan');
    if (savedMealPlan) {
      setMealPlan(JSON.parse(savedMealPlan));
    }
  }, []);

  // Save grocery items to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('groceryItems', JSON.stringify(groceryItems));
  }, [groceryItems]);

  // Function to handle adding a new item
  const handleAddItem = (itemName: string, category: string = selectedCategory, quantity?: string) => {
    if (!itemName.trim()) return;
    
    const newItem: GroceryItem = {
      id: Date.now().toString(),
      name: itemName.trim(),
      category: category,
      checked: false,
      quantity: quantity
    };
    
    setGroceryItems([...groceryItems, newItem]);
    setNewItem('');
    
    toast({
      title: "Item Added",
      description: `${itemName} has been added to your grocery list.`,
    });
  };

  // Function to handle removing an item
  const handleRemoveItem = (id: string) => {
    setGroceryItems(groceryItems.filter(item => item.id !== id));
  };

  // Function to handle toggling an item's checked status
  const handleToggleChecked = (id: string) => {
    setGroceryItems(
      groceryItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  // Clear all checked items
  const handleClearChecked = () => {
    setGroceryItems(groceryItems.filter(item => !item.checked));
    toast({
      title: "Cleared",
      description: "Checked items have been removed from your list.",
    });
  };

  // Add all meal plan ingredients
  const handleAddMealPlanIngredients = () => {
    if (!mealPlan) return;
    
    let newIngredients: GroceryItem[] = [];
    let addedCount = 0;
    
    // Process all meal types
    Object.values(mealPlan.meals).forEach(mealArray => {
      mealArray.forEach(meal => {
        meal.ingredients.forEach(ingredient => {
          // Skip if this exact ingredient is already in the list
          if (groceryItems.some(item => item.name.toLowerCase() === ingredient.toLowerCase())) {
            return;
          }
          
          // Determine category based on ingredient text
          let category = 'other';
          
          if (/\b(fruit|apple|banana|berry|orange|lemon|lime|vegetable|lettuce|spinach|kale|carrot|broccoli|onion|garlic|potato|tomato|pepper)\b/i.test(ingredient)) {
            category = 'produce';
          } else if (/\b(milk|cheese|yogurt|cream|butter|egg)\b/i.test(ingredient)) {
            category = 'dairy';
          } else if (/\b(chicken|beef|pork|turkey|fish|salmon|shrimp|meat|sausage)\b/i.test(ingredient)) {
            category = 'meat';
          } else if (/\b(bread|roll|bun|bagel|muffin|pastry|cake)\b/i.test(ingredient)) {
            category = 'bakery';
          } else if (/\b(rice|pasta|bean|lentil|flour|sugar|oil|vinegar|sauce|spice|herb|canned|jar|can)\b/i.test(ingredient)) {
            category = 'pantry';
          } else if (/\b(frozen|ice|pizza)\b/i.test(ingredient)) {
            category = 'frozen';
          }
          
          newIngredients.push({
            id: Date.now().toString() + Math.random().toString(),
            name: ingredient,
            category: category,
            checked: false
          });
          
          addedCount++;
        });
      });
    });
    
    if (newIngredients.length > 0) {
      setGroceryItems([...groceryItems, ...newIngredients]);
      toast({
        title: "Ingredients Added",
        description: `${addedCount} ingredients from your meal plan have been added to your grocery list.`,
      });
    } else {
      toast({
        title: "No New Ingredients",
        description: "All ingredients from your meal plan are already in your grocery list.",
      });
    }
  };

  // Filter items based on active tab and category
  const filteredItems = groceryItems.filter(item => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unchecked') return !item.checked;
    return item.category === activeTab;
  });
  
  const categoryCounts = groceryCategories.reduce((acc, category) => {
    acc[category.id] = groceryItems.filter(item => item.category === category.id).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Grocery List</h1>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
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
            </div>
            
            <div>
              <GroceryAddItemForm 
                onAddItem={handleAddItem}
                categories={groceryCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              
              <Card className="mt-6">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {groceryCategories.map(category => (
                      <div
                        key={category.id}
                        className={`flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 ${
                          selectedCategory === category.id ? 'bg-gray-100' : ''
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <span className="text-xl mr-3">{category.icon}</span>
                        <span className="flex-1">{category.name}</span>
                        <Badge variant="outline">
                          {categoryCounts[category.id] || 0}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <StoreInventory groceryItems={groceryItems} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GroceryListPage;
