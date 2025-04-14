
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Store, Users, ShoppingBag, BarChart, LayoutDashboard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminDashboardHome = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  console.log("User in AdminDashboardHome:", user);
  console.log("Is admin:", isAdmin());

  if (!isAdmin()) {
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
            Admin Dashboard
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin-dashboard')}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Store className="mr-2 h-5 w-5 text-god-green" />
                Store Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Manage all stores in the system, add new stores, edit existing ones, and more.</p>
              <Button className="w-full bg-god-green hover:bg-green-700">
                Go to Store Management
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin-dashboard?tab=users')}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 h-5 w-5 text-god-green" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Manage users, update roles, and view user activity.</p>
              <Button className="w-full bg-god-green hover:bg-green-700">
                Go to User Management
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin-dashboard?tab=orders')}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ShoppingBag className="mr-2 h-5 w-5 text-god-green" />
                Order Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">View and manage orders from all stores in the system.</p>
              <Button className="w-full bg-god-green hover:bg-green-700">
                Go to Order Management
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/admin-dashboard?tab=analytics')}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BarChart className="mr-2 h-5 w-5 text-god-green" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">View overall system analytics, including orders, users, and store activity.</p>
              <Button className="w-full bg-god-green hover:bg-green-700">
                Go to Analytics
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboardHome;
