import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'
const ButtonHomePage = ({text}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        if(text === 'Log In'){
            navigate("/login")
        } else if (text === 'Register'){
            navigate("/register")
        } else {
            navigate('/about')
        }
    }

  return (
    <button
        className="text-xl p-3 rounded-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2"
        onClick={handleClick}
        data-tooltip-id='landing-button-tooltip'
        data-tooltip-delay-show={400}
        data-tooltip-content={text === 'Log In' ? 'Log in to QuitQuit' : 'Register a  QuitQuit account'}
        data-tooltip-place='bottom'
        
    >
        {text}
        <Tooltip id="landing-button-tooltip" className='text-sm'/>
    </button>
  
 
  )
}

export default ButtonHomePage