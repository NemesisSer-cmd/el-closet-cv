import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../types';

interface ProductState {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'active'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  toggleProductStatus: (id: string) => void;
  getProductByBarcode: (barcode: string) => Product | undefined;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  addProduct: (productData) => {
    const product: Product = {
      ...productData,
      id: uuidv4(),
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    set((state) => ({ products: [...state.products, product] }));
  },
  updateProduct: (id, productData) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, ...productData, updatedAt: new Date().toISOString() }
          : product
      ),
    }));
  },
  toggleProductStatus: (id) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id
          ? { ...product, active: !product.active, updatedAt: new Date().toISOString() }
          : product
      ),
    }));
  },
  getProductByBarcode: (barcode) => {
    return get().products.find((product) => product.barcode === barcode);
  },
}));