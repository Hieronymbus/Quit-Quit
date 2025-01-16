import React from 'react'
import { useNavigate } from 'react-router-dom'
const ButtonHomePage = ({text}) => {

    const navigate = useNavigate()

    const handleClick = () => {
        if(text === 'Login'){

            navigate("/login")
        } else if (text === 'Register'){
            navigate("/register")
        } else {
            navigate('/about')
        }
    }

  return (
    <button
        className="h-1/2 text-xl text-gray-100  "
        onClick={handleClick}
    >
        {text}
    </button> 
          
      
  )
}

export default ButtonHomePage