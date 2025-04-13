
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Edit, Trash2 } from 'lucide-react';
import { StoreItem } from '@/types/store';

interface InventoryListProps {
  items: StoreItem[];
  onEditItem: (item: StoreItem) => void;
  onDeleteItem: (itemId: string) => void;
}

const InventoryList: React.FC<InventoryListProps> = ({ items, onEditItem, onDeleteItem }) => {
  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-2">
        {items.map(item => (
          <div 
            key={item.id} 
            className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
          >
            <div>
              <span className="font-medium">{item.name}</span>
              <span className="text-gray-500 ml-2">
                Qty: 
                <span className={`ml-1 ${
                  item.quantity > 50 ? 'text-green-600' : 
                  item.quantity > 10 ? 'text-yellow-600' : 
                  'text-red-600'
                }`}>
                  {item.quantity}
                </span>
              </span>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onEditItem(item)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onDeleteItem(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default InventoryList;
