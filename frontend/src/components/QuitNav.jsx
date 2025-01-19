import React, { useState } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

const QuitNav = () => {

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav
      className="h-1/6 flex bg-slate-400 dark:bg-slate-700"
    > 
    <div
      className={`w-1/3 h-full text-2xl flex justify-center items-center border-r border-t-2 border-slate-600 
        ${location.pathname === '/quitStats' && 'bg-slate-200 dark:bg-slate-600'}  hover:cursor-pointer`}
      onClick={() => navigate('/quitStats')}
    >
      Details
    </div>
    <div
      className={`w-1/3 h-full  text-2xl  flex justify-center items-center border-r border-t-2 border-slate-600 
          ${location.pathname === '/quitMilestones' && 'bg-slate-200 dark:bg-slate-600'}
         hover:cursor-pointer
         `}
      onClick={() => navigate('/quitMilestones')}
    >
      Milestones
    </div>
    <div
      className={`w-1/3 h-full text-2xl flex justify-center items-center border-t-2 border-slate-600
        ${location.pathname === '/quitAdvice' && 'bg-slate-200 dark:bg-slate-600'}
      hover:cursor-pointer
      `}
      onClick={() => navigate('/quitAdvice')}
    >
      Expert Advice
    </div> 
  </nav>

  )
}

export default QuitNav