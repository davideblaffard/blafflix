"use client";

import { create } from "zustand";
import { Movie } from "@/types/movie";
import { safeLocalStorage } from "@/lib/storage";

interface MyListState {
  items: Movie[];
  hydrate: () => void;
  add: (movie: Movie) => void;
  remove: (id: string) => void;
  isInList: (id: string) => boolean;
}

const STORAGE_KEY = "blafflix_my_list";

export const useMyListStore = create<MyListState>((set, get) => ({
  items: [],
  hydrate: () => {
    const stored = safeLocalStorage.get<Movie[]>(STORAGE_KEY, []);
    set({ items: stored });
  },
  add: (movie: Movie) => {
    const { items } = get();
    if (items.some((m) => m.id === movie.id)) return;
    const updated = [...items, movie];
    safeLocalStorage.set(STORAGE_KEY, updated);
    set({ items: updated });
  },
  remove: (id: string) => {
    const { items } = get();
    const updated = items.filter((m) => m.id !== id);
    safeLocalStorage.set(STORAGE_KEY, updated);
    set({ items: updated });
  },
  isInList: (id: string) => {
    const { items } = get();
    return items.some((m) => m.id === id);
  }
}));
