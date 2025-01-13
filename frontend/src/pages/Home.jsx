import React from 'react'
import { useNavigate } from 'react-router-dom'
import breakingChainsImage from '../assets/rb_35535.png';
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
          Bad Habbit Breaker, Quit Tracker, Addiction Defeater
        </h2>
      </div>
      <div
        className='w-1/3 p-3 aspect-square rounded-xl bg-slate-700 grid grid-cols-3 border-2 shadow-lg shadow-gray-50'
      >
        <div 
          className="text-xl bg-slate-700  border-4  border-gray-400 rounded-xl flex justify-center items-center hover:cursor-pointer hover:bg-slate-500"
          onClick={handleClickLogin}
        >
          Login
        </div>
        <div className=" bg-slate-700 flex justify-center items-center"></div>
        <div
          className=" text-xl bg-slate-700 border-4 border-gray-400 rounded-xl flex justify-center items-center hover:cursor-pointer hover:bg-slate-500"
          onClick={handleClickRegister}
        >
          Register
        </div>
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
        <div 
          className=" text-xl bg-slate-700  border-4 border-gray-400 flex rounded-xl justify-center items-center hover:cursor-pointer hover:bg-slate-500"
          onClick={handleClickAbout}
        >
          About
        </div>
        <div className=" bg-slate-700 rounded-xl"></div>
      </div>

      
    </div>
  )
}

export default Home