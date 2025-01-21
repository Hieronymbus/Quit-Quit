import React, {useEffect, useState} from 'react'
import Header from '../components/Header.jsx'
import QuitNav from '../components/QuitNav.jsx'
import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'
import FormatDate from '../components/FormatDate.jsx'
import QuitDuration from '../components/QuitDuration.jsx'
import AmountAvoided from '../components/AmountAvoided.jsx'
import UsageTimeAvoided from '../components/UsageTimeAvoided.jsx'
import MoneySaved from '../components/MoneySaved.jsx'
import Overlay from '../components/Overlay.jsx'
import ModalVideo from '../components/ModalVideo.jsx'

const QuitDashboard = ({selectedQuit, setSelectedQuit, setDarkMode, darkMode}) => {
  const {fetchQuits, quits} = useQuitStore();
  const {user } = useUserStore();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [whatConsumed, setWhatConsumed] = useState(null);
  const [currentQuit, setCurrentQuit] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      await fetchQuits(user.userDetails._id);   
    };
    loadData();
    
  }, [fetchQuits]);
  useEffect(()=>{
    if(quits){
      const quit = quits.find((q) => q._id === selectedQuit);
      setCurrentQuit(quit); // Set the quit or null if not found
    }
  },[quits])
  useEffect(()=> {
    if(currentQuit){
      setWhatConsumed( Object.keys(currentQuit?.usageParameters)[0])
    }
  }, [currentQuit])
  


  return (
    <div
       className='w-full min-h-screen  bg-slate-200 dark:bg-slate-600 dark:text-slate-100'
    >
      <Header setDarkMode={setDarkMode} darkMode={darkMode} currentQuit={currentQuit} setSelectedQuit={setSelectedQuit}/>
      <QuitNav />
      {
        !currentQuit
        ?
        <div>
          Loading...
        </div>
        :
        <div className="w-full p-5 rounded flex flex-col gap-10  bg-slate-200 dark:bg-slate-600 dark:text-slate-100">
          <div
            className='w-full text-xl border-b border-black'
          > 
            <h2
              className='text-3xl text-blue-600'
            >
              Key Dates
            </h2>
            <div
              className='w-full p-5 grid sm:grid-cols-2 gap-5'
            >
              <div> 
                <h3
                  className='text-blue-400'
                >
                  Start Date 
                </h3>
                <FormatDate date={currentQuit.startDate}/> 
              </div>
              <div
                className=''
              > 
                <h3
                  className='text-blue-400'
                >
                  Action Phase Completion Date  
                </h3>
                  <FormatDate date={currentQuit.endDate}/> 
              </div>
              {
                currentQuit?.abandonedDate 
                && 
                <div> 
                  <h2
                    className='text-center text-3xl text-red-600'
                  >
                    Abandoned This Quit on
                  </h2>
                  
                    <FormatDate date={currentQuit.abandonedDate}/> 
                </div>
              }
            </div>
          </div>
          
          <div 
            className="w-full text-xl border-b border-black "
          >
              <h2
                className='text-3xl text-blue-600'
              >
                Statistics
              </h2>
              <div
                className=' p-5 grid sm:grid-cols-2 gap-5'
              >
                <div>
                  <h2
                    className='text-blue-400'
                  >
                    Quit Duration
                  </h2>
                
                  <QuitDuration startDate={currentQuit.startDate} abandonedDate={currentQuit.abandonedDate} />  
                </div> 
                <div>
                  <h2
                    className='text-blue-400'
                  >
                    Time reclaimed
                  </h2>
                  
                    <UsageTimeAvoided startDate={currentQuit.startDate} abandonedDate={currentQuit.abandonedDate} timePerDay={currentQuit.usageParameters.Time} />
                </div> 
                <div>
                  <h2
                    className='text-blue-400'
                  >
                    Money Saved
                  </h2>
                  
                  <MoneySaved startDate={currentQuit.startDate} abandonedDate={currentQuit.abandonedDate} cupsPerDay={currentQuit.usageParameters.Cups} costPerCup={currentQuit.usageParameters.Cost} />
                </div> 
                <div>
                  <h2
                    className='text-blue-400'
                  >
                    {whatConsumed} avoided
                  </h2>
                  
                    <AmountAvoided startDate={currentQuit.startDate} abandonedDate={currentQuit.abandonedDate} amountPerDay={currentQuit.usageParameters.Cups}/>
                </div> 
              </div>
          </div>
          <div className="w-full text-xl">
            <div>
              <h2
                className=' text-blue-600 text-3xl'
              >
                Reasons for quitting
              </h2>
              <div
                className='p-5 grid sm:grid-cols-2 gap-5'
              > 
                <div>
                  <h3
                    className='text-2xl text-blue-400'
                  >
                    Written
                  </h3>
                  {currentQuit.reasonsToQuit ? currentQuit.reasonsToQuit : "No reasons given. Just waking up one morning and deciding that perhaps, just perhaps, enough is enough. A fine, if somewhat mysterious, decision—no fanfare, no grand speeches—just the quiet resolve of someone who’s had enough of that particular nonsense. Carry on, then, with no particular reason but sheer will."}
                </div>
                <div>
                  <h3
                    className='text-2xl text-blue-400'
                  >
                    Video
                  </h3>
                  {
                    currentQuit.videoPath
                    ?
                    <div>
                      <button
                        className='p-2 rounded-3xl bg-blue-500 '
                        onClick={()=> setIsVideoModalOpen(true)}
                      >
                        Open Video Message from the Past.
                      </button>
                      {
                        isVideoModalOpen
                        &&
                        <Overlay /> 
                      }
                      <ModalVideo setIsVideoModalOpen={setIsVideoModalOpen} isVideoModalOpen={isVideoModalOpen} currentQuit={currentQuit}/>
                    </div>
                    :
                    <div>
                      No video recorded
                    </div>
                  }
                </div>
              </div>
            </div> 
          </div>
        </div>
      }
    </div>
  )
}

export default QuitDashboard