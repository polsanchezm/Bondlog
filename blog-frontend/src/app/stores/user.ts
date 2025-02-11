import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchUserData, updateUserData, deleteUserData } from "@services/user";
import type { User, Register, APIError } from "@lib/interfaces";
import CryptoJS from "crypto-js";

const encryptionKey = process.env.NEXT_PUBLIC_PERSIST_KEY || "default_key";

const encryptState = (state: any) => {
  const stringState = JSON.stringify(state);
  return CryptoJS.AES.encrypt(stringState, encryptionKey).toString();
};

const decryptState = (str: string) => {
  const bytes = CryptoJS.AES.decrypt(str, encryptionKey);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
};

interface UserStore {
  user: User | null;
  loading: boolean;
  error: string | null;
  lastFetched: number; // Marca de tiempo de la última carga

  loadUser: () => Promise<void>;
  updateUser: (userData: Register) => Promise<boolean>;
  deleteUser: () => Promise<boolean>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      lastFetched: 0,

      loadUser: async () => {
        const now = Date.now();
        const cacheDuration = 10 * 60 * 1000; // 10 minutos
        if (get().user && now - get().lastFetched < cacheDuration) {
          return;
        }
        set({ loading: true, error: null });
        const response = await fetchUserData();
        if (response.error) {
          set({ error: response.error.message, loading: false });
        } else {
          set({ user: response.data, loading: false, lastFetched: Date.now() });
        }
      },

      updateUser: async (userData) => {
        set({ loading: true, error: null });
        const response = await updateUserData(userData);
        if (!response.error) {
          set({ user: response.data, loading: false, lastFetched: Date.now() });
          return true;
        } else {
          set({ error: response.error.message, loading: false });
          return false;
        }
      },

      deleteUser: async () => {
        set({ loading: true, error: null });
        const response = await deleteUserData();
        if (!response.error) {
          set({ user: null, loading: false, lastFetched: Date.now() });
          // También puedes limpiar el almacenamiento si es necesario:
          localStorage.removeItem("user-store");
          return true;
        } else {
          set({ error: response.error.message, loading: false });
          return false;
        }
      },
    }),
    {
      name: "user-store",
      serialize: (state: any) => encryptState(state),
      deserialize: (str: string) => decryptState(str),
    } as any // Cast to any to allow serialize/deserialize options.
  )
);
