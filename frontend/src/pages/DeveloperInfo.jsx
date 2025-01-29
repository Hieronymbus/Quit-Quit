import React from 'react'
import Header from '../components/Header'

const DeveloperInfo = ({darkMode, setDarkMode}) => {

  return (
    <div
      className='w-full h-screen flex flex-col '
    >
        <Header setDarkMode={setDarkMode} darkMode={darkMode}/>
        <div
          className='h-full-minus-16 p-5 text-xl  bg-slate-200 dark:bg-slate-600 dark:text-slate-200'
        >
            sup yall its me its your boy asmongold
        </div>
    </div>
  )
}

export default DeveloperInfo