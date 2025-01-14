import { Outlet, Navigate } from "react-router-dom";
import { useUserStore } from "../store/user.js";
import React , {useEffect} from 'react'

const ProtectedRoutes = () => {
  
    const {fetchUser, user} = useUserStore()
    useEffect(() => {
      fetchUser() 
       
    }, [fetchUser])
    if(user.isLoading) {
      return <div></div>
    }
    return (
    user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />
  )
}

export default ProtectedRoutes