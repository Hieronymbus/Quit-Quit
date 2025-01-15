import React, { useEffect, useState } from 'react'
import { useQuitStore } from '../store/quit.js'
import Header from '../components/Header'
import QuitList from '../components/QuitList'
import { useUserStore } from '../store/user.js'

const PersonalDashboard = ({setSelectedQuit, darkMode, setDarkMode}) => {

  const {user} = useUserStore()
  const { fetchQuits, quits } = useQuitStore();

  console.log(quits)

  useEffect(() => {
    fetchQuits(user.userDetails._id);
  },[fetchQuits])

  return (
    <div
      className='h-screen'
    >
      
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      <div
        className='flex h-full bg-slate-100'
      > 
        <QuitList 
          title="Abandoned"
          status="abandoned"
          quits={quits}
          setSelectedQuit={setSelectedQuit}
        />
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
      </div>
    </div>
  )
}

export default PersonalDashboard