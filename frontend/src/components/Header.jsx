import React,{useState,useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DailyQuote from './DailyQuote.jsx'
import Menu from './Menu.jsx'
import AbandonQuitButton from './ButtonAbandonQuit.jsx'
import { DeleteQuitButton } from './ButtonDeleteQuit.jsx'

const Header = ({currentQuit, setSelectedQuit, darkMode,setDarkMode}) => {

    const location = useLocation()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleReturn = () => {
        setSelectedQuit("")
        navigate('/personalDashboard')
    }

    

    return (
        <header
            className='p-4 bg-slate-200'
        >
            {
                location.pathname === "/personalDashboard" 
                ?
                (
                    <div 
                        className=' flex justify-between items-center  '
                    >

                    <button
                        className=' p-2' 
                        onClick={() => setIsMenuOpen(true)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-9">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                    <Menu setDarkMode={setDarkMode} darkMode={darkMode} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}/>
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
                            className=' p-2 '
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-9">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>    
                        </button>
                    </Link>
                    </div>
                )
                :
                (
                    
                    <div
                          className='h-full flex justify-between items-center  '
                    >   
                        <button
                            className=' p-2 ' 
                            onClick={handleReturn}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-9">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                        </button>
                        <h1>
                             {currentQuit?.addictionTypeID.name} Quit Info
                        </h1>

                       {currentQuit?.status === "active" && <AbandonQuitButton currentQuit={currentQuit} />}
                       {currentQuit?.status === "abandoned" && <DeleteQuitButton currentQuit={currentQuit} />}
                    </div>
                )
            }
            
           
        </header>
    )
}

export default Header