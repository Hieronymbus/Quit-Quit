import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import { Tooltip } from 'react-tooltip'
import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'

import PlusIcon from '../assets/svg/PlusIcon.jsx';

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
      className='w-full bg-slate-200 dark:bg-slate-600 dark:text-slate-100'
    >
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      <div
        className=' p-[16px] flex flex-col gap-[16px] overflow-auto '
      > 
        <DailyQuote />
        
                        <div>
                          <Link to={"/addQuit"}>
                            <button
                                className=' p-2 rounded-lg hover:bg-slate-400 dark:hover:bg-slate-800 '
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content="Create Quit"
                                data-tooltip-place="bottom"
                                data-tooltip-variant='dark'
                                data-tooltip-delay-show={500}
                            >
                              <PlusIcon />  
                              <Tooltip id="my-tooltip" />
                            </button>
                          </Link>   
                        </div>
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