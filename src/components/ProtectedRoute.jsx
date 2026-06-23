import { Navigate } from "react-router-dom";
import Loading from "./Loading";
import useAuth from "../hooks/useAuth";
import { isSupabaseConfigured } from "../lib/supabase";

export default function ProtectedRoute({ children, roles = [] }) {
  const { loading, user, profile } = useAuth();

  // Keeps the existing UI usable until the project owner supplies .env values.
  if (!isSupabaseConfigured) return children;
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;
  if (roles.length > 0 && !roles.includes(profile?.role)) {
    return <Navigate to="/error403" replace />;
  }

  return children;
}
