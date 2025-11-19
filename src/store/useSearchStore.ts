"use client";

import { create } from "zustand";

interface SearchState {
  query: string;
  setQuery: (q: string) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  query: "",
  setQuery: (q: string) => set({ query: q }),
  reset: () => set({ query: "" })
}));
