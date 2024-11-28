import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Sale, Return } from '../types';

interface SaleState {
  sales: Sale[];
  returns: Return[];
  addSale: (sale: Omit<Sale, 'id' | 'createdAt'>) => string;
  addReturn: (returnData: Omit<Return, 'id' | 'createdAt'>) => void;
  getSalesByDate: (date: Date) => Sale[];
  getSalesByUser: (userId: string) => Sale[];
  getReturnsByDate: (date: Date) => Return[];
}

export const useSaleStore = create<SaleState>((set, get) => ({
  sales: [],
  returns: [],
  addSale: (saleData) => {
    const id = uuidv4();
    const sale: Sale = {
      ...saleData,
      id,
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ sales: [...state.sales, sale] }));
    return id;
  },
  addReturn: (returnData) => {
    const return_: Return = {
      ...returnData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ returns: [...state.returns, return_] }));
  },
  getSalesByDate: (date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return get().sales.filter((sale) => {
      const saleDate = new Date(sale.createdAt);
      return saleDate >= startOfDay && saleDate <= endOfDay;
    });
  },
  getSalesByUser: (userId) => {
    return get().sales.filter((sale) => sale.cashierId === userId);
  },
  getReturnsByDate: (date) => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return get().returns.filter((return_) => {
      const returnDate = new Date(return_.createdAt);
      return returnDate >= startOfDay && returnDate <= endOfDay;
    });
  },
}));