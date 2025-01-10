import React,{useState,useEffect} from 'react'
import { Link, useLocation } from 'react-router-dom'
import DailyQuote from './DailyQuote.jsx'
const Header = () => {

    const location = useLocation()
    


    return (
        <header
            className='h-1/6'
        >
            {
                location.pathname === "/personalDashboard" 
                ?
                (
                    <div 
                        className='h-full flex justify-around items-center border-b-4 '
                    >

                    <button
                        className=' p-2 border border-slate-500' 
                    >
                        Menu
                    </button>
                    <DailyQuote />
                    <Link to={"/addQuit"}>
                        <button
                            className=' p-2 border border-slate-500'
                        >
                            Add Quit
                            
                        </button>
                    </Link>
                    </div>
                )
                :
                (
                    <div
                          className='h-full flex justify-around items-center border-b-4 '
                    >
                        <button
                             className=' p-2 border border-slate-500' 
                        >
                            Return to dashboard
                        </button>
                        <h1>
                            You are quitting Sugar
                        </h1>
                        <button
                             className=' p-2 border border-slate-500' 
                        >
                            Abandon quit
                        </button>
                    </div>
                )
            }
            
           
        </header>
    )
}

export default Header