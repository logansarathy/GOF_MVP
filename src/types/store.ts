
// Store interfaces
export interface StoreItem {
  id: string;
  name: string;
  quantity: number;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  phone: string;
  inventory: StoreItem[];
}

export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}
