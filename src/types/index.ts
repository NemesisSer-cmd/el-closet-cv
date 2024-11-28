export interface User {
  id: string;
  username: string;
  password: string;
  role: 'admin' | 'cashier' | 'inventory';
  name: string;
  createdAt: string;
}

export interface Product {
  id: string;
  barcode: string;
  name: string;
  description: string;
  costPrice: number;
  salePrice: number;
  wholesalePrice: number;
  department: string;
  requiresInventory: boolean;
  stock?: number;
  minStock?: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
    discount: number;
  }[];
  total: number;
  paymentMethod: 'cash' | 'card' | 'layaway';
  cashierId: string;
  clientId?: string;
  createdAt: string;
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CashMovement {
  id: string;
  type: 'in' | 'out';
  amount: number;
  description: string;
  userId: string;
  createdAt: string;
}

export interface Return {
  id: string;
  saleId: string;
  products: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  reason: string;
  userId: string;
  createdAt: string;
}