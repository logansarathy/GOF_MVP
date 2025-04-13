
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StoreHeader from '@/components/grocery/StoreHeader';
import StoreInventoryManager from '@/components/grocery/StoreInventoryManager';

const StoreDashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <StoreHeader title="Store Dashboard" />
        <div className="my-8">
          <StoreInventoryManager />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StoreDashboard;
