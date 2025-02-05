import React, { useState } from 'react'
import Header from '../components/Header'
import { useUserStore } from '../store/user'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AccountSettings = ({darkMode, setDarkMode}) => {
    
    const { user, deleteUser } = useUserStore()
    const navigate = useNavigate()
    const [ isDeleteClicked, setIsDeleteClicked ] = useState(false)

    const handleDeleteUser = async () => {
       const {success, message} = await deleteUser(user.userDetails._id)

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
       
    };

    return (
        <div
            className='w-full h-screen flex flex-col '
        >
            <Header setDarkMode={setDarkMode} darkMode={darkMode}/>
            <div
                className='h-full-minus-16 p-5 text-xl  bg-slate-200 dark:bg-slate-600 dark:text-slate-200'
            >
                <h2>
                    Username
                </h2>
                <h3>
                    {user.userDetails.userName}
                </h3>
                <button>edit</button>
                <h2>
                    Email
                </h2>
                <h3>
                    {user.userDetails.email}
                </h3>
                <button>edit</button>
                <h2>
                    Change password
                </h2>
                <button>click</button>
                <h2>
                    Want to delete your account?  
                    <button
                        onClick={() => setIsDeleteClicked(true)}
                    >
                        click here
                    </button>
                </h2>
                {
                    isDeleteClicked
                    &&
                    (
                        <div
                            className='flex flex-col pt-2 pb-4 rounded-b-2xl bg-slate-5000 dark:bg-slate-900 border-t-slate-500 border-t '
                        >
                          <h3
                            className='text-xl text-center'
                          >
                            Are you sure you want to delete your account? This action is permanent and cannot be undone.
                          </h3>
                          <div
                            className='mt-2 flex justify-center gap-2'
                          >
                            <button
                              className="w-1/3 text-lg p-2 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2" 
                              onClick={handleDeleteUser}
                            >
                                Yes
                            </button>
                            <button
                              className="w-1/3 text-lg p-2 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2" 
                              onClick={()=>setIsDeleteClicked(false)}
                            >
                                No
                            </button>
                          </div>
                        </div>
                      )
                }
            </div>
        </div>
  )
}

export default AccountSettings