import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import LogoutButton from './ButtonLogout.jsx'

const Menu = ({ isMenuOpen, isLogoutClicked, setIsLogoutClicked, darkMode,setDarkMode }) => {

    const navigate = useNavigate()
    
    function handleNavigateToAbout() {
        navigate("/about")
    }
    

  return (
    <div
        className={`${isMenuOpen === false ? "hidden" : "" } 
        w-2/12 z-40 h-screen bg-slate-400 dark:bg-slate-700 dark:text-gray-100 absolute top-16 left-0`}  
    >   
        
        <div
            className=' p-5  bg-slate-100 hover:cursor-pointer hover:bg-slate-300  dark:hover:bg-slate-700 dark:bg-slate-800 '
            onClick={handleNavigateToAbout}
        >
            About
        </div>
        
        

    </div>
  )
}

export default Menu
