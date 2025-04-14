
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Store, Search } from 'lucide-react';
import { Store as StoreType } from '@/types/store';
import { getInitialStores } from '@/utils/storeUtils';
import CustomerOrderForm from '@/components/grocery/CustomerOrderForm';

const StoreListPage = () => {
  const [stores] = useState<StoreType[]>(getInitialStores());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStore, setSelectedStore] = useState<StoreType | null>(null);

  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center">
            <Store className="mr-2 h-6 w-6 text-god-green" />
            Available Stores
          </h1>
          <p className="text-muted-foreground mt-2">
            Browse stores and order groceries for delivery or pickup.
          </p>
        </div>

        {selectedStore ? (
          <div>
            <Button
              variant="outline"
              className="mb-6"
              onClick={() => setSelectedStore(null)}
            >
              ← Back to Stores List
            </Button>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold">{selectedStore.name}</h2>
              <p className="text-muted-foreground">{selectedStore.address}</p>
              <p className="text-sm mt-1">Phone: {selectedStore.phone}</p>
            </div>
            
            <CustomerOrderForm store={selectedStore} />
          </div>
        ) : (
          <>
            <div className="relative mb-6">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search stores by name or location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStores.length > 0 ? (
                filteredStores.map(store => (
                  <Card key={store.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{store.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-2">{store.address}</p>
                      <p className="text-sm mb-4">
                        {store.inventory.length} items available
                      </p>
                      <Button 
                        className="w-full bg-god-green hover:bg-green-700"
                        onClick={() => setSelectedStore(store)}
                      >
                        Shop at this Store
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <Store className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No stores found</h3>
                  <p className="mt-1 text-muted-foreground">
                    Try adjusting your search or check back later for new stores.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default StoreListPage;
