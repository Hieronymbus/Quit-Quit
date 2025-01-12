import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const navigate = useNavigate()

  const handleClickLogin = () => {
      navigate("/login")
  }

  const handleClickRegister = () => {
      navigate("/register")
  }

  const handleClickAbout = () => {
      navigate("/about")
  }


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
        className='w-1/3 aspect-square rounded-xl bg-purple-700 grid grid-cols-3'
      >
        <div 
          className=" bg-purple-700 rounded-xl flex justify-center items-center hover:cursor-pointer hover:bg-purple-500"
          onClick={handleClickLogin}
        >
          LOGIN
        </div>
        <div className=" bg-purple-700"></div>
        <div
          className=" bg-purple-700 rounded-xl flex justify-center items-center hover:cursor-pointer hover:bg-purple-500"
          onClick={handleClickRegister}
        >
          Register
        </div>
        <div className=" bg-purple-700 "></div>
        <div className=" bg-purple-700 flex justify-center items-center">
          <img 
            src='./assets/rb_35535.png'
            className='w-full h-full object-contain'
            alt='Breakingchainsimageshouldbehere'
          />
          
        </div>
        <div className=" bg-purple-700"></div>
        <div className=" bg-purple-700 rounded-xl"></div>
        <div 
          className=" bg-purple-700 flex justify-center items-center hover:cursor-pointer hover:bg-purple-500"
          onClick={handleClickAbout}
        >
          ABOUT
        </div>
        <div className=" bg-purple-700 rounded-xl"></div>
      </div>

      
    </div>
  )
}

export default Home