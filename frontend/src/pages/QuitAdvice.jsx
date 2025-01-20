import React,{useEffect,useState} from 'react'
import Header from '../components/Header.jsx'
import QuitNav from '../components/QuitNav.jsx'

import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'


const QuitAdvice = ({selectedQuit,setSelectedQuit, setDarkMode, darkMode}) => {

  const {fetchQuits, quits} = useQuitStore();
  const {user } = useUserStore()
  useEffect(() => {
    const loadData = async () => {
      await fetchQuits(user.userDetails._id);   
    };
    loadData();
  }, [fetchQuits]);
  
  const currentQuit = quits.find((quit) => quit._id === selectedQuit)
  return (
    <div
      className="dark:text-slate-200"
    >
      <Header setDarkMode={setDarkMode} darkMode={darkMode} currentQuit={currentQuit} setSelectedQuit={setSelectedQuit}/>
      <QuitNav/>
      <div
        className=" p-5 text-xl overflow-auto prose whitespace-pre-line bg-slate-200 dark:bg-slate-600 dark:text-slate-200"
      >
        {currentQuit?.addictionTypeID.expertGuide}
      </div>
      

    </div>
  )
}

export default QuitAdvice