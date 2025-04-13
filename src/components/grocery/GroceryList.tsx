
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GroceryCategory from './GroceryCategory';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  quantity?: string;
}

interface GroceryListProps {
  items: GroceryItem[];
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
  groupByCategory?: boolean;
}

const GroceryList: React.FC<GroceryListProps> = ({ 
  items, 
  onToggleItem, 
  onRemoveItem,
  groupByCategory = false
}) => {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No items in this list. Add some items to get started.
      </div>
    );
  }

  if (groupByCategory) {
    const categories = [
      { id: 'produce', name: 'Produce', icon: '🥦' },
      { id: 'dairy', name: 'Dairy & Eggs', icon: '🥛' },
      { id: 'meat', name: 'Meat & Seafood', icon: '🥩' },
      { id: 'bakery', name: 'Bakery', icon: '🍞' },
      { id: 'pantry', name: 'Pantry', icon: '🥫' },
      { id: 'frozen', name: 'Frozen', icon: '❄️' },
      { id: 'other', name: 'Other', icon: '🛒' },
    ];
    
    // Group items by category
    const itemsByCategory: Record<string, GroceryItem[]> = {};
    
    categories.forEach(category => {
      const categoryItems = items.filter(item => item.category === category.id);
      if (categoryItems.length > 0) {
        itemsByCategory[category.id] = categoryItems;
      }
    });
    
    return (
      <div className="space-y-6">
        {categories.map(category => (
          itemsByCategory[category.id] ? (
            <GroceryCategory
              key={category.id}
              category={category}
              items={itemsByCategory[category.id]}
              onToggleItem={onToggleItem}
              onRemoveItem={onRemoveItem}
            />
          ) : null
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-2">
      {items.map(item => (
        <div 
          key={item.id} 
          className={`flex items-center justify-between p-3 rounded-md border ${
            item.checked ? 'bg-gray-50 text-gray-500' : ''
          }`}
        >
          <div className="flex items-center">
            <Checkbox 
              id={`item-${item.id}`}
              checked={item.checked}
              onCheckedChange={() => onToggleItem(item.id)}
              className="mr-3"
            />
            <div>
              <label 
                htmlFor={`item-${item.id}`}
                className={`cursor-pointer ${item.checked ? 'line-through' : ''}`}
              >
                {item.name}
              </label>
              {item.quantity && (
                <div className="text-sm text-gray-500">
                  {item.quantity}
                </div>
              )}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onRemoveItem(item.id)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default GroceryList;
