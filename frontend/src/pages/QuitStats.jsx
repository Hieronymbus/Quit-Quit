import React, {useEffect} from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'
import FormatDate from '../components/FormatDate.jsx'
import QuitDuration from '../components/QuitDuration.jsx'
import AmountAvoided from '../components/AmountAvoided.jsx'
import UsageTimeAvoided from '../components/UsageTimeAvoided.jsx'
import MoneySaved from '../components/MoneySaved.jsx'

const QuitDashboard = ({selectedQuit, setSelectedQuit}) => {
  const {fetchQuits, quits} = useQuitStore();
  const {user } = useUserStore()
  useEffect(() => {
    fetchQuits("677337ddbc40fcf08b9b94b9");
  },[fetchQuits])
 
  const currentQuit = quits.find((quit) => quit._id === selectedQuit)
  
  console.log(currentQuit)
  let whatConsumed;
  if(currentQuit){

     whatConsumed = Object.keys(currentQuit?.usageParameters)[0] 
    }
    console.log(whatConsumed)


  return (
    <div
      className="h-screen"
    >
      <Header currentQuit={currentQuit} setSelectedQuit={setSelectedQuit}/>
      <div className="h-4/6 grid grid-cols-2 grid-rows-3 gap-4">
        <div className="bg-blue-500 p-4">
          Start Date: <FormatDate date={currentQuit?.startDate}/>
          6 Month Quit Completion Date: <FormatDate date={currentQuit?.endDate}/>
        </div>
        <div className="bg-blue-500 p-4">
          <QuitDuration startDate={currentQuit?.startDate}/>
        </div>
        <div className="bg-blue-500 p-4">
          Money Saved: 
          <MoneySaved startDate={currentQuit?.startDate} cupsPerDay={currentQuit?.usageParameters.Cups} costPerCup={currentQuit?.usageParameters.Cost} />
        </div>
        <div className="bg-blue-500 p-4">
          {whatConsumed} avoided: <AmountAvoided startDate={currentQuit?.startDate} amountPerDay={currentQuit?.usageParameters.Cups}/>
        </div>
        <div className="bg-blue-500 p-4">
          Hours reclaimed:<UsageTimeAvoided startDate={currentQuit?.startDate} timePerDay={currentQuit?.usageParameters.Time} />
        </div>
        <div className="bg-blue-500 p-4 overflow-auto">
          Reasons for quitting: {currentQuit?.reasonsToQuit ? currentQuit.reasonsToQuit : "No reasons given. Just waking up one morning and deciding that perhaps, just perhaps, enough is enough. A fine, if somewhat mysterious, decision—no fanfare, no grand speeches—just the quiet resolve of someone who’s had enough of that particular nonsense. Carry on, then, with no particular reason but sheer will."}
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default QuitDashboard