import React, { useEffect, useState } from 'react'
import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'
import Header from '../components/Header'
import QuitList from '../components/QuitList'
import DailyQuote from '../components/DailyQuote.jsx';

const PersonalDashboard = ({setSelectedQuit, darkMode, setDarkMode}) => {

  const {user} = useUserStore()
  const { fetchQuits, quits } = useQuitStore();

  console.log(quits)

  useEffect(() => {
    fetchQuits(user.userDetails._id);
  },[fetchQuits])

  return (
    <div
      className=' bg-slate-200 dark:bg-slate-600 dark:text-slate-100'
    >
      
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      
      <div
        className=' p-[16px] flex flex-col gap-[16px] overflow-auto '
      > 
        <DailyQuote />
        <h1
          className='text-6xl'
        >
          All Quits
        </h1>
        <QuitList 
          title="Action-Phase"
          status="active"
          quits={quits}
          setSelectedQuit={setSelectedQuit}
        />
        <QuitList 
          title="Maintenance-Phase"
          status="completed"
          quits={quits}
          setSelectedQuit={setSelectedQuit}
        />
        <QuitList 
          title="Abandoned"
          status="abandoned"
          quits={quits}
          setSelectedQuit={setSelectedQuit}
        />
      </div>
    </div>
  )
}

export default PersonalDashboard