import React,{useState,useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import quitQuitLogo from '../assets/quitQuitLogo.png'
import { useUserStore } from '../store/user.js'

import SunIcon from '../assets/svg/SunIcon.jsx'
import MoonIcon from '../assets/svg/MoonIcon.jsx'
import BurgerIcon from '../assets/svg/BurgerIcon.jsx'
import ProfileIcon  from '../assets/svg/ProfileIcon.jsx'

import Menu from './Menu.jsx'
import MenuUser from './menuUser.jsx'

const Header = ({currentQuit, setSelectedQuit, darkMode,setDarkMode}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isLogoutClicked, setIsLogoutClicked] = useState(false)
    const {user} = useUserStore()

    const location = useLocation()
    const navigate = useNavigate()

    const handleMenuButtonClick = () => {
        if (!isMenuOpen) {
            document.body.classList.add("overflow-hidden");
          } else {
            document.body.classList.remove("overflow-hidden");
          }
        setIsMenuOpen(!isMenuOpen)
        setIsLogoutClicked(false)

    }
    const handleUserMenuButtonClick = () => {
        setIsUserMenuOpen(!isUserMenuOpen)
        setIsLogoutClicked(false)
    }
    return (
        <>
            <header
                className='w-full h-16  pl-2 pr-2 sticky top-0 z-50 flex justify-center items-center bg-slate-400  dark:bg-slate-700 dark:text-slate-100 '
            >   
                <div 
                    className='w-full flex justify-between items-center  '
                >
                    <div
                        className='flex jus items-center '
                    >
                        <button
                            className='p-2 rounded-3xl hover:bg-slate-500 dark:hover:bg-slate-800' 
                            onClick={handleMenuButtonClick}
                            data-tooltip-id="menuButton-tooltip"
                            data-tooltip-content="Menu"
                            data-tooltip-place="bottom-end"
                            data-tooltip-delay-show={500}
                        >
                            <BurgerIcon />
                            <Tooltip id="menuButton-tooltip" />
                        </button>
                        <img src={quitQuitLogo} alt="logo"  width="200"/>
                    </div>
                    <div>
                        {
                            location.pathname !== '/'
                            ?
                            (
                                <button
                                    className=' p-2 rounded-3xl hover:bg-slate-500 dark:hover:bg-slate-800' 
                                    onClick={handleUserMenuButtonClick}
                                >
                                    <ProfileIcon />
                                </button>
                            )
                            :
                            (
                                <button
                                    className=' p-2 rounded-3xl text-center aspect-square hover:bg-slate-500 dark:hover:bg-slate-800'
                                    onClick={() => setDarkMode(!darkMode)}
                                    data-tooltip-id='toggle-darkmode-tooltip'
                                    data-tooltip-content="Toggle Darkmode"
                                    data-tooltip-place='bottom-start'
                                >
                                    {darkMode ? <MoonIcon sw={2} s="size-10" /> : <SunIcon sw={2} s="size-10"/> }
                                    <Tooltip id="toggle-darkmode-tooltip"/>
                                </button>
                            )
                        }
                    </div>
                </div>
                <Menu 
                    isMenuOpen={isMenuOpen} 
                />
                <MenuUser 
                    user={user}
                    isUserMenuOpen={isUserMenuOpen}
                    isLogoutClicked={isLogoutClicked}
                    setIsLogoutClicked={setIsLogoutClicked}
                    setDarkMode={setDarkMode} 
                    darkMode={darkMode}
                />
            </header>
            {
                isMenuOpen
                &&
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-30"
                    onClick={() => setIsMenuOpen(false)} // Close menu when clicking on the overlay
                >
                </div>
            }
        </>
    )
}

export default Header