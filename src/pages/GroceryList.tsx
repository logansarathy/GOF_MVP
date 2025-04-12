
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const GroceryList = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <div className="text-center max-w-3xl mx-auto py-16">
          <h1 className="text-3xl font-bold mb-6">Smart Grocery List</h1>
          <p className="text-xl text-gray-600 mb-8">
            This is a placeholder for the Smart Grocery List page. In the full application, this would contain your AI-generated grocery lists and local store connections.
          </p>
          <Button className="bg-god-green text-white hover:bg-green-600">
            Back to Home
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GroceryList;
