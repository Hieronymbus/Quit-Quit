import React from 'react'
import Header from '../components/Header'
import { useUserStore } from '../store/user'

const AccountSettings = ({darkMode, setDarkMode}) => {
    
    const { user, deleteUser } = useUserStore()

    const handleDeleteUser = async () => {

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
                Want to delete your account?  <button>click here. </button>
               </h2>
            </div>
        </div>
  )
}

export default AccountSettings