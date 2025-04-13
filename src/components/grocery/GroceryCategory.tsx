
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GroceryItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  quantity?: string;
}

interface CategoryProps {
  category: {
    id: string;
    name: string;
    icon: string;
  };
  items: GroceryItem[];
  onToggleItem: (id: string) => void;
  onRemoveItem: (id: string) => void;
}

const GroceryCategory: React.FC<CategoryProps> = ({ 
  category, 
  items, 
  onToggleItem, 
  onRemoveItem 
}) => {
  if (items.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2 flex items-center">
        <span className="mr-2">{category.icon}</span>
        {category.name} ({items.length})
      </h3>
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
    </div>
  );
};

export default GroceryCategory;
