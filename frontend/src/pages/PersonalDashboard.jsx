import React, { useEffect, useState } from 'react'
import { useQuitStore } from '../store/quit.js'
import Header from '../components/Header'
import QuitList from '../components/QuitList'

const PersonalDashboard = () => {


  const { fetchQuits, quits } = useQuitStore();

  useEffect(() => {
    fetchQuits("677337ddbc40fcf08b9b94b9");
  },[fetchQuits])
 console.log(quits)

  return (
    <div
      className='h-screen'
    >
      
      <Header/>
      <div
        className='flex h-5/6'
      > 
        <QuitList 
          title="Abandoned"
          quits={quits}
        />
        <QuitList 
          title="Active"
          quits={quits}
        />
        <QuitList 
          title="Completed"
          quits={quits}
        />
      </div>
    </div>
  )
}

export default PersonalDashboard