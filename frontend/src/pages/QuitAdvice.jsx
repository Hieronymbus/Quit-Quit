import React,{useEffect,useState} from 'react'
import Header from '../components/Header.jsx'

import Footer from '../components/Footer.jsx'
import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'


const QuitAdvice = ({selectedQuit,setSelectedQuit}) => {

  const {fetchQuits, quits} = useQuitStore();
  const {user } = useUserStore()
  useEffect(() => {
    fetchQuits(user.userDetails._id);
  },[fetchQuits])
  
  const currentQuit = quits.find((quit) => quit._id === selectedQuit)
  console.log(currentQuit)
  return (
    <div
      className="h-screen"
    >
      <Header currentQuit={currentQuit} setSelectedQuit={setSelectedQuit}/>
      <div
        className="h-4/6 p-4 overflow-auto prose whitespace-pre-line bg-slate-200 dark:bg-slate-600 dark:text-slate-200"
      >
        {currentQuit?.addictionTypeID.expertGuide}
      </div>
      
      <Footer/>

    </div>
  )
}

export default QuitAdvice