
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Store, Users, ShoppingBag, BarChart } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not admin (we'll implement admin check later)
  React.useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
    // TODO: Check if user is admin
  }, [user, navigate]);

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
                <p className="mb-4">Manage all stores in the system.</p>
                {/* Store management content will go here */}
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
                <p className="mb-4">Manage users and roles.</p>
                {/* User management content will go here */}
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
                <p className="mb-4">View and manage all orders across stores.</p>
                {/* Order management content will go here */}
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
                <p className="mb-4">System-wide analytics and reports.</p>
                {/* Analytics content will go here */}
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
