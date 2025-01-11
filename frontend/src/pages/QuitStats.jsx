import React, {useEffect} from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'
import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'
import FormatDate from '../components/FormatDate.jsx'
import QuitDuration from '../components/QuitDuration.jsx'

const QuitDashboard = ({selectedQuit, setSelectedQuit}) => {
  const {fetchQuits, quits} = useQuitStore();
  const {user } = useUserStore()
  useEffect(() => {
    fetchQuits("677337ddbc40fcf08b9b94b9");
  },[fetchQuits])
  useEffect(()=>{
    if(user.isLoggedIn === false) {
      localStorage.removeItem('selectedQuit')
    }
}, [user.isLoggedIn])
  const currentQuit = quits.find((quit) => quit._id === selectedQuit)
 
  return (
    <div
      className="h-screen"
    >
      <Header currentQuit={currentQuit} setSelectedQuit={setSelectedQuit}/>
      <div className="h-4/6 grid grid-cols-2 grid-rows-3 gap-4">
        <div className="bg-blue-500 p-4">
          Start Date: <FormatDate date={currentQuit?.startDate}/>
        </div>
        <div className="bg-blue-500 p-4">
          <QuitDuration startDate={currentQuit?.startDate}/>
        </div>
        <div className="bg-blue-500 p-4">
          End Date: <FormatDate date={currentQuit?.endDate}/>
        </div>
        <div className="bg-blue-500 p-4">Item 4</div>
        <div className="bg-blue-500 p-4">Item 5</div>
        <div className="bg-blue-500 p-4">Item 6</div>
      </div>

      <Footer/>
    </div>
  )
}

export default QuitDashboard