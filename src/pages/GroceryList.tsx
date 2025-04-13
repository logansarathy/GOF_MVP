
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { MealPlan } from '@/types/meal';
import GroceryHeader from '@/components/grocery/GroceryHeader';
import GroceryAddItemForm from '@/components/grocery/GroceryAddItemForm';
import StoreInventory from '@/components/grocery/StoreInventory';
import ShoppingListSection from '@/components/grocery/ShoppingListSection';
import CategorySidebar from '@/components/grocery/CategorySidebar';
import { GroceryItem, groceryCategories, extractMealPlanIngredients } from '@/utils/groceryUtils';

const GroceryListPage = () => {
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>([]);
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
    
    const newIngredients = extractMealPlanIngredients(mealPlan, groceryItems);
    const addedCount = newIngredients.length;
    
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
  
  const categoryCounts = groceryCategories.reduce((acc, category) => {
    acc[category.id] = groceryItems.filter(item => item.category === category.id).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <div className="max-w-4xl mx-auto">
          <GroceryHeader title="Grocery List" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <ShoppingListSection
                groceryItems={groceryItems}
                groceryCategories={groceryCategories}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                handleToggleChecked={handleToggleChecked}
                handleRemoveItem={handleRemoveItem}
                handleClearChecked={handleClearChecked}
                handleAddMealPlanIngredients={handleAddMealPlanIngredients}
                mealPlan={mealPlan}
              />
            </div>
            
            <div>
              <GroceryAddItemForm 
                onAddItem={handleAddItem}
                categories={groceryCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              
              <CategorySidebar
                categories={groceryCategories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                categoryCounts={categoryCounts}
              />
              
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
