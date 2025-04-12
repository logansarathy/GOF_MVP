
import React from 'react';
import { Store, Check, ShoppingCart } from 'lucide-react';

const GroceryIntegration = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center rounded-full bg-god-green/10 px-3 py-1 text-sm text-god-green mb-4">
              <Store className="mr-1 h-4 w-4" />
              <span>Local Store Connection</span>
            </div>
            <h2 className="text-3xl font-bold mb-6">Connect With Local Grocery Stores</h2>
            <p className="text-xl text-gray-600 mb-8">
              Skip the shopping hassle. Send your grocery list directly to local stores and have ingredients delivered to your door.
            </p>
            
            <ul className="space-y-4">
              {[
                "AI optimizes your grocery list based on meal plan",
                "Smart substitutions for unavailable ingredients",
                "Connect with multiple local stores",
                "Compare prices for the best deals",
                "Schedule deliveries or pickup times"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="mt-1 mr-3 flex h-5 w-5 items-center justify-center rounded-full bg-god-green">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <div className="absolute -z-10 h-full w-full bg-god-green/5 rounded-2xl -rotate-6"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5 text-god-green" />
                  Your Smart Grocery List
                </h3>
                <span className="text-god-green font-medium">12 items</span>
              </div>
              
              <div className="space-y-4">
                {[
                  { name: "Quinoa", amount: "1 cup", category: "Grains" },
                  { name: "Cherry Tomatoes", amount: "1 pint", category: "Vegetables" },
                  { name: "Spinach", amount: "5 oz bag", category: "Vegetables" },
                  { name: "Chickpeas", amount: "1 can", category: "Pantry" },
                  { name: "Avocado", amount: "2", category: "Produce" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between pb-2 border-b">
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">{item.category}</div>
                    </div>
                    <div className="text-sm">{item.amount}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-god-light-gray rounded-lg">
                <h4 className="font-medium mb-2">Local Stores Available:</h4>
                <div className="space-y-2">
                  {[
                    { name: "Whole Foods Market", distance: "0.8 miles" },
                    { name: "Farmers Fresh Market", distance: "1.2 miles" },
                    { name: "Green Valley Grocers", distance: "2.1 miles" },
                  ].map((store, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-white rounded">
                      <span>{store.name}</span>
                      <span className="text-sm text-gray-500">{store.distance}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroceryIntegration;
