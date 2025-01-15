import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import LogoutButton from './ButtonLogout.jsx'

const Menu = ({isMenuOpen, setIsMenuOpen, darkMode,setDarkMode, user}) => {

    const navigate = useNavigate()
    const [isLogoutClicked, setIsLogoutClicked] = useState(false)
    function handleNavigateToAbout() {
        navigate("/about")
    }
    

  return (
    <div
        className={`${isMenuOpen === false ? "hidden" : "" } z-50 h-screen bg-slate-400 dark:bg-slate-900 dark:text-gray-100 absolute left-0 top-0`}  
    >   
        <div
            className='h-1/6 border-b-2 border-slate-700'
        >
            <div
                className='p-2  bg-slate-400 dark:bg-slate-900 flex justify-between '
            >
                <h1
                    className=' text-xl'
                >
                    Menu
                </h1>
                <button
                    onClick={() => {
                        console.log("menuclose")
                        setIsLogoutClicked(false)
                        setIsMenuOpen(false)
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            <div
                className=' text-xl'
                >
                <div
                    className='flex'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    <h2>
                        Logged In as: 
                    </h2>   
                </div>
                <div
                    className='text-center'
                >

                {user.userDetails.userName}
                </div>
            </div>
        </div>
        <div
            className=' p-5 border-b-2 border-slate-700 bg-slate-200 hover:cursor-pointer hover:bg-slate-100  dark:hover:bg-slate-700 dark:bg-slate-800'
            onClick={handleNavigateToAbout}
        >
            About
        </div>
        <div
            className=' p-5 border-b-2 border-slate-700 bg-slate-200 hover:cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 dark:bg-slate-800'
            onClick={() => setDarkMode(!darkMode)}
        >
            ToggleDarkMode
            {
                darkMode
                ?
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="ml-2 inline size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="ml-2 inline size-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
            }

        </div>
        <LogoutButton isLogoutClicked={isLogoutClicked} setIsLogoutClicked={setIsLogoutClicked}/>

    </div>
  )
}

export default Menu
