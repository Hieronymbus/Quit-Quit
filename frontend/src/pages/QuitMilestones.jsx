import React,{useEffect,useState} from 'react'
import Header from '../components/Header.jsx'
import QuitNav from '../components/QuitNav.jsx'
import CardMilestone from '../components/CardMilestone.jsx'

import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'

const QuitMilestones = ({selectedQuit, setSelectedQuit, setDarkMode, darkMode}) => {

  const {fetchQuits, quits} = useQuitStore();
  const {user } = useUserStore()
  const [currentQuit, setCurrentQuit] = useState(quits.find((quit) => quit._id === selectedQuit))
  const [sortedAdjustedAchievmentsArr, setSortedAdjustedAchievmentsArr] = useState([])
  

  useEffect(() => {
    const loadData = async () => {
      await fetchQuits(user.userDetails._id);   
    };
    loadData();
  }, [fetchQuits]);

  useEffect(() => {
    const foundQuit = quits.find((quit) => quit._id === selectedQuit);
    setCurrentQuit(foundQuit || null);
  }, [quits, selectedQuit]);

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
            achievment.goalPercent = 0
            return achievment
          }
      })
      
      setSortedAdjustedAchievmentsArr( [...adjustedAchievmentsArr].sort((a, b) => {
        return b.goalAchieved - a.goalAchieved;
      }))
    }
  }, [currentQuit])

  return (
    <div
      className='w-full min-h-screen  bg-slate-200 dark:bg-slate-600 dark:text-slate-100'
    >
      <Header setDarkMode={setDarkMode} darkMode={darkMode} currentQuit={currentQuit} setSelectedQuit={setSelectedQuit}/>
      <QuitNav/>
      
      <div className="p-5 grid sm:grid-rows-5 sm:grid-cols-2 gap-2 bg-slate-200 dark:bg-slate-600 overflow-auto">
        {sortedAdjustedAchievmentsArr.map((milestone, index) => {

          return (

            <CardMilestone 
                key={index}
                goalAchieved={milestone.goalAchieved}
                title={milestone.title}
                description={milestone.description}
            />
          )
          
        })}
        
      </div>

    </div>
  )
}

export default QuitMilestones