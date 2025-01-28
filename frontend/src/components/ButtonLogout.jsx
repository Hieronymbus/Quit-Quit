import React, {useState} from 'react'
import { useUserStore } from '../store/user'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";

const LogoutButton = ({isLogoutClicked, setIsLogoutClicked}) => {
    
    const {logoutUser} = useUserStore()
    const navigate = useNavigate()
    function handleLogoutClick () {
        setIsLogoutClicked(true)
    }
    async function handleLogoutYes() {
       const {success, message} = await logoutUser()
       if(success) {
        toast(message, {
          icon: "👋", 
          duration: 3000,
          position: "bottom-center", 
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        });
       }
        navigate('/')

    }

    return (
        <div>
            {
                isLogoutClicked 
                ? (
                    <div
                        className='flex flex-col p-5 rounded-2xl bg-slate-200 dark:bg-slate-800 '
                    >
                      <h3>
                        Confirm Logout -
                      </h3>
                      <div
                        className='mt-1 flex '
                      >
                        <button
                            className='mr-5 p-1 border-2 border-slate-800 rounded-md dark:border-slate-100'
                            onClick={handleLogoutYes}
                        >
                            Yes
                        </button>
                        <button
                          className='mr-5 p-1 border-2 border-slate-800 rounded-md dark:border-slate-100'
                          onClick={()=>setIsLogoutClicked(false)}
                        >
                            No
                        </button>
                      </div>
                    </div>
                  )
                : (
                    <div
                      className="h-16 pr-4 text-lg flex justify-end items-center rounded-b-2xl bg-slate-50 hover:cursor-pointer hover:bg-slate-100  dark:hover:bg-slate-950 dark:bg-slate-900 "
                      onClick={handleLogoutClick}
                    >
                      Logout
                    </div>
                  )
              }
        </div>
          
  )
}

export default LogoutButton