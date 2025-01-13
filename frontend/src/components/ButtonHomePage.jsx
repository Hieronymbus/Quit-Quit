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
        className="text-xl text-gray-100 bg-slate-700  border-4  border-gray-400 rounded-xl flex justify-center items-center hover:cursor-pointer hover:bg-slate-500"
        onClick={handleClick}
    >
        {text}
    </button> 
          
      
  )
}

export default ButtonHomePage