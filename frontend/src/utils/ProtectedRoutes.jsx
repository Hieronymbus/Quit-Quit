import { Outlet, Navigate } from "react-router-dom";
import { useUserStore } from "../store/user.js";
import React , {useEffect,useState} from 'react'

const ProtectedRoutes = () => {
  
  const { fetchUser, user } = useUserStore();
  const [loading, setLoading] = useState(true);  // Local loading state

  useEffect(() => {
      fetchUser().then(() => setLoading(false)); // Ensure fetch completes before redirecting
  }, [fetchUser]);

  if (loading || user.isLoading) {
      return <div className="h-screen w-screen bg-slate-300 dark:bg-slate-600"></div>; // Prevent flickering
  }

    return (
      
      user.isLoggedIn ? <Outlet /> : <Navigate to="/" />
  );
}

export default ProtectedRoutes