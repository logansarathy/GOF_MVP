
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreHeader from '@/components/grocery/StoreHeader';
import StoreInventoryManager from '@/components/grocery/StoreInventoryManager';
import OrdersList from '@/components/grocery/OrdersList';
import { Order } from '@/types/order';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Store, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for orders - in a real app this would come from Supabase
const getMockOrders = (): Order[] => [
  {
    id: '1234abcd',
    userId: 'user1',
    userName: 'John Doe',
    storeId: 'store1',
    storeName: 'Green Grocers',
    items: [
      { id: 'item1', productId: 'prod1', productName: 'Apples', quantity: 2, price: 1.99 },
      { id: 'item2', productId: 'prod2', productName: 'Bananas', quantity: 3, price: 0.99 }
    ],
    total: 7.95,
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5678efgh',
    userId: 'user2',
    userName: 'Jane Smith',
    storeId: 'store1',
    storeName: 'Green Grocers',
    items: [
      { id: 'item3', productId: 'prod3', productName: 'Oranges', quantity: 4, price: 1.49 },
      { id: 'item4', productId: 'prod4', productName: 'Grapes', quantity: 1, price: 3.99 }
    ],
    total: 9.95,
    status: 'processing',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 43200000).toISOString() // 12 hours ago
  }
];

const StoreDashboard = () => {
  const { user, isStoreOwner } = useAuth();
  const [activeTab, setActiveTab] = useState<string>('inventory');
  const [orders, setOrders] = useState<Order[]>(getMockOrders());
  const { toast } = useToast();

  // In a real app, this would update the order in the database
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status, updatedAt: new Date().toISOString() } 
        : order
    ));
    
    toast({
      title: "Order Updated",
      description: `Order #${orderId.substring(0, 8)} has been marked as ${status}.`,
    });
  };

  // Log user info for debugging
  console.log("User in StoreDashboard:", user);
  console.log("Is store owner:", isStoreOwner());

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <StoreHeader title="Store Dashboard" />

        <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="mt-8">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="mt-0">
            <StoreInventoryManager />
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Order Management</h2>
              <OrdersList 
                orders={orders} 
                onUpdateStatus={handleUpdateOrderStatus} 
              />
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default StoreDashboard;
