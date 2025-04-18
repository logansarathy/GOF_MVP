
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UserMenu from '@/components/UserMenu';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center">
          <img 
            src="/lovable-uploads/6c7819bc-833f-448a-bb29-10fd7528af4c.png" 
            alt="Gods Own Food" 
            className="h-10 w-10 mr-2" 
          />
          <Link to="/" className="text-xl font-bold text-god-green">
            Gods Own Food
          </Link>
        </div>
        
        <nav className="ml-auto flex items-center gap-4">
          <Link to="/meal-planner" className="text-sm font-medium transition-colors hover:text-god-green">
            Meal Planner
          </Link>
          <Link to="/grocery-list" className="text-sm font-medium transition-colors hover:text-god-green">
            Grocery List
          </Link>
          <Link to="/stores" className="text-sm font-medium transition-colors hover:text-god-green">
            <Store className="h-4 w-4 inline mr-1" />
            Stores
          </Link>
          
          <div className="ml-4 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-god-green">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <UserMenu />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
