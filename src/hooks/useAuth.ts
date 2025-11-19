import { useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import type { LoginFormInputs } from "@/schemas/authSchema";
import type { UserRoleType } from "@/config/constants";

export function useAuth() {
  useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  //Buscar rol y nombre de usuario
  const fetchSetUser = useCallback(
    async (
      userId: string | undefined
    ): Promise<{ role: UserRoleType | null; fullName: string | null }> => {
      if (!userId) return { role: null, fullName: null };
      try {
        const { data: roleData, error: roleError } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", userId)
          .single();
        if (roleError || !roleData)
          throw new Error(roleError?.message || "Rol no encontrado.");
        const {
          data: { user },
          error: getUserError,
        } = await supabase.auth.getUser();
        if (getUserError) throw getUserError;
        const name = user?.user_metadata?.full_name ?? null;
        return { role: roleData.role as UserRoleType, fullName: name };
      } catch (err: any) {
        return { role: null, fullName: null };
      }
    },
    []
  );

  const login = async (credentials: LoginFormInputs) => {
    setError(null);
    setIsButtonLoading(true);
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword(
        credentials
      );
      if (signInError) {
        setError("Credenciales incorrectas.");
        setIsButtonLoading(false);
      }
    } catch (err: any) {
      setError(`Ocurrió un error inesperado.`);
      setIsButtonLoading(false);
    }
  };

  const logout = async () => {
    setError(null);
    setIsButtonLoading(true);
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) {
        setError("Error al cerrar sesión.");
      }
    } catch (err: any) {
      setError(`Ocurrió un error inesperado al cerrar sesión.`);
    } finally {
      setIsButtonLoading(false);
    }
  };
  return {
    login,
    logout,
    fetchSetUser,
    isButtonLoading,
    error,
  };
}
