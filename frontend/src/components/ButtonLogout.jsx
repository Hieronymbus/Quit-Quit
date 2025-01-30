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
          duration: 2000,
          position: "bottom-center", 
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        });
        navigate('/')
       }

    }

    return (
        <div>
            {
                isLogoutClicked 
                ? (
                    <div
                        className='flex flex-col pt-2 pb-4 rounded-b-2xl bg-slate-5000 dark:bg-slate-900 border-t-slate-500 border-t '
                    >
                      <h3
                        className='text-xl text-center'
                      >
                        Confirm Logout 
                      </h3>
                      <div
                        className='mt-2 flex justify-center gap-2'
                      >
                        <button
                          className="w-1/3 text-lg p-2 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2" 
                          onClick={handleLogoutYes}
                        >
                            Yes
                        </button>
                        <button
                          className="w-1/3 text-lg p-2 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2" 
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