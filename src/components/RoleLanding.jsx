import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import useAuth from "../hooks/useAuth";
import { isSupabaseConfigured } from "../lib/supabase";

export default function RoleLanding() {
  const { loading, user, profile } = useAuth();

  if (!isSupabaseConfigured) return <Navigate to="/products" replace />;
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;

  return <Navigate to={profile?.role === "admin" ? "/admin/dashboard" : "/orders"} replace />;
}
