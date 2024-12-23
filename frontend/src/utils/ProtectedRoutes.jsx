import { Outlet, Navigate } from "react-router-dom";

import React from 'react'

const ProtectedRoutes = () => {
    const user = null;
    
    return (
    user ? <Outlet /> : <Navigate to="/login" />
  )
}

export default ProtectedRoutes