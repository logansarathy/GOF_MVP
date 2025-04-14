
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Store, StoreItem } from '@/types/store';
import { ShoppingBag, Plus, Minus } from 'lucide-react';

interface CustomerOrderFormProps {
  store: Store;
}

const CustomerOrderForm: React.FC<CustomerOrderFormProps> = ({ store }) => {
  const [cart, setCart] = useState<{ item: StoreItem; quantity: number }[]>([]);
  const { toast } = useToast();

  const addToCart = (item: StoreItem) => {
    // Check if item is already in cart
    const existingItem = cart.find(cartItem => cartItem.item.id === item.id);
    
    if (existingItem) {
      // Update quantity
      setCart(cart.map(cartItem => 
        cartItem.item.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      // Add new item
      setCart([...cart, { item, quantity: 1 }]);
    }
    
    toast({
      title: "Added to Cart",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      // Remove from cart
      setCart(cart.filter(cartItem => cartItem.item.id !== itemId));
    } else {
      // Update quantity
      setCart(cart.map(cartItem => 
        cartItem.item.id === itemId 
          ? { ...cartItem, quantity: newQuantity } 
          : cartItem
      ));
    }
  };

  const calculateTotal = () => {
    // In a real app, each item would have a price
    return cart.reduce((total, cartItem) => total + cartItem.quantity * 5, 0);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would save the order to the database
    toast({
      title: "Order Placed!",
      description: `Your order has been placed with ${store.name}.`,
    });
    
    // Clear cart
    setCart([]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5 text-god-green" />
              {store.name} - Available Items
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {store.inventory.map(item => (
              <div key={item.id} className="flex justify-between items-center p-2 border rounded">
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">In Stock: {item.quantity}</div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => addToCart(item)}
                  className="bg-god-green hover:bg-green-700"
                  disabled={item.quantity <= 0}
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            ))}
            
            {store.inventory.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                No items available at this store.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Cart</CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              Your cart is empty.
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map(cartItem => (
                <div key={cartItem.item.id} className="flex justify-between items-center p-2 border rounded">
                  <div className="flex-1">
                    <div className="font-medium">{cartItem.item.name}</div>
                    <div className="text-sm text-muted-foreground">$5.00 each</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      size="icon" 
                      variant="outline"
                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      className="w-16 text-center"
                      value={cartItem.quantity}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value)) {
                          updateQuantity(cartItem.item.id, value);
                        }
                      }}
                    />
                    <Button 
                      size="icon" 
                      variant="outline"
                      onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button 
            className="w-full bg-god-green hover:bg-green-700"
            onClick={placeOrder}
            disabled={cart.length === 0}
          >
            Place Order
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CustomerOrderForm;
