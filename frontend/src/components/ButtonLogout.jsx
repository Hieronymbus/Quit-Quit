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
                        className='flex flex-col p-5 border-b-2 border-slate-800 bg-slate-200 dark:bg-slate-800 dark:border-slate-100'
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
                      className="h-1/6 p-5 border-b-2 border-slate-700 bg-slate-100 hover:cursor-pointer hover:bg-slate-300  dark:hover:bg-slate-700 dark:bg-slate-800 dark:border-slate-100"
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