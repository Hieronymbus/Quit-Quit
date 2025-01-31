import React, { useState } from 'react'
import { useQuitStore } from '../store/quit'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import toast from "react-hot-toast";
import Overlay from './Overlay'
export const DeleteQuitButton = ({currentQuit}) => {
  
    const [isDeleteClicked, setIsDeleteClicked] = useState(false)
    const {deleteSingleQuit} = useQuitStore()
    const navigate = useNavigate()

    const handleDeleteQuit = async () => {
        await deleteSingleQuit(currentQuit._id)
        toast("Quit Deleted", {
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
    }
  
    return (
    <div>
        {
            isDeleteClicked
            &&
            <div>
                <Overlay />
                <div
                    className='z-50 p-3 w-11/12 sm:w-1/4  rounded-xl fixed top-28 m-auto inset-x-0 flex flex-col bg-slate-400 dark:bg-slate-600  shadow-lg shadow-black'
                >   
                    <h2
                        className='text-center text-lg mb-2 '
                    >
                        Are you sure you want to permanently delete this quit?
                    </h2>
                    <div
                        className='w-full flex gap-3 justify-center'
                    >

                        <button
                            className="w-1/2 text-lg p-2 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2" 
                            onClick={handleDeleteQuit}
                        >
                            Yes
                        </button>
                        <button
                            className="w-1/2 text-lg p-2 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-md shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2" 
                            onClick={() => setIsDeleteClicked(false)}
                        >
                            No
                        </button>
                    </div>
                </div>
            </div>
}
            <button
                className=' p-2 rounded-3xl hover:bg-slate-500 dark:hover:bg-slate-800' 
                onClick={() => setIsDeleteClicked(true)}
                data-tooltip-id='deleteQuit-button-tooltip'
                data-tooltip-content='Delete this quit'
                data-tooltip-delay-hide={1000}
            >   

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                <Tooltip  id='deleteQuit-button-tooltip'/>
            </button>
        
    </div>
  )
}
 