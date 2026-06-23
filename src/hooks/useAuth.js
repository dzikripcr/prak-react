import { useEffect, useState } from "react";
import { authAPI } from "../services/authAPI";
import { isSupabaseConfigured, supabase } from "../lib/supabase";

export default function useAuth() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return undefined;
    }

    const loadUser = async () => {
      try {
        const current = await authAPI.getCurrentUser();
        setUser(current.user);
        setProfile(current.profile);
      } catch {
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
    const { data: listener } = supabase.auth.onAuthStateChange(() => loadUser());
    return () => listener.subscription.unsubscribe();
  }, []);

  return { loading, user, profile };
}
