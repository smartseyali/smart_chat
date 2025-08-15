// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useSession from "../hooks/useSession";

export default function ProtectedRoute({ children }) {
  const { session, loading } = useSession();

  if (loading) return <p>Loading...</p>; // wait for Supabase to load
  if (!session) return <Navigate to="/login" />;
  return children;
}
