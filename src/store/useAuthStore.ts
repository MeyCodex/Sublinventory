import { create } from "zustand";
import type { User, Session } from "@supabase/supabase-js";
import type { UserRoleType } from "@/config/constants";

type AuthState = {
  user: User | null;
  session: Session | null;
  role: UserRoleType | null;
  fullName: string | null;
  isLoading: boolean;
  setUserSessionRoleAndName: (
    user: User | null,
    session: Session | null,
    role: UserRoleType | null,
    fullName: string | null
  ) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  role: null,
  fullName: null,
  isLoading: true,
  setUserSessionRoleAndName: (user, session, role, fullName) =>
    set({ user, session, role, fullName }),

  setLoading: (loading) => set({ isLoading: loading }),
  clearAuth: () =>
    set({ user: null, session: null, role: null, fullName: null }),
}));

export const useIsAuthenticated = () => useAuthStore((state) => !!state.user);
export const useUserRole = () => useAuthStore((state) => state.role);
export const useUserFullName = () => useAuthStore((state) => state.fullName);
