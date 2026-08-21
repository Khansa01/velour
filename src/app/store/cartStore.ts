import { create } from "zustand";
import { Product } from "@/lib/data/products";

type CartItem = Product & { quantity: number };

type CartStore = {
  items: CartItem[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  add: (product) => {
    const existing = get().items.find((i) => i.id === product.id);
    if (existing) {
      set({ items: get().items.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i) });
    } else {
      set({ items: [...get().items, { ...product, quantity: 1 }] });
    }
  },

  remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

  clear: () => set({ items: [] }),

  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}));