
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Users, ShoppingBag, BarChart } from 'lucide-react';
import OrdersList from '@/components/grocery/OrdersList';
import StoreList from '@/components/grocery/StoreList';
import { Order } from '@/types/order';
import { Store as StoreType } from '@/types/store';
import { useToast } from '@/hooks/use-toast';
import { getInitialStores } from '@/utils/storeUtils';

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
    storeId: 'store2',
    storeName: 'Fresh Market',
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

// Mock data for users - in a real app this would come from Supabase
const getMockUsers = () => [
  { id: 'user1', email: 'john@example.com', role: 'customer', created_at: new Date().toISOString() },
  { id: 'user2', email: 'jane@example.com', role: 'customer', created_at: new Date().toISOString() },
  { id: 'user3', email: 'store@example.com', role: 'store_owner', created_at: new Date().toISOString() },
  { id: 'user4', email: 'admin@example.com', role: 'admin', created_at: new Date().toISOString() }
];

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(getMockOrders());
  const [stores, setStores] = useState<StoreType[]>(getInitialStores());
  const [users] = useState(getMockUsers());
  const { toast } = useToast();

  // Handle order status updates
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
  console.log("User in AdminDashboard:", user);
  console.log("Is admin:", isAdmin());

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button 
            variant="outline" 
            className="text-god-green border-god-green hover:bg-god-green hover:text-white"
            onClick={() => navigate('/store-dashboard')}
          >
            Go to Store View
          </Button>
        </div>

        <Tabs defaultValue="stores">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="stores" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Stores
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stores">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Store className="mr-2 h-5 w-5 text-god-green" />
                  Store Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">All stores in the system:</p>
                <StoreList 
                  stores={stores}
                  onSelectStore={(id) => {
                    console.log("Selected store:", id);
                    // In a real app, this would navigate to a store detail page
                  }}
                  onEditStore={(store) => {
                    console.log("Edit store:", store);
                    // In a real app, this would open a store edit dialog
                  }}
                  onDeleteStore={(id) => {
                    setStores(stores.filter(store => store.id !== id));
                    toast({
                      title: "Store Deleted",
                      description: "Store has been removed from the system.",
                    });
                  }}
                  onSendWhatsApp={(phone) => {
                    console.log("Send WhatsApp to:", phone);
                    // In a real app, this would open WhatsApp
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Users className="mr-2 h-5 w-5 text-god-green" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">All users in the system:</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-muted border-b">
                        <th className="px-4 py-2 text-left">Email</th>
                        <th className="px-4 py-2 text-left">Role</th>
                        <th className="px-4 py-2 text-left">Joined</th>
                        <th className="px-4 py-2 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b">
                          <td className="px-4 py-2">{user.email}</td>
                          <td className="px-4 py-2">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                              user.role === 'admin' 
                                ? 'bg-red-100 text-red-800' 
                                : user.role === 'store_owner'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-2">{new Date(user.created_at).toLocaleDateString()}</td>
                          <td className="px-4 py-2 text-right">
                            <Button variant="ghost" size="sm">Edit</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5 text-god-green" />
                  Order Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">All orders across stores:</p>
                <OrdersList 
                  orders={orders} 
                  onUpdateStatus={handleUpdateOrderStatus} 
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <BarChart className="mr-2 h-5 w-5 text-god-green" />
                  Analytics Dashboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{orders.length}</div>
                      <p className="text-muted-foreground">Total Orders</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{stores.length}</div>
                      <p className="text-muted-foreground">Active Stores</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-2xl font-bold">{users.length}</div>
                      <p className="text-muted-foreground">Registered Users</p>
                    </CardContent>
                  </Card>
                </div>
                <p className="text-center text-muted-foreground">Detailed analytics will be implemented in a future update.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
