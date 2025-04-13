
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { StoreItem } from '@/types/store';

interface InventoryItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  editingItem: StoreItem | null;
  newItem: Omit<StoreItem, 'id'>;
  setNewItem: React.Dispatch<React.SetStateAction<Omit<StoreItem, 'id'>>>;
}

const InventoryItemForm: React.FC<InventoryItemFormProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingItem, 
  newItem, 
  setNewItem 
}) => {
  const { toast } = useToast();

  const handleSave = () => {
    if (!newItem.name || newItem.quantity < 0) {
      toast({
        title: "Error",
        description: "Please fill in all fields correctly.",
        variant: "destructive",
      });
      return;
    }
    onSave();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editingItem ? 'Edit Item' : 'Add New Item'}</DialogTitle>
          <DialogDescription>
            {editingItem 
              ? 'Update the inventory item information.' 
              : 'Add a new item to inventory.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="item-name">Item Name</Label>
            <Input
              id="item-name"
              value={newItem.name}
              onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              placeholder="Enter item name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="item-quantity">Quantity</Label>
            <Input
              id="item-quantity"
              type="number"
              min="0"
              value={newItem.quantity}
              onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
              placeholder="Enter quantity"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            className="bg-god-green text-white"
          >
            <Save className="mr-2 h-4 w-4" />
            {editingItem ? 'Update Item' : 'Add Item'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InventoryItemForm;
