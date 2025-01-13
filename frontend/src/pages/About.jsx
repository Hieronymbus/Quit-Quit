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
      className='p-2 bg-slate-700'
    >
      <button
        className='text-gray-300 hover:text-gray-100'
        onClick={handleReturnclick}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-9">
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