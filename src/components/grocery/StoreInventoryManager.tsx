
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, ShoppingBag, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Store as StoreType, StoreItem, Message } from '@/types/store';
import { getInitialStores, getInitialMessages, sendWhatsApp } from '@/utils/storeUtils';
import StoreForm from './StoreForm';
import InventoryItemForm from './InventoryItemForm';
import StoreList from './StoreList';
import InventoryList from './InventoryList';
import MessagesList from './MessagesList';

const StoreInventoryManager: React.FC = () => {
  const [stores, setStores] = useState<StoreType[]>(getInitialStores());
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isItemDialogOpen, setIsItemDialogOpen] = useState(false);
  const [newStore, setNewStore] = useState<Omit<StoreType, 'id' | 'inventory'>>({
    name: '',
    address: '',
    phone: '',
  });
  const [newItem, setNewItem] = useState<Omit<StoreItem, 'id'>>({
    name: '',
    quantity: 0,
  });
  const [editingStore, setEditingStore] = useState<StoreType | null>(null);
  const [editingItem, setEditingItem] = useState<StoreItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>('stores');
  const [messages, setMessages] = useState<Message[]>(getInitialMessages());
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

  const handleEditStore = (store: StoreType) => {
    setEditingStore(store);
    setNewStore({
      name: store.name,
      address: store.address,
      phone: store.phone,
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveStore = () => {
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
    if (!selectedStore) return;

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

  const handleSendReply = (replyText: string) => {
    const newMessage = {
      id: Date.now().toString(),
      sender: 'Store',
      text: replyText,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setMessages([...messages, newMessage]);
    
    toast({
      title: "Message Sent",
      description: "Your reply has been sent to the customer.",
    });
  };

  const handleSendWhatsApp = (phone: string) => {
    sendWhatsApp(phone);
    
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
              <StoreList 
                stores={stores} 
                onSelectStore={handleStoreSelect}
                onEditStore={handleEditStore}
                onDeleteStore={handleDeleteStore}
                onSendWhatsApp={handleSendWhatsApp}
              />
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
                <InventoryList 
                  items={getSelectedStore()?.inventory || []}
                  onEditItem={handleEditItem}
                  onDeleteItem={handleDeleteItem}
                />
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
                <MessagesList 
                  messages={messages}
                  onSendReply={handleSendReply}
                  onSendWhatsApp={handleSendWhatsApp}
                  storePhone={getSelectedStore()?.phone || ''}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <StoreForm 
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleSaveStore}
        editingStore={editingStore}
        newStore={newStore}
        setNewStore={setNewStore}
      />

      <InventoryItemForm 
        isOpen={isItemDialogOpen}
        onClose={() => setIsItemDialogOpen(false)}
        onSave={handleSaveItem}
        editingItem={editingItem}
        newItem={newItem}
        setNewItem={setNewItem}
      />
    </>
  );
};

export default StoreInventoryManager;
