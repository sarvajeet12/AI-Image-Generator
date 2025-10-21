import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext.jsx";
import { toast } from "sonner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!user) {
    toast.info("Please login first to access admin pages");
    return <Navigate to="/" replace />;
  }
  if (user.role !== "admin") {
    toast.error("You need admin access to open this page");
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export default AdminRoute;
