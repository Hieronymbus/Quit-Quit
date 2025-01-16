import React from 'react'
import breakingChainsImage from '../assets/rb_35535.png';
import ButtonHomePage from '../components/ButtonHomePage.jsx';

const Home = () => {


  return (
    <div
      className='w-screen h-screen  flex flex-col bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% "'
    > 
      <header
        className='h-1/6 w-full p-5 flex justify-between border-b-2'
      > 
        <div
          className='flex justify-center items-center'
        >
          <h2
            className='text-5xl text-slate-100'
          >

          QuitQuit  
          </h2>
        </div>
        <div
          className='w-1/4 flex justify-between items-center '
        >
          <ButtonHomePage text='About' />
          <ButtonHomePage text='Login'/>
          <ButtonHomePage text='Register' />
        </div>
        
      </header>
    
        <div
          className='h-5/6 w-full grid grid-cols-2 grid-rows-1'
        >

          <div>

          </div>
          <div
            className='flex justify-center items-center overflow-hidden'
          >
            <img 
              src={breakingChainsImage}
              width="700" 
              height="700"
              alt="picture of chains" 
            />
          </div>
        </div>

      
    </div>
  )
}

export default Home