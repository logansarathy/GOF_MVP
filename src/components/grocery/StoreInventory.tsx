
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Phone, ShoppingBag, Send } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

// Store interface
interface Store {
  id: string;
  name: string;
  distance: string;
  phone: string;
  inventory: Record<string, number>;
}

interface StoreInventoryProps {
  groceryItems: Array<{
    id: string;
    name: string;
    category: string;
    checked: boolean;
    quantity?: string;
  }>;
}

const StoreInventory: React.FC<StoreInventoryProps> = ({ groceryItems }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  // Load stores data
  useEffect(() => {
    // Mock store data with inventory
    const mockStores: Store[] = [
      {
        id: '1',
        name: 'Whole Foods Market',
        distance: '0.8 miles',
        phone: '+15551234567',
        inventory: {
          'apple': 100,
          'banana': 200,
          'spinach': 50,
          'chicken': 30,
          'bread': 40,
          'milk': 60,
          'eggs': 100,
          'rice': 80,
          'pasta': 70,
          'tomato': 90,
        }
      },
      {
        id: '2',
        name: 'Farmers Fresh Market',
        distance: '1.2 miles',
        phone: '+15559876543',
        inventory: {
          'apple': 80,
          'banana': 150,
          'spinach': 70,
          'chicken': 20,
          'bread': 30,
          'milk': 40,
          'eggs': 80,
          'rice': 50,
          'pasta': 60,
          'tomato': 120,
        }
      },
      {
        id: '3',
        name: 'Green Valley Grocers',
        distance: '2.1 miles',
        phone: '+15551112222',
        inventory: {
          'apple': 120,
          'banana': 180,
          'spinach': 40,
          'chicken': 35,
          'bread': 50,
          'milk': 55,
          'eggs': 90,
          'rice': 70,
          'pasta': 65,
          'tomato': 85,
        }
      },
    ];
    
    setStores(mockStores);
    
    // Try to load selected store from local storage
    const savedStore = localStorage.getItem('selectedGroceryStore');
    if (savedStore) {
      setSelectedStore(savedStore);
    }
  }, []);

  // Save selected store to local storage
  useEffect(() => {
    if (selectedStore) {
      localStorage.setItem('selectedGroceryStore', selectedStore);
    }
  }, [selectedStore]);

  // Check inventory availability
  const getAvailabilityStatus = (itemName: string) => {
    if (!selectedStore) return null;
    
    const store = stores.find(s => s.id === selectedStore);
    if (!store) return null;
    
    // Check if item name contains any keywords from the inventory
    const lowerItemName = itemName.toLowerCase();
    const matchingItem = Object.keys(store.inventory).find(item => 
      lowerItemName.includes(item.toLowerCase())
    );
    
    if (!matchingItem) return 'unknown';
    
    const stock = store.inventory[matchingItem];
    if (stock > 50) return 'in-stock';
    if (stock > 10) return 'limited';
    return 'low';
  };

  // Handle sending the grocery list to store via WhatsApp
  const handleSendToStore = () => {
    setIsDialogOpen(true);
    
    // If selected store, pre-fill phone number
    if (selectedStore) {
      const store = stores.find(s => s.id === selectedStore);
      if (store) {
        setPhoneNumber(store.phone);
      }
    }
  };

  const handleWhatsAppSend = () => {
    setIsSending(true);
    
    // Filter only unchecked items (items to buy)
    const itemsToBuy = groceryItems.filter(item => !item.checked);
    
    if (itemsToBuy.length === 0) {
      toast({
        title: "Empty List",
        description: "There are no items to purchase in your list.",
        variant: "destructive",
      });
      setIsSending(false);
      setIsDialogOpen(false);
      return;
    }
    
    // Format the message text
    let messageText = "Hello! I'd like to order the following items:\n\n";
    
    // Group by category
    const categories: Record<string, typeof itemsToBuy> = {};
    
    itemsToBuy.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = [];
      }
      categories[item.category].push(item);
    });
    
    // Add items by category
    Object.entries(categories).forEach(([category, items]) => {
      // Get category name
      const categoryName = {
        'produce': 'Produce',
        'dairy': 'Dairy & Eggs',
        'meat': 'Meat & Seafood',
        'bakery': 'Bakery',
        'pantry': 'Pantry',
        'frozen': 'Frozen',
        'other': 'Other',
      }[category] || category;
      
      messageText += `*${categoryName}*\n`;
      
      items.forEach(item => {
        messageText += `- ${item.name}${item.quantity ? ` (${item.quantity})` : ''}\n`;
      });
      
      messageText += '\n';
    });
    
    messageText += "Please let me know if these items are available. Thank you!";
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(messageText);
    
    // Format phone number (remove any non-digit characters)
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    toast({
      title: "Message Ready",
      description: "WhatsApp has been opened with your grocery list message.",
    });
    
    setIsSending(false);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card className="mt-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5 text-god-green" />
            Local Stores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <RadioGroup value={selectedStore || ''} onValueChange={setSelectedStore}>
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-2">
                  {stores.map(store => (
                    <div key={store.id} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                      <RadioGroupItem value={store.id} id={`store-${store.id}`} />
                      <Label htmlFor={`store-${store.id}`} className="flex flex-1 justify-between cursor-pointer">
                        <span>{store.name}</span>
                        <span className="text-gray-500 text-sm">{store.distance}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </RadioGroup>

            {groceryItems.filter(item => !item.checked).length > 0 && (
              <div className="pt-4">
                <Button 
                  onClick={handleSendToStore}
                  className="w-full bg-god-green text-white"
                  disabled={!selectedStore && stores.length > 0}
                >
                  <Send className="mr-2 h-4 w-4" />
                  Send Grocery List to Store
                </Button>
              </div>
            )}
          </div>

          {selectedStore && groceryItems.filter(item => !item.checked).length > 0 && (
            <div className="mt-6">
              <h4 className="font-medium mb-2">Item Availability:</h4>
              <ScrollArea className="h-[200px] pr-4">
                <div className="space-y-2">
                  {groceryItems
                    .filter(item => !item.checked)
                    .map(item => {
                      const availability = getAvailabilityStatus(item.name);
                      let color;
                      let status;
                      
                      switch (availability) {
                        case 'in-stock':
                          color = 'text-green-600 bg-green-50';
                          status = 'In Stock';
                          break;
                        case 'limited':
                          color = 'text-yellow-600 bg-yellow-50';
                          status = 'Limited Stock';
                          break;
                        case 'low':
                          color = 'text-red-600 bg-red-50';
                          status = 'Low Stock';
                          break;
                        default:
                          color = 'text-gray-600 bg-gray-50';
                          status = 'Unknown';
                      }
                      
                      return (
                        <div key={item.id} className="flex justify-between items-center p-2 border rounded">
                          <span>{item.name}</span>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${color}`}>
                            {status}
                          </span>
                        </div>
                      );
                    })}
                </div>
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Grocery List via WhatsApp</DialogTitle>
            <DialogDescription>
              Enter the store's WhatsApp number to send your grocery list.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Store Phone Number (with country code)</Label>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+1 555 123 4567"
                />
              </div>
              <p className="text-sm text-gray-500">
                Make sure to include the country code (e.g., +1 for US).
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleWhatsAppSend} 
              className="bg-green-600 text-white hover:bg-green-700"
              disabled={!phoneNumber || isSending}
            >
              {isSending ? "Preparing..." : "Open WhatsApp"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StoreInventory;
