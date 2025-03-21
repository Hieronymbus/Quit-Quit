import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'

import Header from '../components/Header'
import QuitList from '../components/QuitList'
import DailyQuote from '../components/DailyQuote.jsx';

import loadingGIF from '../assets/gifs/wired-outline-212-arrow-1-rounded-loop-cycle.gif'

const PersonalDashboard = ({setSelectedQuit, darkMode, setDarkMode}) => {

  const {user} = useUserStore()
  const { fetchQuits, quits } = useQuitStore();
  const [isLoading, setIsLoading] = useState(true)

  console.log(quits)

  useEffect(() => {
    const loadData = async () => {
      await fetchQuits(user.userDetails._id); // Wait for the fetch operation
      setIsLoading(false); // Set loading to false after fetching
      console.log("load")
    };
    loadData();
  }, [fetchQuits]);
  

  return (
    <div
      className='min-h-screen w-full bg-slate-200 dark:bg-slate-600 dark:text-slate-100'
    >
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      {
        isLoading
        ?
        <div
          className="h-full-minus-navbar p-5 text-2xl bg-slate-200 dark:bg-slate-600 dark:text-slate-200"
        >
            Loading<img src={loadingGIF} alt="loading animation"  className='h-9 inline ml-1'/>
        </div>
        :
        <div
          className=' p-[16px] flex flex-col sm:gap[16px] overflow-auto '
        > 
          <DailyQuote />     
          <QuitList 
            title="Action Phase"
            status="active"
            quits={quits}
            setSelectedQuit={setSelectedQuit}
          />
          <QuitList 
            title="Maintenance"
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
      }
    </div>
  )
}

export default PersonalDashboard