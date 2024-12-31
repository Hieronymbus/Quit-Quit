import { Outlet, Navigate } from "react-router-dom";
import { useUserStore } from "../store/user.js";
import React from 'react'

const ProtectedRoutes = ({}) => {
    const {user} = useUserStore()
    
    return (
    user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />
  )
}

export default ProtectedRoutes