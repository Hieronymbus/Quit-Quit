import React from 'react'
import breakingChainsImage from '../assets/rb_35535.png';
import ButtonHomePage from '../components/ButtonHomePage.jsx';

const Home = () => {


  return (
    <div
      className='w-screen h-screen  flex flex-col justify-center items-center gap-3 bg-slate-800 '
    > 
      <div
        className='text-gray-200'
      >
        <h1 
          className='text-center text-5xl '
        >
          QuitQuit
        </h1>
        <h2
          className='text-center text-l'
        >
          Bad Habbit Breaker, Quit Tracker, Addiction Battler
        </h2>
      </div>
      <div
        className='w-1/3 p-3 aspect-square rounded-xl bg-slate-700 grid grid-cols-3 border-2 shadow-lg shadow-gray-50'
      >
        <ButtonHomePage text='Login'/>
        <div className=" bg-slate-700 flex justify-center items-center"></div>
        <ButtonHomePage text='Register' />
        <div className=" bg-slate-700 "></div>
        <div className="  bg-slate-700  flex justify-center items-center">
          <img 
            src={breakingChainsImage}
            className='w-full h-full object-cover '
            alt='Breakingchainsimageshouldbehere'
          /> 
        </div>
        <div className=" bg-slate-700"></div>
        <div className=" bg-slate-700 rounded-xl"></div>
        <ButtonHomePage text='About' />
        <div className=" bg-slate-700 rounded-xl"></div>
      </div>

      
    </div>
  )
}

export default Home