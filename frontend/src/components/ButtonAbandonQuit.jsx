import React, { useEffect, useState } from 'react'
import { useQuitStore } from '../store/quit'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

const AbandonQuitButton = ({currentQuit}) => {

    const navigate = useNavigate()
    const {abandonQuit} = useQuitStore()
    const [isAbandonClicked, setIsAbandonedClicked] = useState(false)
    
    const handleAbandonQuit = async (quit) => {
        await abandonQuit(quit)
        navigate("/home")
    };
    
  return (
    <div>
        {
            isAbandonClicked
            ?
            (
            <div
                className='flex flex-col'
            >
                Foreal?
                <button
                    onClick={() => handleAbandonQuit(currentQuit)}
                >
                    yes
                </button>
                <button
                    onClick={()=> setIsAbandonedClicked(false)}
                >
                    no
                </button>
            </div>
            )
            :
            (

                <button
                    className=' p-2 rounded-3xl hover:bg-slate-500 dark:hover:bg-slate-800' 
                    onClick={() => setIsAbandonedClicked(true)}
                    data-tooltip-id='abandonquit-button-tooltip'
                    data-tooltip-content='Abandon this quit'
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-10">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                    </svg>
                    <Tooltip  id='abandonquit-button-tooltip'/>
                </button>
            )
        }
    </div>
  )
}

export default AbandonQuitButton