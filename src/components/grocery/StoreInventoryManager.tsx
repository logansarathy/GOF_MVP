
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Phone, Store, ShoppingBag, Edit, Plus, Trash2, WhatsApp, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Store interface
interface StoreItem {
  id: string;
  name: string;
  quantity: number;
}

interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  inventory: StoreItem[];
}

const StoreInventoryManager: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([
    {
      id: '1',
      name: 'Whole Foods Market',
      address: '123 Main St, Cityville',
      phone: '+15551234567',
      inventory: [
        { id: '1', name: 'Apple', quantity: 100 },
        { id: '2', name: 'Banana', quantity: 200 },
        { id: '3', name: 'Spinach', quantity: 50 },
        { id: '4', name: 'Chicken', quantity: 30 },
        { id: '5', name: 'Bread', quantity: 40 },
      ]
    },
    {
      id: '2',
      name: 'Farmers Fresh Market',
      address: '456 Oak Ave, Townsville',
      phone: '+15559876543',
      inventory: [
        { id: '1', name: 'Apple', quantity: 80 },
        { id: '2', name: 'Banana', quantity: 150 },
        { id: '3', name: 'Spinach', quantity: 70 },
        { id: '4', name: 'Chicken', quantity: 20 },
        { id: '5', name: 'Bread', quantity: 30 },
      ]
    },
    {
      id: '3',
      name: 'Green Valley Grocers',
      address: '789 Pine Rd, Villageton',
      phone: '+15551112222',
      inventory: [
        { id: '1', name: 'Apple', quantity: 120 },
        { id: '2', name: 'Banana', quantity: 180 },
        { id: '3', name: 'Spinach', quantity: 40 },
        { id: '4', name: 'Chicken', quantity: 35 },
        { id: '5', name: 'Bread', quantity: 50 },
      ]
    },
  ]);
  
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [newStore, setNewStore] = useState<Omit<Store, 'id' | 'inventory'>>({
    name: '',
    address: '',
    phone: '',
  });
  const [newItem, setNewItem] = useState<Omit<StoreItem, 'id'>>({
    name: '',
    quantity: 0,
  });
  const [editingStore, setEditingStore] = useState<Store | null>(null);
  const [editingItem, setEditingItem] = useState<StoreItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>('stores');
  const [messages, setMessages] = useState<{id: string, sender: string, text: string, timestamp: string}[]>([
    {
      id: '1',
      sender: 'Customer',
      text: 'Hello! I need 5 apples, 2 loaves of bread, and some chicken for tonight.',
      timestamp: new Date(Date.now() - 3600000).toLocaleTimeString()
    },
    {
      id: '2',
      sender: 'Store',
      text: 'We have all those items in stock! Would you like us to prepare them for pickup or delivery?',
      timestamp: new Date(Date.now() - 3500000).toLocaleTimeString()
    },
    {
      id: '3',
      sender: 'Customer',
      text: 'Pickup please, I can come by around 5pm.',
      timestamp: new Date(Date.now() - 3400000).toLocaleTimeString()
    }
  ]);
  const [replyText, setReplyText] = useState('');
  const { toast } = useToast();

  const handleStoreSelect = (storeId: string) => {
    setSelectedStore(storeId);
    setActiveTab('inventory');
  };

  const handleAddStore = () => {
    setEditingStore(null);
    setNewStore({
      name: '',
      address: '',
      phone: '',
    });
    setIsEditDialogOpen(true);
  };

  const handleEditStore = (store: Store) => {
    setEditingStore(store);
    setNewStore({
      name: store.name,
      address: store.address,
      phone: store.phone,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveStore = () => {
    if (!newStore.name || !newStore.address || !newStore.phone) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    if (editingStore) {
      // Update existing store
      setStores(stores.map(store => 
        store.id === editingStore.id 
          ? { ...store, ...newStore } 
          : store
      ));

      toast({
        title: "Store Updated",
        description: `${newStore.name} has been updated.`,
      });
    } else {
      // Add new store
      const newId = Date.now().toString();
      setStores([
        ...stores,
        {
          id: newId,
          ...newStore,
          inventory: []
        }
      ]);

      toast({
        title: "Store Added",
        description: `${newStore.name} has been added.`,
      });
    }

    setIsEditDialogOpen(false);
  };

  const handleDeleteStore = (storeId: string) => {
    setStores(stores.filter(store => store.id !== storeId));
    if (selectedStore === storeId) {
      setSelectedStore(null);
    }
    toast({
      title: "Store Deleted",
      description: "The store has been removed.",
    });
  };

  const handleAddItem = () => {
    if (!selectedStore) return;
    
    setEditingItem(null);
    setNewItem({
      name: '',
      quantity: 0,
    });
    setIsItemDialogOpen(true);
  };

  const handleEditItem = (item: StoreItem) => {
    setEditingItem(item);
    setNewItem({
      name: item.name,
      quantity: item.quantity,
    });
    setIsItemDialogOpen(true);
  };

  const handleSaveItem = () => {
    if (!selectedStore || !newItem.name || newItem.quantity < 0) {
      toast({
        title: "Error",
        description: "Please fill in all fields correctly.",
        variant: "destructive",
      });
      return;
    }

    const storeIndex = stores.findIndex(store => store.id === selectedStore);
    if (storeIndex === -1) return;

    const updatedStores = [...stores];
    const store = updatedStores[storeIndex];

    if (editingItem) {
      // Update existing item
      store.inventory = store.inventory.map(item => 
        item.id === editingItem.id 
          ? { ...item, ...newItem } 
          : item
      );
    } else {
      // Add new item
      const newId = Date.now().toString();
      store.inventory.push({
        id: newId,
        ...newItem,
      });
    }

    setStores(updatedStores);
    setIsItemDialogOpen(false);

    toast({
      title: editingItem ? "Item Updated" : "Item Added",
      description: `${newItem.name} has been ${editingItem ? 'updated' : 'added'} to inventory.`,
    });
  };

  const handleDeleteItem = (itemId: string) => {
    if (!selectedStore) return;
    
    const storeIndex = stores.findIndex(store => store.id === selectedStore);
    if (storeIndex === -1) return;

    const updatedStores = [...stores];
    const store = updatedStores[storeIndex];
    
    store.inventory = store.inventory.filter(item => item.id !== itemId);
    
    setStores(updatedStores);
    
    toast({
      title: "Item Deleted",
      description: "The item has been removed from inventory.",
    });
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: 'Store',
      text: replyText,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages([...messages, newMessage]);
    setReplyText('');
    
    toast({
      title: "Message Sent",
      description: "Your reply has been sent to the customer.",
    });
  };

  const handleSendWhatsApp = (phone: string) => {
    // Format phone number (remove any non-digit characters)
    const formattedPhone = phone.replace(/\D/g, '');
    
    // Create WhatsApp URL
    const messageText = "Hello, this is a message from your local store. How can we help you today?";
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappURL = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
    
    toast({
      title: "WhatsApp Opening",
      description: "WhatsApp is opening with a pre-filled message.",
    });
  };

  const getSelectedStore = () => {
    if (!selectedStore) return null;
    return stores.find(store => store.id === selectedStore) || null;
  };

  return (
    <>
      <Tabs defaultValue="stores" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="stores">Stores</TabsTrigger>
          <TabsTrigger value="inventory" disabled={!selectedStore}>Inventory</TabsTrigger>
          <TabsTrigger value="messages" disabled={!selectedStore}>Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stores" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg flex items-center">
                  <Store className="mr-2 h-5 w-5 text-god-green" />
                  Manage Stores
                </CardTitle>
                <Button 
                  onClick={handleAddStore}
                  className="bg-god-green text-white"
                  size="sm"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Store
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {stores.map(store => (
                    <Card key={store.id} className="p-4 border hover:border-god-green cursor-pointer">
                      <div className="flex justify-between">
                        <div onClick={() => handleStoreSelect(store.id)}>
                          <h3 className="font-medium text-lg">{store.name}</h3>
                          <p className="text-gray-500">{store.address}</p>
                          <p className="text-gray-500">{store.phone}</p>
                          <p className="text-sm mt-2">
                            <span className="font-medium">{store.inventory.length}</span> items in inventory
                          </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditStore(store);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteStore(store.id);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSendWhatsApp(store.phone);
                            }}
                            className="text-green-600 hover:text-green-800"
                          >
                            <WhatsApp className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory" className="mt-0">
          {selectedStore && (
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg flex items-center">
                    <ShoppingBag className="mr-2 h-5 w-5 text-god-green" />
                    {getSelectedStore()?.name} - Inventory
                  </CardTitle>
                  <Button 
                    onClick={handleAddItem}
                    className="bg-god-green text-white"
                    size="sm"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-2">
                    {getSelectedStore()?.inventory.map(item => (
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
                            onClick={() => handleEditItem(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="messages" className="mt-0">
          {selectedStore && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">
                  Customer Messages - {getSelectedStore()?.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col h-[500px]">
                  <ScrollArea className="flex-grow mb-4">
                    <div className="space-y-4">
                      {messages.map(message => (
                        <div 
                          key={message.id} 
                          className={`p-3 rounded-lg max-w-[80%] ${
                            message.sender === 'Store' 
                              ? 'bg-god-green text-white ml-auto' 
                              : 'bg-gray-100 mr-auto'
                          }`}
                        >
                          <div className="font-medium text-sm mb-1">
                            {message.sender} - {message.timestamp}
                          </div>
                          <div>{message.text}</div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="flex space-x-2">
                    <Input 
                      placeholder="Type your reply here..." 
                      value={replyText} 
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendReply();
                        }
                      }}
                    />
                    <Button 
                      onClick={handleSendReply}
                      disabled={!replyText.trim()}
                      className="bg-god-green text-white"
                    >
                      Send
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleSendWhatsApp(getSelectedStore()?.phone || '')}
                      className="text-green-600"
                    >
                      <WhatsApp className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Store Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveStore} 
              className="bg-god-green text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              {editingStore ? 'Update Store' : 'Add Store'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Inventory Item Dialog */}
      <Dialog open={isItemDialogOpen} onOpenChange={setIsItemDialogOpen}>
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
            <Button variant="outline" onClick={() => setIsItemDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveItem} 
              className="bg-god-green text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              {editingItem ? 'Update Item' : 'Add Item'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StoreInventoryManager;
