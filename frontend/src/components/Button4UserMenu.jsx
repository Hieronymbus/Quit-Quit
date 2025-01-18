import React from 'react'
import SunIcon from '../assets/svg/SunIcon'
import MoonIcon from '../assets/svg/MoonIcon'

const Button4UserMenu = ({darkMode, onClick, text}) => {



  return (
    <button
        className='w-full h-16 pr-4 text-lg flex justify-end items-center gap-3 bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-950'
        onClick={() => onClick(!darkMode)}
    >
       {text === "Toggle Theme" && (darkMode ? <SunIcon s="size-7" sw={1.4}/> : <MoonIcon s="size-7" sw={1.4}/>)} 
       {text}
    </button>
  )
}

export default Button4UserMenu