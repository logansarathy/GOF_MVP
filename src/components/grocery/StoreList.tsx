
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Edit, Trash2, WhatsApp } from 'lucide-react';
import { Store } from '@/types/store';

interface StoreListProps {
  stores: Store[];
  onSelectStore: (storeId: string) => void;
  onEditStore: (store: Store) => void;
  onDeleteStore: (storeId: string) => void;
  onSendWhatsApp: (phone: string) => void;
}

const StoreList: React.FC<StoreListProps> = ({ 
  stores, 
  onSelectStore, 
  onEditStore, 
  onDeleteStore, 
  onSendWhatsApp 
}) => {
  return (
    <ScrollArea className="h-[500px] pr-4">
      <div className="space-y-4">
        {stores.map(store => (
          <Card key={store.id} className="p-4 border hover:border-god-green cursor-pointer">
            <div className="flex justify-between">
              <div onClick={() => onSelectStore(store.id)}>
                <h3 className="font-medium text-lg">{store.name}</h3>
                <p className="text-gray-500">{store.address}</p>
                <p className="text-gray-500">{store.phone}</p>
                <p className="text-sm mt-2">
                  <span className="font-medium">{store.inventory.length}</span> items in inventory
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditStore(store);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteStore(store.id);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSendWhatsApp(store.phone);
                  }}
                  className="text-green-600 hover:text-green-800"
                >
                  <WhatsApp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

export default StoreList;
