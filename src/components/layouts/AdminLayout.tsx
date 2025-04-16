
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  icon?: React.ReactNode;
}

const AdminLayout = ({ children, title, icon }: AdminLayoutProps) => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is admin, if not redirect to home
  React.useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "You don't have permission to access this page.",
      });
    }
  }, [isAdmin, navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-green-100">
      <Navbar />
      <main className="flex-grow container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            {icon && <span className="mr-2 text-god-green">{icon}</span>}
            {title}
          </h1>
        </div>
        
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default AdminLayout;
