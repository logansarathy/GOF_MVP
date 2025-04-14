
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, LogOut, Store, ShoppingBag, Shield } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const { user, signOut, isAdmin, isStoreOwner } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/auth">
          <Button variant="outline" className="text-god-green border-god-green hover:bg-god-green hover:text-white">
            <User className="h-4 w-4 mr-2" />
            Log in
          </Button>
        </Link>
        <Link to="/auth?tab=signup">
          <Button className="bg-god-orange text-white hover:bg-orange-600">
            Sign up
          </Button>
        </Link>
      </div>
    );
  }

  const getInitials = () => {
    const email = user.email || '';
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar>
            <AvatarImage src={user.user_metadata.avatar_url} />
            <AvatarFallback className="bg-god-green text-white">
              {getInitials()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          {user.email}
        </DropdownMenuItem>
        
        {/* Role-specific options */}
        {isAdmin() && (
          <DropdownMenuItem onClick={() => navigate('/admin-dashboard')}>
            <Shield className="h-4 w-4 mr-2" />
            Admin Dashboard
          </DropdownMenuItem>
        )}
        
        {(isStoreOwner() || isAdmin()) && (
          <DropdownMenuItem onClick={() => navigate('/store-dashboard')}>
            <Store className="h-4 w-4 mr-2" />
            Store Dashboard
          </DropdownMenuItem>
        )}
        
        <DropdownMenuItem onClick={() => navigate('/grocery-list')}>
          <ShoppingBag className="h-4 w-4 mr-2" />
          My Orders
        </DropdownMenuItem>
        
        <DropdownMenuItem disabled>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="h-4 w-4 mr-2" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
