import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // Vérifie si un token JWT est présent et valide (ex: 3 parties séparées par des points)
  const isLoggedIn = token && token.split(".").length === 3;

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
}
