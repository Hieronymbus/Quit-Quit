import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

import LogoutButton from './LogoutButton.jsx'

const Menu = ({isMenuOpen, setIsMenuOpen, darkMode,setDarkMode}) => {

    const navigate = useNavigate()
    const [isLogoutClicked, setIsLogoutClicked] = useState(false)
    function handleNavigateToAbout() {
        navigate("/about")
    }
    

  return (
    <div
        className={`${isMenuOpen === false ? "hidden" : "w-1/6" } z-50 h-screen bg-purple-700 dark:bg-slate-900 absolute left-0 top-0`}
        onMouseLeave={() => {
            console.log("menuclose")
            setIsLogoutClicked(false)
            setIsMenuOpen(false)
        }}
    >
        <div
            className='h-1/6 p-5 border-b-4 text-center hover:cursor-pointer'
            onClick={handleNavigateToAbout}
        >
            About
        </div>
        <div
            className='h-1/6 p-5 border-b-4 hover:cursor-pointer hover:bg-purple-950 hover:text-gray-300'
            onClick={() => setDarkMode(!darkMode)}
        >
            ToggleDarkMode
        </div>
        <LogoutButton isLogoutClicked={isLogoutClicked} setIsLogoutClicked={setIsLogoutClicked}/>

    </div>
  )
}

export default Menu
