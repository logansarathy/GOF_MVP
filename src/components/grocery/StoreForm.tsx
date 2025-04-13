
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Store } from '@/types/store';

interface StoreFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  editingStore: Store | null;
  newStore: Omit<Store, 'id' | 'inventory'>;
  setNewStore: React.Dispatch<React.SetStateAction<Omit<Store, 'id' | 'inventory'>>>;
}

const StoreForm: React.FC<StoreFormProps> = ({ 
  isOpen, 
  onClose, 
  onSave, 
  editingStore, 
  newStore, 
  setNewStore 
}) => {
  const { toast } = useToast();

  const handleSave = () => {
    if (!newStore.name || !newStore.address || !newStore.phone) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
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
          <DialogTitle>{editingStore ? 'Edit Store' : 'Add New Store'}</DialogTitle>
          <DialogDescription>
            {editingStore 
              ? 'Update the store information below.' 
              : 'Fill in the store details to add a new store.'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="store-name">Store Name</Label>
            <Input
              id="store-name"
              value={newStore.name}
              onChange={(e) => setNewStore({...newStore, name: e.target.value})}
              placeholder="Enter store name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="store-address">Address</Label>
            <Input
              id="store-address"
              value={newStore.address}
              onChange={(e) => setNewStore({...newStore, address: e.target.value})}
              placeholder="Enter store address"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="store-phone">Phone Number (with country code)</Label>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 text-gray-400" />
              <Input
                id="store-phone"
                value={newStore.phone}
                onChange={(e) => setNewStore({...newStore, phone: e.target.value})}
                placeholder="+1 555 123 4567"
              />
            </div>
            <p className="text-sm text-gray-500">
              Include the country code (e.g., +1 for US).
            </p>
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
            {editingStore ? 'Update Store' : 'Add Store'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StoreForm;
