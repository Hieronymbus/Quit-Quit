import React, { useEffect } from 'react'
import breakingChainsImage from '../assets/rb_35535.png';
import ButtonHomePage from '../components/ButtonLandingPage.jsx';
import Header from '../components/Header.jsx';

const Home = ({ darkMode, setDarkMode, setSelectedQuit}) => {

  useEffect(()=>{

    localStorage.removeItem('selectedQuit')
    setSelectedQuit("")
  })
  
  return (
    <div
      className='w-full h-screen flex flex-col bg-slate-300 dark:bg-slate-600 dark:text-slate-100 '
    > 
      <Header setDarkMode={setDarkMode} darkMode={darkMode}/>
        <div
          className=' w-full h-full-minus-16 md:grid grid-cols-2 grid-rows-1'
        >
          <div
            className='h-full flex flex-col justify-center items-center gap-10'
          >
            <div
              className='w-9/12 flex flex-col gap-2'
            > 
              <h1
                className='text-4xl'
              >
                Welcome to QuitQuit, the place Bad Habits come to Retire
              </h1>
              <h2
                className='text-xl'
              >
                From sneaky snacks to stubborn smokes, we offer tools so clever they might just trick you into success.
                No finger-wagging here, just a sprinkle of wisdom,
                a dollop of humor, and a gentle nudge to keep you moving forward (preferably away from Tyrone Biggums).
              </h2>
            </div>
            <div
              className='w-9/12 flex justify-start md:justify-end items-center gap-5 '
            >
              <ButtonHomePage text='Log In'/>
              <ButtonHomePage text='Register' />
            </div>
          </div>
          <div className="hidden h-full lg:flex justify-center items-center overflow-hidden ">
            <img 
              src={breakingChainsImage}
              className="h-full object-cover -rotate-45 transform transition-transform duration-500 hover:scale-110 hover:rotate-3"
              alt="picture of chains" 
            />
          </div>


        </div>

      
    </div>
  )
}

export default Home