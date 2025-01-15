import React, {useState} from 'react'
import { useUserStore } from '../store/user'
import { useNavigate } from 'react-router-dom'

const LogoutButton = ({isLogoutClicked, setIsLogoutClicked}) => {
    
    const {logoutUser} = useUserStore()
    const navigate = useNavigate()
    function handleLogoutClick () {
        setIsLogoutClicked(true)
    }
    async function handleLogoutYes() {
        await logoutUser()
        navigate('/')

    }

    return (
        <div>
            {
                isLogoutClicked 
                ? (
                    <div
                        className='flex flex-col p-5 border-b-4 bg-slate-200 dark:bg-slate-800'
                    >
                      <h3>
                        are you sure you want to log out?
                      </h3>
                      <div>
                        <button
                            onClick={handleLogoutYes}
                        >
                            Yes
                        </button>
                        <button
                          onClick={()=>setIsLogoutClicked(false)}
                        >
                            No
                        </button>
                      </div>
                    </div>
                  )
                : (
                    <div
                      className="h-1/6 p-5 border-b-2 border-slate-700 bg-slate-200 hover:cursor-pointer hover:bg-slate-100  dark:hover:bg-slate-700 dark:bg-slate-800"
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