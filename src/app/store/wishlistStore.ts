import { create } from "zustand";
import { Product } from "@/lib/data/products";

type WishlistStore = {
  items: Product[];
  add: (product: Product) => void;
  remove: (id: string) => void;
  has: (id: string) => boolean;
};

export const useWishlistStore = create<WishlistStore>((set, get) => ({
  items: [],
  add: (product) => set({ items: [...get().items, product] }),
  remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
  has: (id) => get().items.some((i) => i.id === id),
}));