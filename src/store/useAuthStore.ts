"use client";

import { create } from "zustand";
import { User } from "@/types/user";
import { safeLocalStorage } from "@/lib/storage";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  hydrate: () => void;
}

const STORAGE_KEY = "blafflix_auth";

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  hydrate: () => {
    const stored = safeLocalStorage.get<User | null>(STORAGE_KEY, null);
    set({ user: stored });
  },
  login: async (email: string, password: string) => {
    set({ isLoading: true });
    await new Promise((res) => setTimeout(res, 600));

    // mock user
    const user: User = {
      id: "mock-user",
      name: email.split("@")[0] || "Utente Blafflix",
      email
    };

    safeLocalStorage.set(STORAGE_KEY, user);
    set({ user, isLoading: false });
  },
  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true });
    await new Promise((res) => setTimeout(res, 800));

    const user: User = {
      id: "mock-user",
      name,
      email
    };

    safeLocalStorage.set(STORAGE_KEY, user);
    set({ user, isLoading: false });
  },
  logout: () => {
    safeLocalStorage.remove(STORAGE_KEY);
    set({ user: null });
  }
}));
