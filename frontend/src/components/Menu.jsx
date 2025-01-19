import React,{useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Button4Menu from './Button4Menu.jsx'

const Menu = ({ isMenuOpen, handleNavigatetoHome}) => {

    const navigate = useNavigate()
    const location = useLocation()
    function handleNavigateToAbout() {
        if(location.pathname === '/about'){
          window.location.reload()
          
        } else {

          navigate("/about")
        }
    }
    
    

  return (
    <div
        className={`${isMenuOpen === false ? "hidden" : "" } 
        w-2/12 z-40 h-screen bg-slate-100 dark:bg-slate-900 dark:text-gray-100 absolute top-16 left-0`}  
    >   
        
        <Button4Menu text="Home" onClick={handleNavigatetoHome} />
        <Button4Menu text="Site Info" onClick={handleNavigateToAbout}/>
        <Button4Menu text="Developer Info"  />
        <Button4Menu text="Emergency Info" />
        <Button4Menu text="Privacy Policy" />
    </div>
  )
}

export default Menu
