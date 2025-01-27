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
      {
        currentQuit 
        ?
        <div
          className=" p-5 text-xl  bg-slate-200 dark:bg-slate-600 dark:text-slate-200"
        > 
          
          <div dangerouslySetInnerHTML={{ __html: currentQuit.addictionTypeID.expertGuide.warning }} /> 
          <h2
            className='text-4xl font-bold my-5 ' 
          >
            Action Phase(6 months)
          </h2>
          <div className='mb-10' dangerouslySetInnerHTML={{ __html: currentQuit.addictionTypeID.expertGuide.action.start }} /> 
          <div className='mb-10' dangerouslySetInnerHTML={{ __html: currentQuit.addictionTypeID.expertGuide.action.middle }} /> 
          <div className='mb-10' dangerouslySetInnerHTML={{ __html: currentQuit.addictionTypeID.expertGuide.action.end }} /> 
          <h2
            className='text-4xl font-bold mb-5'
          >
            Maintenance Phase(ongoing)
          </h2>
          <div className='mb-10' dangerouslySetInnerHTML={{ __html: currentQuit.addictionTypeID.expertGuide.maintenance }} /> 
          
        </div>
        :
        <div
          className=" p-5 text-xl  bg-slate-200 dark:bg-slate-600 dark:text-slate-200"
        >
          Loading..
        </div>
      }
      

    </div>
  )
}

export default QuitAdvice