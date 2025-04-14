
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Package } from 'lucide-react';
import { Order } from '@/types/order';

interface OrdersListProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

const getStatusColor = (status: Order['status']) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500';
    case 'processing':
      return 'bg-blue-500';
    case 'completed':
      return 'bg-green-500';
    case 'cancelled':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const OrdersList: React.FC<OrdersListProps> = ({ orders, onUpdateStatus }) => {
  if (orders.length === 0) {
    return (
      <div className="p-8 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No orders yet</h3>
        <p className="mt-1 text-sm text-gray-500">New orders will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md flex items-center">
                <Package className="mr-2 h-5 w-5 text-god-green" />
                Order #{order.id.substring(0, 8)}
              </CardTitle>
              <Badge className={`${getStatusColor(order.status)} text-white`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {new Date(order.createdAt).toLocaleString()}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="font-semibold">Customer:</span> {order.userName}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Store:</span> {order.storeName}
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-semibold mb-1">Items:</h4>
                <ul className="space-y-1">
                  {order.items.map((item) => (
                    <li key={item.id} className="text-sm flex justify-between">
                      <span>{item.productName} × {item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-2 pt-2 border-t flex justify-between font-semibold">
                <span>Total:</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
            {order.status !== 'completed' && order.status !== 'cancelled' && (
              <div className="mt-4 flex gap-2 justify-end">
                {order.status === 'pending' && (
                  <Button 
                    onClick={() => onUpdateStatus(order.id, 'processing')}
                    className="bg-blue-500 hover:bg-blue-600"
                    size="sm"
                  >
                    Start Processing
                  </Button>
                )}
                {order.status === 'processing' && (
                  <Button 
                    onClick={() => onUpdateStatus(order.id, 'completed')}
                    className="bg-green-500 hover:bg-green-600"
                    size="sm"
                  >
                    Mark Completed
                  </Button>
                )}
                {order.status !== 'cancelled' && (
                  <Button 
                    onClick={() => onUpdateStatus(order.id, 'cancelled')}
                    variant="destructive"
                    size="sm"
                  >
                    Cancel Order
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default OrdersList;
