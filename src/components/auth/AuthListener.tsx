import { useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/useAuthStore";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export function AuthListener() {
  const { setUserSessionRoleAndName, setLoading, clearAuth } = useAuthStore();
  const { fetchSetUser } = useAuth();
  const navigate = useNavigate();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    let localLoading = true;
    const checkInitialSession = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();
        if (error) throw error;
        const currentUser = session?.user ?? null;
        let role = null;
        let fullName = null;
        if (currentUser) {
          const userData = await fetchSetUser(currentUser.id);
          role = userData.role;
          fullName = userData.fullName;
        }
        setUserSessionRoleAndName(currentUser, session, role, fullName);
      } catch (error) {
        clearAuth();
      } finally {
        if (localLoading) {
          setLoading(false);
          localLoading = false;
          initialized.current = true;
        }
      }
    };
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!initialized.current) {
          await new Promise((resolve) => setTimeout(resolve, 50));
          if (!initialized.current) return;
        }
        const currentUser = session?.user ?? null;
        let role = null;
        let fullName = null;
        if (currentUser) {
          const userData = await fetchSetUser(currentUser.id);
          role = userData.role;
          fullName = userData.fullName;
        }
        setUserSessionRoleAndName(currentUser, session, role, fullName);
        if (
          event === "SIGNED_IN" &&
          currentUser &&
          window.location.pathname === "/login"
        ) {
          navigate("/");
        } else if (event === "SIGNED_OUT") {
          navigate("/login");
        }
      }
    );
    checkInitialSession();
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [
    setUserSessionRoleAndName,
    setLoading,
    clearAuth,
    fetchSetUser,
    navigate,
  ]);

  return null;
}
