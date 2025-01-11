import React,{useState,useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DailyQuote from './DailyQuote.jsx'

const Header = ({currentQuit, setSelectedQuit}) => {

    const location = useLocation()
    const navigate = useNavigate()
    const handleReturn = () => {
        setSelectedQuit("")
        navigate('/personalDashboard')
    }
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
                            onClick={handleReturn}
                        >
                            Return to dashboard
                        </button>
                        <h1>
                            You are quitting {currentQuit?.addictionTypeID.name}
                            {/* <div
                                className='h-6 w-6'
                                dangerouslySetInnerHTML={{ __html: currentQuit?.addictionTypeID.icon }} // Render the XML as raw HTML
                            /> */}
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