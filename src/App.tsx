
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import MealPlanner from "./pages/MealPlanner";
import MealPlans from "./pages/MealPlans";
import GroceryList from "./pages/GroceryList";
import StoreDashboard from "./pages/StoreDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ 
  children, 
  requiredRole 
}: { 
  children: React.ReactNode, 
  requiredRole?: 'admin' | 'store_owner' 
}) => {
  const { user, userRole, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  
  if (!user) return <Navigate to="/auth" />;
  
  if (requiredRole) {
    if (requiredRole === 'admin' && userRole !== 'admin') {
      return <Navigate to="/" />;
    }
    
    if (requiredRole === 'store_owner' && userRole !== 'store_owner' && userRole !== 'admin') {
      return <Navigate to="/" />;
    }
  }
  
  return <>{children}</>;
};

// AppRoutes component to use useAuth hook
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/meal-planner" element={<MealPlanner />} />
      <Route path="/meal-plans" element={<MealPlans />} />
      <Route path="/grocery-list" element={<GroceryList />} />
      <Route path="/store-dashboard" element={
        <ProtectedRoute requiredRole="store_owner">
          <StoreDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin-dashboard" element={
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
