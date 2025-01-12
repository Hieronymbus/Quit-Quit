import React from 'react'

const Home = () => {


  return (
    <div
      className='w-screen h-screen flex flex-col justify-center items-center gap-3 bg-blue-500'
    > 
      <div>
        <h1 
          className='text-center text-3xl'
        >
          QuitQuit
        </h1>
        <h2
          className='text-center'
        >
          Addiction Quiting assistance app n stuff
        </h2>
      </div>
      <div
        className='w-1/4 aspect-square rounded-xl bg-purple-700 grid grid-cols-3'
      >
        <div class=" bg-purple-700 rounded-xl"></div>
        <div class=" bg-purple-700 flex justify-center items-center hover:cursor-pointer hover:bg-purple-500">
          ABOUT
        </div>
        <div class=" bg-purple-700 rounded-xl"></div>
        <div class=" bg-purple-700 "></div>
        <div class=" bg-purple-700 flex justify-center items-center">
          <img 
            src='./assets/rb_35535.png'
            className='w-full h-full object-contain'
            alt='Breakingchainsimageshouldbehere'
          />
          
        </div>
        <div class=" bg-purple-700"></div>
        <div class=" bg-purple-700 rounded-xl flex justify-center items-center hover:cursor-pointer hover:bg-purple-500">
          LOGIN
        </div>
        <div class=" bg-purple-700"></div>
        <div class=" bg-purple-700 rounded-xl flex justify-center items-center hover:cursor-pointer hover:bg-purple-500">
          Register
        </div>
      </div>

      
    </div>
  )
}

export default Home