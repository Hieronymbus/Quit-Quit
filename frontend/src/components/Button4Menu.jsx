import React from 'react'

const Button4Menu = ({text, onClick}) => {


  return (
      <button
        className='w-full h-16 pl-4 text-lg flex items-center hover:bg-slate-200 dark:hover:bg-slate-950 '
        onClick={onClick}
      >
        {text}
      </button>    
  )
}

export default Button4Menu