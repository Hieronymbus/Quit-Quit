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
          className=' w-full h-full-minus-16 lg:grid grid-cols-2 grid-rows-1'
        >
          <div
            className='h-full md:h-1/3 lg:h-full pt-6 flex flex-col lg:justify-center items-center gap-10 '
          > 
            <div
              className='w-9/12 flex flex-col gap-2'
            > 
              <h1
                className='text-4xl '
              >
                Welcome to QuitQuit, the place Bad Habits come to Retire
              </h1>
              
              <h2
                className='text-xl'
              >
                From sneaky snacks to stubborn smokes, we offer tools to help you succeed. 
                No judgment—just a mix of wisdom, practical solutions to support your goals, and a gentle nudge to keep you moving forward (preferably away from Tyrone Biggums).
              </h2>
            </div>
            <div
              className='w-9/12 flex justify-start md:justify-end  gap-5 '
            >
              <ButtonHomePage text='Log In'/>
              <ButtonHomePage text='Register' />
            </div>
          </div>
          <div className="hidden h-2/3 lg:h-full  md:flex lg:flex justify-center items-center overflow-hidden ">
            <img 
              src={breakingChainsImage}
              className=" h-full object-scale-down -rotate-45 transform transition-transform duration-500 hover:scale-110 hover:rotate-3"
              alt="picture of chains" 
            />
          </div>
        </div>  
    </div>
  )
}

export default Home