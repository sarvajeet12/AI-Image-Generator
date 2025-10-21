import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";
import { toast } from "sonner";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!user) {
    toast.info("Please login first to generate images");
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
