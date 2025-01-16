import React, { useState } from 'react'
import {useNavigate, useLocation} from 'react-router-dom'

const Footer = () => {

  const navigate = useNavigate()
  const location = useLocation()

  return (
    <footer
    className="h-1/6 flex"
> 
    <div
      className={`w-1/3 h-full flex justify-center items-center border rounded  ${location.pathname === '/quitStats' && 'bg-slate-200'} border-r-slate-500 hover:cursor-pointer`}

      onClick={() => navigate('/quitStats')}
    >
      Stats
    </div>
    <div
      className={`w-1/3 h-full rounded flex justify-center items-center border
         border-r-slate-500 ${location.pathname === '/quitMilestones' && 'bg-slate-200'}
         hover:cursor-pointer
         `}

      onClick={() => navigate('/quitMilestones')}

    >
      Milestones
    </div>
    <div
      className={`w-1/3 h-full rounded flex justify-center items-center ${location.pathname === '/quitAdvice' && 'bg-slate-200'}
      hover:cursor-pointer
      `}

      onClick={() => navigate('/quitAdvice')}

    >
      Expert Advice
    </div> 
  </footer>

  )
}

export default Footer