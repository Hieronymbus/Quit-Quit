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
    function handleNavigateToDevInfo() {
      if(location.pathname === "/developer-info") {
        window.location.reload()
      } else {
        navigate("/developer-info")
      }
    }
    

  return (
    <div
        className={`${isMenuOpen === false ? "hidden" : "" } 
        w-8/12 md:w-3/12 z-40 h-screen bg-slate-100 dark:bg-slate-900 dark:text-gray-100 absolute top-16 left-0`}  
    >   
        
        <Button4Menu text="Home" onClick={handleNavigatetoHome} />
        <Button4Menu text="Site Info" onClick={handleNavigateToAbout}/>
        <Button4Menu text="Developer Info" onClick={handleNavigateToDevInfo} />
        <Button4Menu text="Emergency Info(inDev)" />
        <Button4Menu text="Privacy Policy(inDev)" />
    </div>
  )
}

export default Menu
