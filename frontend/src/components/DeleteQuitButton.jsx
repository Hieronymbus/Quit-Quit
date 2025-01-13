import React, { useState } from 'react'
import { useQuitStore } from '../store/quit'
import { useNavigate } from 'react-router-dom'

export const DeleteQuitButton = ({currentQuit}) => {
  
    const [isDeleteClicked, setIsDeleteClicked] = useState(false)
    const {deleteSingleQuit} = useQuitStore()
    const navigate = useNavigate()

    const handleDeleteQuit = async () => {
        await deleteSingleQuit(currentQuit._id)
        navigate("/personalDashboard")
    }
  
    return (
    <div>
        {
            isDeleteClicked
            ?
            <div>
                are you sure?
                <button
                    className='p-2 border-red-600 border-4'
                    onClick={handleDeleteQuit}
                >
                    YES
                </button>
                <button
                    className='p-2 border-red-600 border-4'
                    onClick={() => setIsDeleteClicked(false)}
                >
                    NO
                </button>
            </div>
            :
            <button
                className='p-2 border-red-600 border-4'
                onClick={() => setIsDeleteClicked(true)}
            >
                DELETE
            </button>
        }
    </div>
  )
}
 