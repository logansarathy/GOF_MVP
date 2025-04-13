
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface GroceryAddItemFormProps {
  onAddItem: (name: string, category: string, quantity?: string) => void;
  categories: Array<{ id: string; name: string; icon: string }>;
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const GroceryAddItemForm: React.FC<GroceryAddItemFormProps> = ({
  onAddItem,
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAddItem(itemName, selectedCategory, quantity.trim() || undefined);
      setItemName('');
      setQuantity('');
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Add Item</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="item-name" className="block text-sm font-medium mb-1">
              Item Name
            </label>
            <Input
              id="item-name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              placeholder="Enter item name"
              required
            />
          </div>

          <div>
            <label htmlFor="quantity" className="block text-sm font-medium mb-1">
              Quantity (optional)
            </label>
            <Input
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g., 2 lbs, 3 pcs"
            />
          </div>

          <Button 
            type="submit" 
            className="w-full flex items-center gap-2 bg-god-green text-white"
          >
            <Plus className="h-4 w-4" /> Add Item
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GroceryAddItemForm;
