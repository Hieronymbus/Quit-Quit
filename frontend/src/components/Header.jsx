import React,{useState,useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import DailyQuote from './DailyQuote.jsx'
import Menu from './Menu.jsx'
import AbandonQuitButton from './AbandonQuitButton.jsx'
import { DeleteQuitButton } from './DeleteQuitButton.jsx'

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