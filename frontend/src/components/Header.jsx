import React,{ useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import quitQuitLogo from '../assets/quitQuitLogo.png'
import { useUserStore } from '../store/user.js'

import SunIcon from '../assets/svg/SunIcon.jsx'
import MoonIcon from '../assets/svg/MoonIcon.jsx'
import BurgerIcon from '../assets/svg/BurgerIcon.jsx'
import ProfileIcon  from '../assets/svg/ProfileIcon.jsx'
import PlusIcon from '../assets/svg/PlusIcon.jsx';

import Menu from './Menu.jsx'
import MenuUser from './menuUser.jsx'
import ButtonAddQuit from './ButtonAddQuit.jsx'
import ButtonNotification from './ButtonNotification.jsx'
import AbandonQuitButton from './ButtonAbandonQuit.jsx'
import { DeleteQuitButton } from './ButtonDeleteQuit.jsx'

const Header = ({currentQuit, setSelectedQuit, darkMode,setDarkMode}) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
    const [isLogoutClicked, setIsLogoutClicked] = useState(false)
    const {user} = useUserStore()
    const userMenuRef = useRef(null)
    const openUserMenuButtonRef = useRef(null)
    const location = useLocation()
    const navigate = useNavigate()

    //vmenu open close logic
    const handleMenuButtonClick = () => {
        if (!isMenuOpen) {
            document.body.classList.add("overflow-hidden");
          } else {
            document.body.classList.remove("overflow-hidden");
          }
        setIsMenuOpen(!isMenuOpen)
        setIsUserMenuOpen(false)
        setIsLogoutClicked(false)
    }
    useEffect(() => {
        document.body.classList.remove("overflow-hidden")
    },[])

    // userMenu open close logic
    const handleUserMenuButtonClick = () => {
        setIsUserMenuOpen(!isUserMenuOpen)
        setIsMenuOpen(false)
        setIsLogoutClicked(false)
        
          document.body.classList.remove("overflow-hidden");
          
    };
    const handleClickOutside = (e) => {
        // Check if the clicked element is outside the menu
        if (
                userMenuRef.current 
                && openUserMenuButtonRef.current 
                && !userMenuRef.current.contains(e.target) 
                && !openUserMenuButtonRef.current.contains(e.target)
            ) {
          setIsUserMenuOpen(false); // Close the menu
          console.log("umenyuayduyasud")
        }
    };
    useEffect(() => {
        if (isUserMenuOpen) {
          document.addEventListener('mousedown', handleClickOutside);
        } else {
          document.removeEventListener('mousedown', handleClickOutside);
        }
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [isUserMenuOpen]);

      function handleNavigatetoHome() {
        if(location.pathname === "/home" || location.pathname ==='/'){
          window.location.reload()
        } else {

          navigate("/home")
        }
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
                        {
                            location.pathname !== '/'
                            &&
                            <button
                                className='p-2 rounded-3xl hover:bg-slate-500 dark:hover:bg-slate-800' 
                                onClick={handleMenuButtonClick}
                                data-tooltip-id="menuButton-tooltip"
                                data-tooltip-content="Open navigation menu"
                                data-tooltip-place="bottom-end"
                                data-tooltip-delay-show={500}
                            >
                                <BurgerIcon />
                                <Tooltip id="menuButton-tooltip" />
                            </button>
                        }
                        <img
                            className='w-[140px] sm:w-[200px] hover:cursor-pointer'
                            onClick={handleNavigatetoHome}
                            src={quitQuitLogo} 
                            alt="logo"  
                            data-tooltip-id='logo-tooltip'
                            data-tooltip-content="Go to QuitQuit home"
                        />
                        <Tooltip id="logo-tooltip" />
                    </div>
                    <div>
                        {
                            location.pathname !== '/'
                            ?
                            (   
                                <div
                                    className='flex'
                                >
                                    {
                                        location.pathname === '/home'
                                        &&
                                        <ButtonAddQuit />
                                    }
                                        
                                    {   
                                        location.pathname == '/quitStats'
                                        &&
                                        <div>
                                            {
                                                currentQuit?.status === 'abandoned'
                                                ?
                                                <DeleteQuitButton currentQuit={currentQuit}/>
                                                :
                                                <AbandonQuitButton currentQuit={currentQuit}/>
                                            }
                                        </div>
                                    }
                                    {   
                                        location.pathname == '/quitMilestones'
                                        &&
                                        <div>
                                            {
                                                currentQuit?.status === 'abandoned'
                                                ?
                                                <DeleteQuitButton currentQuit={currentQuit}/>
                                                :
                                                <AbandonQuitButton currentQuit={currentQuit}/>
                                            }
                                        </div>
                                    } 
                                    {   
                                        location.pathname == '/quitAdvice'
                                        &&
                                        <div>
                                            {
                                                currentQuit?.status === 'abandoned'
                                                ?
                                                <DeleteQuitButton currentQuit={currentQuit}/>
                                                :
                                                <AbandonQuitButton currentQuit={currentQuit}/>
                                            }
                                        </div>
                                    }   
                                    
                                    <ButtonNotification />
                                    <button
                                        className=' p-2 rounded-3xl hover:bg-slate-500 dark:hover:bg-slate-800' 
                                        ref={(openUserMenuButtonRef)}
                                        onClick={handleUserMenuButtonClick}
                                        data-tooltip-id='user-menu-button'
                                        data-tooltip-content="Open user menu"
                                        data-tooltip-place='bottom-end'
                                        data-tooltip-delay-show={500}
                                    >
                                        <ProfileIcon />
                                        <Tooltip id='user-menu-button'/>
                                    </button>
                                </div>
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
                    handleNavigatetoHome={handleNavigatetoHome} 
                />
                <div
                    ref={userMenuRef}
                >
                    <MenuUser 
                        user={user}
                        isUserMenuOpen={isUserMenuOpen}
                        isLogoutClicked={isLogoutClicked}
                        setIsLogoutClicked={setIsLogoutClicked}
                        setDarkMode={setDarkMode} 
                        darkMode={darkMode}
                    />
                </div>
            </header>
            {
                isMenuOpen
                &&
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm z-30"
                    onClick={handleMenuButtonClick} // Close menu when clicking on the overlay
                >
                </div>
            }
        </>
    )
}

export default Header