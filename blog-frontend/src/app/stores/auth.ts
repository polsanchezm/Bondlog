import { create } from "zustand";
import { getSession, userLogin, userSignup, userLogout } from "@services/auth";
import type {
  User,
  SessionPayload,
  FormState,
  Register,
} from "@lib/interfaces";

interface AuthStore {
  user: User | null;
  session: SessionPayload | null;
  isAuth: boolean;
  loading: boolean;
  error: string | null;
  lastFetched: number; // Marca de tiempo de la última comprobación

  checkAuth: () => Promise<void>;
  login: (userData: FormState) => Promise<boolean>;
  signup: (formData: Register) => Promise<boolean>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
  user: null,
  session: null,
  isAuth: false,
  loading: false,
  error: null,
  lastFetched: 0,

  checkAuth: async () => {
    const now = Date.now();
    const cacheDuration = 10 * 60 * 1000; // 10 minutos
    // Si ya existe una sesión y es reciente, no se vuelve a comprobar.
    if (get().session && now - get().lastFetched < cacheDuration) {
      return;
    }
    set({ loading: true });
    try {
      const session = await getSession();
      if (session) {
        const sessionPayload: SessionPayload = {
          userToken: session.userToken as string,
          userRole: session.userRole as string,
          expiresAt: new Date(session.expiresAt as string),
        };
        set({
          session: sessionPayload,
          isAuth: true,
          loading: false,
          lastFetched: Date.now(),
        });
      } else {
        set({
          session: null,
          isAuth: false,
          loading: false,
          lastFetched: Date.now(),
        });
      }
    } catch (error) {
      set({ error: "Error al comprobar autenticación", loading: false });
    }
  },

  login: async (userData) => {
    set({ loading: true, error: null });
    try {
      const response = await userLogin(userData);
      if (response) {
        set({
          session: response,
          isAuth: true,
          loading: false,
          lastFetched: Date.now(),
        });
        return true;
      } else {
        set({ loading: false });
        return false;
      }
    } catch (error) {
      set({ error: "Error al iniciar sesión", loading: false });
      return false;
    }
  },

  signup: async (formData) => {
    set({ loading: true, error: null });
    try {
      const response = await userSignup(formData);
      if (response) {
        set({
          session: response,
          isAuth: true,
          loading: false,
          lastFetched: Date.now(),
        });
        return true;
      } else {
        set({ loading: false });
        return false;
      }
    } catch (error) {
      set({ error: "Error al registrar usuario", loading: false });
      return false;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await userLogout();
      set({ session: null, isAuth: false, user: null, loading: false });
    } catch (error) {
      set({ error: "Error al cerrar sesión", loading: false });
    }
  },
}));
