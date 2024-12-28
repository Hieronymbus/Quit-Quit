import { Outlet, Navigate } from "react-router-dom";

import React from 'react'

const ProtectedRoutes = ({user}) => {
    const isLoggedIn = user.isLoggedIn
    
    return (
    isLoggedIn ? <Outlet /> : <Navigate to="/login" />
  )
}

export default ProtectedRoutes