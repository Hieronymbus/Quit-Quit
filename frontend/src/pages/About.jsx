import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../store/user'

import Header from '../components/Header'

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
      <Header />
      <div>
        SITE INFORMATION INSTRUCTIONS INNIT
      </div>
    </div>
  )
}

export default About