import React,{useEffect,useState} from 'react'
import Header from '../components/Header.jsx'
import Footer from '../components/Footer.jsx'

import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'

const QuitMilestones = ({selectedQuit, setSelectedQuit}) => {

  const {fetchQuits, quits} = useQuitStore();
  const {user } = useUserStore()
  const [currentQuit, setCurrentQuit] = useState(quits.find((quit) => quit._id === selectedQuit))
  const [sortedAdjustedAchievmentsArr, setSortedAdjustedAchievmentsArr] = useState([])
  useEffect(() => {
    fetchQuits("677337ddbc40fcf08b9b94b9");
  },[fetchQuits])
  useEffect(()=>{
    if(user.isLoggedIn === false) {
      localStorage.removeItem('selectedQuit')
    }
  }, [user.isLoggedIn])
  useEffect(() => {
    const foundQuit = quits.find((quit) => quit._id === selectedQuit);
    setCurrentQuit(foundQuit || null);
  }, [quits, selectedQuit]);
  console.log(currentQuit)
  useEffect(() => {
    if(currentQuit) {

      const timeDays = (startDate) => {
    
        const elapsed = new Date() - new Date(startDate)
        const days = elapsed / (1000 * 60 * 60 * 24);
        return days
      } 
      const amountTotal = (amountPerDay, days) => {
        const amount = amountPerDay * days
        return amount
      }
      const money = (amount, costPerCup) => {
        const money = amount * costPerCup
        return money
      }
      const moneyGoal = money(amountTotal(currentQuit?.usageParameters.Cups, timeDays(currentQuit?.startDate)),currentQuit?.usageParameters.Cost)  
      const amountGoal = amountTotal(currentQuit?.usageParameters.Cups, timeDays(currentQuit?.startDate))
      const timeGoal = timeDays(currentQuit?.startDate)
     
    
      const goalMatchArr =[moneyGoal, moneyGoal, moneyGoal, amountGoal, amountGoal, amountGoal, timeGoal, timeGoal, timeGoal, timeGoal] 
    
      const adjustedAchievmentsArr = currentQuit?.addictionTypeID.achievments.map((achievment, index) => {
          if (goalMatchArr[index] >= achievment.target) {
            achievment.goalAchieved = true
            return achievment
          } else {
            achievment.goalAchieved = false
            return achievment
          }
      })
      
      setSortedAdjustedAchievmentsArr( [...adjustedAchievmentsArr].sort((a, b) => {
        return b.goalAchieved - a.goalAchieved;
      }))
    }
  },[currentQuit])

  return (
    <div
      className="h-screen"
    >
      <Header currentQuit={currentQuit} setSelectedQuit={setSelectedQuit}/>
      
      <div className="h-4/6 grid grid-rows-5 grid-cols-2 gap-2">
        {sortedAdjustedAchievmentsArr.map((milestone, index) => {

         return <div 
                  className={`p-2  ${milestone.goalAchieved ? "bg-green-500 border-4 border-yellow-600" : "bg-slate-500 border-4 border-slate-700"} overflow-auto`}
                  key={index}
                >
                  <h2 className='text-center'>
                   {milestone.title}
                  </h2> 
                  <div className=' '>
                    {milestone.description}
                  </div>
                </div>
        })}
        
      </div>
      <Footer/>

    </div>
  )
}

export default QuitMilestones