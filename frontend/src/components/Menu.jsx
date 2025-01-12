import React from 'react'
import { useNavigate } from 'react-router-dom'
const Menu = ({isMenuOpen, setIsMenuOpen}) => {

    const navigate = useNavigate()
    function handleNavigateToAbout() {
        navigate("/about")
    }

  return (
    <div
        className={`${isMenuOpen === false ? "hidden" : "w-1/6" } z-50 h-screen bg-purple-700 absolute left-0 top-0`}
        onMouseLeave={() => {
            console.log("menuclose")
            setIsMenuOpen(false)
        }}
    >
        <div
            className='h-1/6 p-5 border-b-4 text-center'
            onClick={handleNavigateToAbout}
        >
            About
        </div>
        <div
            className='h-1/6 p-5 border-b-4'
        >
            ToggleDarkMode
        </div>
        <div
            className='h-10  p-5'
        >
            Logout
        </div>

    </div>
  )
}

export default Menu
