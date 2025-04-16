import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Store, Users, ShoppingBag, BarChart, Settings, FileText, 
  Plus, Search, Filter, RefreshCcw 
} from 'lucide-react';
import OrdersList from '@/components/grocery/OrdersList';
import StoreList from '@/components/grocery/StoreList';
import { Order } from '@/types/order';
import { Store as StoreType } from '@/types/store';
import { useToast } from '@/hooks/use-toast';
import { getInitialStores } from '@/utils/storeUtils';
import { 
  Table, TableBody, TableCaption, TableCell, 
  TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

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
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 43200000).toISOString()
  }
];

const getMockUsers = () => [
  { id: 'user1', email: 'john@example.com', role: 'customer', created_at: new Date().toISOString() },
  { id: 'user2', email: 'jane@example.com', role: 'customer', created_at: new Date().toISOString() },
  { id: 'user3', email: 'store@example.com', role: 'store_owner', created_at: new Date().toISOString() },
  { id: 'user4', email: 'admin@example.com', role: 'admin', created_at: new Date().toISOString() }
];

const AdminDashboard = () => {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'stores';
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>(getMockOrders());
  const [stores, setStores] = useState<StoreType[]>(getInitialStores());
  const [users] = useState(getMockUsers());
  const { toast } = useToast();

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

  return (
    <AdminLayout 
      title="Admin Control Panel" 
      icon={<Settings className="h-7 w-7" />}
    >
      <div className="mb-6">
        <Button 
          variant="outline" 
          className="text-god-green border-god-green hover:bg-god-green hover:text-white"
          onClick={() => navigate('/admin')}
        >
          Back to Dashboard
        </Button>
      </div>

      <Tabs defaultValue={defaultTab}>
        <TabsList className="grid grid-cols-5 mb-8 bg-white p-1 rounded-lg shadow-sm">
          <TabsTrigger value="stores" className="flex items-center gap-2 data-[state=active]:bg-green-50 data-[state=active]:text-god-green">
            <Store className="h-4 w-4" />
            Stores
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center gap-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600">
            <ShoppingBag className="h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-blue-50 data-[state=active]:text-blue-600">
            <BarChart className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2 data-[state=active]:bg-amber-50 data-[state=active]:text-amber-600">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stores">
          <Card className="bg-white shadow-md border-0">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-xl flex items-center">
                  <Store className="mr-2 h-5 w-5 text-god-green" />
                  Store Management
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search stores..." 
                      className="pl-8 w-full sm:w-[250px]" 
                    />
                  </div>
                  <Button className="bg-god-green hover:bg-green-700">
                    <Plus className="mr-1 h-4 w-4" /> Add Store
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
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
          <Card className="bg-white shadow-md border-0">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-xl flex items-center">
                  <Users className="mr-2 h-5 w-5 text-indigo-500" />
                  User Management
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search users..." 
                      className="pl-8 w-full sm:w-[250px]" 
                    />
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                  >
                    <Filter className="mr-1 h-4 w-4" /> Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                            user.role === 'admin' 
                              ? 'bg-red-100 text-red-800' 
                              : user.role === 'store_owner'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card className="bg-white shadow-md border-0">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle className="text-xl flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5 text-purple-500" />
                  Order Management
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="outline" 
                    className="border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <RefreshCcw className="mr-1 h-4 w-4" /> Refresh
                  </Button>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Export Orders
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <OrdersList 
                orders={orders} 
                onUpdateStatus={handleUpdateOrderStatus} 
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="bg-white shadow-md border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-blue-500" />
                Analytics Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-blue-50 border-0">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-muted-foreground text-sm">Total Orders</p>
                        <p className="text-3xl font-bold">{orders.length}</p>
                      </div>
                      <ShoppingBag className="h-8 w-8 text-blue-500 opacity-70" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 border-0">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-muted-foreground text-sm">Active Stores</p>
                        <p className="text-3xl font-bold">{stores.length}</p>
                      </div>
                      <Store className="h-8 w-8 text-god-green opacity-70" />
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-indigo-50 border-0">
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-muted-foreground text-sm">Registered Users</p>
                        <p className="text-3xl font-bold">{users.length}</p>
                      </div>
                      <Users className="h-8 w-8 text-indigo-500 opacity-70" />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex items-center justify-center py-8">
                <div className="text-center">
                  <img 
                    src="/lovable-uploads/6c7819bc-833f-448a-bb29-10fd7528af4c.png" 
                    alt="Gods Own Food" 
                    className="h-20 w-20 mx-auto opacity-30" 
                  />
                  <p className="text-muted-foreground mt-4">Detailed analytics charts will be implemented in a future update.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card className="bg-white shadow-md border-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <FileText className="mr-2 h-5 w-5 text-amber-500" />
                Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Sales Report", icon: <BarChart className="h-8 w-8 text-god-green" /> },
                  { title: "User Activity", icon: <Users className="h-8 w-8 text-indigo-500" /> },
                  { title: "Inventory Status", icon: <Store className="h-8 w-8 text-blue-500" /> },
                  { title: "Order Fulfillment", icon: <ShoppingBag className="h-8 w-8 text-purple-500" /> },
                  { title: "Financial Summary", icon: <FileText className="h-8 w-8 text-amber-500" /> },
                  { title: "System Logs", icon: <Settings className="h-8 w-8 text-slate-500" /> }
                ].map((report, index) => (
                  <Card key={index} className="hover:shadow-md transition-all hover:bg-amber-50">
                    <CardContent className="pt-6 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">Generate or view report</p>
                      </div>
                      <div className="bg-amber-100 p-2 rounded-full">
                        {report.icon}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminDashboard;
