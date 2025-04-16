
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/layouts/AdminLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Store, Users, ShoppingBag, BarChart, LayoutDashboard, Settings, ChevronRight, FileText } from 'lucide-react';

const AdminDashboardHome = () => {
  const navigate = useNavigate();

  const dashboardCards = [
    {
      title: "Store Management",
      description: "Manage all stores in the system, add new stores, edit existing ones, and more.",
      icon: <Store className="h-10 w-10 text-god-green" />,
      action: () => navigate('/admin-dashboard?tab=stores'),
      color: "from-green-400 to-green-600",
      buttonText: "Manage Stores"
    },
    {
      title: "User Management",
      description: "Manage users, update roles, and view user activity across the platform.",
      icon: <Users className="h-10 w-10 text-indigo-500" />,
      action: () => navigate('/admin-dashboard?tab=users'),
      color: "from-indigo-400 to-indigo-600",
      buttonText: "Manage Users"
    },
    {
      title: "Order Management",
      description: "View and manage orders from all stores in the system, track status and payments.",
      icon: <ShoppingBag className="h-10 w-10 text-purple-500" />,
      action: () => navigate('/admin-dashboard?tab=orders'),
      color: "from-purple-400 to-purple-600",
      buttonText: "View Orders"
    },
    {
      title: "Analytics Dashboard",
      description: "View overall system analytics, including orders, users, and store activity metrics.",
      icon: <BarChart className="h-10 w-10 text-blue-500" />,
      action: () => navigate('/admin-dashboard?tab=analytics'),
      color: "from-blue-400 to-blue-600",
      buttonText: "View Analytics"
    },
    {
      title: "System Settings",
      description: "Configure global system settings, including payment options and notification preferences.",
      icon: <Settings className="h-10 w-10 text-amber-500" />,
      action: () => navigate('/admin-dashboard?tab=settings'),
      color: "from-amber-400 to-amber-600",
      buttonText: "Configure Settings"
    },
    {
      title: "Reports",
      description: "Generate and view reports on sales, inventory, and user activity across the platform.",
      icon: <FileText className="h-10 w-10 text-rose-500" />,
      action: () => navigate('/admin-dashboard?tab=reports'),
      color: "from-rose-400 to-rose-600",
      buttonText: "View Reports"
    }
  ];

  return (
    <AdminLayout 
      title="Admin Dashboard" 
      icon={<LayoutDashboard className="h-7 w-7" />}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardCards.map((card, index) => (
          <Card 
            key={index} 
            className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            <div className={`h-2 bg-gradient-to-r ${card.color}`}></div>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <div className="p-1 rounded-xl bg-muted/50">
                {card.icon}
              </div>
              <CardTitle className="text-xl">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{card.description}</p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={card.action} 
                className="w-full bg-gradient-to-r from-god-green to-green-600 hover:from-green-600 hover:to-green-700 group"
              >
                {card.buttonText}
                <ChevronRight className="ml-auto h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-10 bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center mb-4">
          <img 
            src="/lovable-uploads/6c7819bc-833f-448a-bb29-10fd7528af4c.png" 
            alt="Gods Own Food" 
            className="h-14 w-14 mr-3" 
          />
          <div>
            <h2 className="text-xl font-bold text-god-green">Admin Overview</h2>
            <p className="text-muted-foreground">Manage everything from one place</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="bg-green-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Total Stores</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <Store className="h-8 w-8 text-god-green opacity-70" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Active Users</p>
                  <p className="text-3xl font-bold">1,254</p>
                </div>
                <Users className="h-8 w-8 text-purple-500 opacity-70" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-amber-50">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-muted-foreground text-sm">Monthly Orders</p>
                  <p className="text-3xl font-bold">845</p>
                </div>
                <ShoppingBag className="h-8 w-8 text-amber-500 opacity-70" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardHome;
