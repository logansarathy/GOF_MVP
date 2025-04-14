
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Package, Store as StoreIcon, LayoutDashboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StoreDashboardHome = () => {
  const { user, isStoreOwner } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log("User in StoreDashboardHome:", user);
  console.log("Is store owner:", isStoreOwner());

  if (!isStoreOwner()) {
    navigate('/');
    toast({
      variant: "destructive",
      title: "Access Denied",
      description: "You don't have permission to access this page.",
    });
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <LayoutDashboard className="mr-2 h-7 w-7 text-god-green" />
            Store Owner Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/store-dashboard')}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <StoreIcon className="mr-2 h-5 w-5 text-god-green" />
                Inventory Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Manage your store's inventory, add new products, update prices, and more.</p>
              <Button className="w-full bg-god-green hover:bg-green-700">
                Go to Inventory Management
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/store-dashboard?tab=orders')}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5 text-god-green" />
                Order Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">View and manage customer orders, update order status, and coordinate deliveries.</p>
              <Button className="w-full bg-god-green hover:bg-green-700">
                Go to Order Management
              </Button>
            </CardContent>
          </Card>

          <Card className="col-span-1 md:col-span-2 hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Package className="mr-2 h-5 w-5 text-god-green" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">You have new orders waiting to be processed.</p>
              <Button className="w-full bg-god-green hover:bg-green-700" onClick={() => navigate('/store-dashboard?tab=orders')}>
                View All Orders
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StoreDashboardHome;
