import React, { useEffect, useState } from 'react'
import { useQuitStore } from '../store/quit'
import { useNavigate } from 'react-router-dom'

const AbandonQuitButton = ({currentQuit}) => {

    const navigate = useNavigate()
    const {abandonQuit} = useQuitStore()
    const [isAbandonClicked, setIsAbandonedClicked] = useState(false)
    
    const handleAbandonQuit = async (quit) => {
      
        await abandonQuit(quit)
        navigate("/personalDashboard")
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
                    className=' p-2 border border-slate-500' 
                    onClick={() => setIsAbandonedClicked(true)}
                >
                    Abandon quit
                </button>
            )
        }
    </div>
  )
}

export default AbandonQuitButton