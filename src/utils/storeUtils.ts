
import { Store, StoreItem, Message } from '@/types/store';

// Sample initial data
export const getInitialStores = (): Store[] => [
  {
    id: '1',
    name: 'Whole Foods Market',
    address: '123 Main St, Cityville',
    phone: '+15551234567',
    inventory: [
      { id: '1', name: 'Apple', quantity: 100 },
      { id: '2', name: 'Banana', quantity: 200 },
      { id: '3', name: 'Spinach', quantity: 50 },
      { id: '4', name: 'Chicken', quantity: 30 },
      { id: '5', name: 'Bread', quantity: 40 },
    ]
  },
  {
    id: '2',
    name: 'Farmers Fresh Market',
    address: '456 Oak Ave, Townsville',
    phone: '+15559876543',
    inventory: [
      { id: '1', name: 'Apple', quantity: 80 },
      { id: '2', name: 'Banana', quantity: 150 },
      { id: '3', name: 'Spinach', quantity: 70 },
      { id: '4', name: 'Chicken', quantity: 20 },
      { id: '5', name: 'Bread', quantity: 30 },
    ]
  },
  {
    id: '3',
    name: 'Green Valley Grocers',
    address: '789 Pine Rd, Villageton',
    phone: '+15551112222',
    inventory: [
      { id: '1', name: 'Apple', quantity: 120 },
      { id: '2', name: 'Banana', quantity: 180 },
      { id: '3', name: 'Spinach', quantity: 40 },
      { id: '4', name: 'Chicken', quantity: 35 },
      { id: '5', name: 'Bread', quantity: 50 },
    ]
  },
];

export const getInitialMessages = (): Message[] => [
  {
    id: '1',
    sender: 'Customer',
    text: 'Hello! I need 5 apples, 2 loaves of bread, and some chicken for tonight.',
    timestamp: new Date(Date.now() - 3600000).toLocaleTimeString()
  },
  {
    id: '2',
    sender: 'Store',
    text: 'We have all those items in stock! Would you like us to prepare them for pickup or delivery?',
    timestamp: new Date(Date.now() - 3500000).toLocaleTimeString()
  },
  {
    id: '3',
    sender: 'Customer',
    text: 'Pickup please, I can come by around 5pm.',
    timestamp: new Date(Date.now() - 3400000).toLocaleTimeString()
  }
];

// Utility to send WhatsApp message
export const sendWhatsApp = (phone: string, message?: string) => {
  // Format phone number (remove any non-digit characters)
  const formattedPhone = phone.replace(/\D/g, '');
  
  // Create WhatsApp URL
  const defaultMessage = "Hello, this is a message from your local store. How can we help you today?";
  const messageText = message || defaultMessage;
  const encodedMessage = encodeURIComponent(messageText);
  const whatsappURL = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
  
  // Open WhatsApp in a new tab
  window.open(whatsappURL, '_blank');
};
