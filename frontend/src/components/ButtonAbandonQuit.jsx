import React, { useEffect, useState } from 'react'
import { useQuitStore } from '../store/quit'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import toast from "react-hot-toast";
import Overlay from './Overlay'
const AbandonQuitButton = ({currentQuit}) => {

    const navigate = useNavigate()
    const {abandonQuit} = useQuitStore()
    const [isAbandonClicked, setIsAbandonedClicked] = useState(false)
    
    const handleAbandonQuit = async (quit) => {
        await abandonQuit(quit)
        toast("Quit abandoned", {
            icon: "👀", 
            duration: 3000,
            position: "bottom-center", 
            style: {
              borderRadius: "8px",
              background: "#333",
              color: "#fff",
            },
          });
        navigate("/home")
    };
    
  return (
    <div>
        {
            isAbandonClicked
            &&
            (
                <div>
                    <Overlay />
                    <div
                        className='p-3 w-11/12 rounded-xl fixed top-28 m-auto inset-x-0 flex flex-col bg-slate-400 dark:bg-slate-600  shadow-lg shadow-black'
                    >   
                        <h2
                            className='text-center text-lg'
                        >
                            Are you sure you want to abandon this Quit?
                        </h2>
                        <div
                            className='w-full flex gap-3 justify-center'
                        >
                            <button
                                className="w-1/2 text-lg p-2 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2" 
                                onClick={() => handleAbandonQuit(currentQuit)}
                            >
                                Yes
                            </button>
                            <button
                                className="w-1/2 text-lg p-2 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2"
                                onClick={()=> setIsAbandonedClicked(false)}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )
            
        }
            

            <button
                className=' p-2 rounded-3xl hover:bg-slate-500 dark:hover:bg-slate-800' 
                onClick={() => setIsAbandonedClicked(true)}
                data-tooltip-id='abandonquit-button-tooltip'
                data-tooltip-content='Abandon this quit'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                </svg>
                <Tooltip  id='abandonquit-button-tooltip'/>
            </button>
        
    </div>
  )
}

export default AbandonQuitButton