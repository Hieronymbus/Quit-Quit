import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/user'
const About = () => {
  
  const navigate = useNavigate()
  const {fetchUser, user} = useUserStore()
    useEffect(() => {
      fetchUser() 
       
    }, [fetchUser])

  const handleReturnclick = () => {
    if(user.isLoggedIn) {
      navigate("/personalDashboard")
    } else {
      navigate("/")
    }
  }

  return (
    <div
      className='h-screen w-screen flex flex-col'
    >
      <nav
        className='h-1/6 2-full flex justify-between items-center p-4 bg-slate-300'
      >
        <button
          className=' p-2 hover:bg-slate-300 '
          onClick={handleReturnclick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </button>
        <h1
          className='text-4xl'
        >
          About Page
        </h1>
        <button
          className=' p-4 text-slate-300'
          
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
        </button>
      </nav>  
    <div
      className='h-5/6'
    >

    </div>
    </div>
  )
}

export default About