import React,{useState,useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DailyQuote from './DailyQuote.jsx'
import Menu from './Menu.jsx'

const Header = ({currentQuit, setSelectedQuit}) => {

    const location = useLocation()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

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
                        onClick={() => setIsMenuOpen(true)}
                    >
                        Menu
                    </button>
                    <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
                    {
                        isMenuOpen
                        &&
                        <div
                            className="fixed inset-0 bg-black bg-opacity-70 z-40"
                            onClick={() => setIsMenuOpen(false)} // Close menu when clicking on the overlay
                        >
                        </div>
                    }
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