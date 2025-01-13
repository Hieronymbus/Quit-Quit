import React, { useEffect, useState } from 'react'
import { useQuitStore } from '../store/quit.js'
import Header from '../components/Header'
import QuitList from '../components/QuitList'

const PersonalDashboard = ({setSelectedQuit, darkMode, setDarkMode}) => {


  const { fetchQuits, quits } = useQuitStore();

  useEffect(() => {
    fetchQuits("677337ddbc40fcf08b9b94b9");
  },[fetchQuits])

  return (
    <div
      className='h-screen'
    >
      
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      <div
        className='flex h-5/6'
      > 
        <QuitList 
          title="Abandoned"
          quits={quits}
          setSelectedQuit={setSelectedQuit}
        />
        <QuitList 
          title="Active"
          quits={quits}
          setSelectedQuit={setSelectedQuit}
        />
        <QuitList 
          title="Completed"
          quits={quits}
          setSelectedQuit={setSelectedQuit}
        />
      </div>
    </div>
  )
}

export default PersonalDashboard