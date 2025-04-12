
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center">
          <UtensilsCrossed className="h-6 w-6 text-god-green mr-2" />
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
          <Link to="/store-dashboard" className="text-sm font-medium transition-colors hover:text-god-green">
            For Stores
          </Link>
          
          <div className="ml-4 flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-god-green">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="text-god-green border-god-green hover:bg-god-green hover:text-white">
              <User className="h-4 w-4 mr-2" />
              Log in
            </Button>
            <Button className="bg-god-orange text-white hover:bg-orange-600">
              Sign up
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
