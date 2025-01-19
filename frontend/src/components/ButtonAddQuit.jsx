import React from 'react'
import { Link } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
import PlusIcon from '../assets/svg/PlusIcon'

const ButtonAddQuit = () => {
  return (
    
        <Link to={"/addQuit"}>
            <button
                className=' p-2 rounded-3xl hover:bg-slate-500 dark:hover:bg-slate-800 '
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Create new quit"
                data-tooltip-place="bottom"
                data-tooltip-variant='dark'
                data-tooltip-delay-show={500}
            >
                <PlusIcon />  
                <Tooltip id="my-tooltip" />
            </button>
        </Link> 
    
  )
}

export default ButtonAddQuit