import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TickUserIcon from '../assets/svg/TickUserIcon.jsx'
import Button4UserMenu from './Button4UserMenu.jsx'
import LogoutButton from './ButtonLogout.jsx'

const MenuUser = ({ user, isUserMenuOpen, setDarkMode, darkMode, setIsLogoutClicked, isLogoutClicked }) => {

    const navigate = useNavigate()
    const location = useLocation()
    function handleNavigateToAccountSettings () {
        if(location === '/account-settings') {
            window.location.reload()
        } else {
            navigate('/account-settings')
        }
    }
    return (
        <div
            className={`${isUserMenuOpen === false ? 'hidden' : ""} 
            w-8/12 sm:w-3/12 z-40 rounded-2xl bg-slate-50 dark:bg-slate-900 dark:text-gray-100 absolute top-16 right-2`}
        >   
            <h2
                className='h-20 pl-4 text-3xl flex justify-center items-center'
            >
                {user?.userDetails.userName}
                <TickUserIcon />
            </h2>
            
            <Button4UserMenu text="Account settings" onClick={handleNavigateToAccountSettings}/>
            <Button4UserMenu darkMode={darkMode} onClick={setDarkMode} text="Toggle Theme" />
            
            <LogoutButton setIsLogoutClicked={setIsLogoutClicked} isLogoutClicked={isLogoutClicked} />
            
        </div>
    )
}

export default MenuUser