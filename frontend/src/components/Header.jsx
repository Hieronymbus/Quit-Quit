import React,{useState,useEffect} from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import { DeleteQuitButton } from './ButtonDeleteQuit.jsx'
import { useUserStore } from '../store/user.js'
import DailyQuote from './DailyQuote.jsx'
import Menu from './Menu.jsx'
import AbandonQuitButton from './ButtonAbandonQuit.jsx'


const Header = ({currentQuit, setSelectedQuit, darkMode,setDarkMode}) => {

    const location = useLocation()
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {user} = useUserStore()
    const handleReturn = () => {
        if(setSelectedQuit){

            setSelectedQuit("")
        }
        navigate('/personalDashboard')
    }

    

    return (
        <header
            className='h-1/6 flex justify-center items-center p-4 bg-slate-300 border-b-2 border-slate-700 dark:border-slate-100 dark:bg-slate-700 dark:text-slate-100 '
        >
            {
                location.pathname === "/personalDashboard" 
                ?
                (
                    <div 
                        className='w-full flex justify-between items-center  '
                    >
                        <div
                            className='flex items-center '
                        >
                            <button
                                className=' p-2 rounded-lg hover:bg-slate-400 dark:hover:bg-slate-800' 
                                onClick={() => setIsMenuOpen(true)}
                                data-tooltip-id="menuButton-tooltip"
                                data-tooltip-content="Menu"
                                data-tooltip-place="bottom"
                                data-tooltip-delay-show={500}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                <Tooltip id="menuButton-tooltip" />
                            </button>
                           
                        </div>
                    <Menu setDarkMode={setDarkMode} darkMode={darkMode} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} user={user}/>
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
                        <div>
                            <button
                                className=' p-2 rounded-lg hover:bg-slate-400 dark:hover:bg-slate-800 '
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="Create Quit"
                                data-tooltip-place="bottom"
                                data-tooltip-variant='dark'
                                data-tooltip-delay-show={500}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-12">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>    
                            </button>
                            <Tooltip id="my-tooltip" />
                        </div>
                    </Link>
                    </div>
                )
                :
                (
                    
                    <div
                          className='h-full w-full flex justify-between items-center  '
                    >   
                        <button
                            className=' p-2 hover:bg-slate-300' 
                            onClick={handleReturn}
                            data-tooltip-id='returnTooltip'
                            data-tooltip-content="Return to dashboard"

                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                            </svg>
                            <Tooltip id="returnTooltip"/>
                        </button>
                        {
                            location.pathname != '/addQuit'
                            ?
                            <h1
                                className='text-4xl'
                            >
                                {currentQuit?.addictionTypeID.name} Quit Info
                            </h1>
                            :
                            (

                                <h1
                                    className='text-4xl'
                                >
                                    Create New Quit Below
                                </h1>
                            )
                            
                        }
                        {
                            location.pathname == '/addQuit' 
                            && 
                            <div
                                className=' p-2 text-slate-300 dark:text-slate-700' 
                                
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-10">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                                </svg>
                            </div>
                            }
                       {currentQuit?.status === "active" && <AbandonQuitButton currentQuit={currentQuit} />}
                       {currentQuit?.status === "completed" && <AbandonQuitButton currentQuit={currentQuit} />}
                       {currentQuit?.status === "abandoned" && <DeleteQuitButton currentQuit={currentQuit} />}
                    </div>
                )
            }
            
           
        </header>
    )
}

export default Header