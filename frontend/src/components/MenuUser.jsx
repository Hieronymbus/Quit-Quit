import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import TickUserIcon from '../assets/svg/TickUserIcon.jsx'
import Button4UserMenu from './Button4UserMenu.jsx'
import LogoutButton from './ButtonLogout.jsx'

const MenuUser = ({ user, isUserMenuOpen, setDarkMode, darkMode, setIsLogoutClicked, isLogoutClicked }) => {

    const navigate = useNavigate()

    return (
        <div
            className={`${isUserMenuOpen === false ? 'hidden' : ""} 
            w-2/12 z-40 rounded-2xl bg-slate-50 dark:bg-slate-900 dark:text-gray-100 absolute top-[4.5rem] right-2`}
        >   
            <h2
                className='h-20 pl-4 text-3xl flex justify-center items-center'
            >

                {user?.userDetails.userName}
                <TickUserIcon />

            </h2>
            
            <Button4UserMenu text="Account settings" />
            
            <Button4UserMenu darkMode={darkMode} onClick={setDarkMode} text="Toggle Theme" />
            
            <LogoutButton setIsLogoutClicked={setIsLogoutClicked} isLogoutClicked={isLogoutClicked} />
            
        </div>
    )
}

export default MenuUser