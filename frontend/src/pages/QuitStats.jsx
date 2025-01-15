import React, {useEffect, useState} from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'
import FormatDate from '../components/FormatDate.jsx'
import QuitDuration from '../components/QuitDuration.jsx'
import AmountAvoided from '../components/AmountAvoided.jsx'
import UsageTimeAvoided from '../components/UsageTimeAvoided.jsx'
import MoneySaved from '../components/MoneySaved.jsx'
import Overlay from '../components/Overlay.jsx'

const QuitDashboard = ({selectedQuit, setSelectedQuit}) => {
  const {fetchQuits, quits} = useQuitStore();
  const {user } = useUserStore();
  const [isVideoModalOpen, setIsVideoModalOpen] = useState();
  const [whatConsumed,setWhatConsumed] = useState();

  useEffect(() => {
    fetchQuits(user.userDetails._id);
  },[fetchQuits])
 
  const currentQuit = quits.find((quit) => quit._id === selectedQuit)
  
  console.log(currentQuit)
  
  useEffect(()=> {

    if(currentQuit){
  
      setWhatConsumed( Object.keys(currentQuit?.usageParameters)[0] )
    }
  })
  console.log(currentQuit?.videoPath)


  return (
    <div
      className="h-screen"
    >
      <Header currentQuit={currentQuit} setSelectedQuit={setSelectedQuit}/>
      <div className="h-4/6 grid grid-cols-2 grid-rows-3 gap-0 rounded">
        <div className="bg-blue-500 p-4 ">
          Start Date: <FormatDate date={currentQuit?.startDate}/>
          6 Month Quit Completion Date: <FormatDate date={currentQuit?.endDate}/>
        </div>
        <div className="bg-blue-500 p-4 ">
          <QuitDuration startDate={currentQuit?.startDate}/>
        </div>
        <div className="bg-blue-500 p-4 ">
          Money Saved: 
          <MoneySaved startDate={currentQuit?.startDate} cupsPerDay={currentQuit?.usageParameters.Cups} costPerCup={currentQuit?.usageParameters.Cost} />
        </div>
        <div className="bg-blue-500 p-4 ">
          {whatConsumed} avoided: <AmountAvoided startDate={currentQuit?.startDate} amountPerDay={currentQuit?.usageParameters.Cups}/>
        </div>
        <div className="bg-blue-500 p-4 ">
          Hours reclaimed: <UsageTimeAvoided startDate={currentQuit?.startDate} timePerDay={currentQuit?.usageParameters.Time} />
        </div>
        <div className="bg-blue-500 p-4  overflow-auto">
          Reasons for quitting: {currentQuit?.reasonsToQuit ? currentQuit.reasonsToQuit : "No reasons given. Just waking up one morning and deciding that perhaps, just perhaps, enough is enough. A fine, if somewhat mysterious, decision—no fanfare, no grand speeches—just the quiet resolve of someone who’s had enough of that particular nonsense. Carry on, then, with no particular reason but sheer will."}
          {
            currentQuit?.videoPath
            &&  
            <div>
              <button
                className='p-2 border-4 rounded-lg text-xl '
                onClick={()=> setIsVideoModalOpen(true)}
              >
                Open Video Message from the Past.
              </button>
              {
                isVideoModalOpen
                &&
                <Overlay /> 
              }
              <div
                className={`${!isVideoModalOpen ? "hidden": "fixed"}  z-20 h-3/4 aspect-square m-auto inset-x-0 inset-y-0 border border-gray-100 bg-slate-800 rounded-sm shadow-lg shadow-gray-100`}
              > 
                <div
                  className='flex justify-end'
                >
                  <button
                    onClick={() => setIsVideoModalOpen(false)}
                    className='text-gray-100'
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-7">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div
                  className='flex flex-col items-center gap-5'
                >
                  <video 
                    controls
                    src={`http://localhost:3000/${currentQuit.videoPath}`}
                  />
                  <h3
                    className='text-2xl text-gray-100'
                  >
                    Listen to past you
                  </h3>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default QuitDashboard