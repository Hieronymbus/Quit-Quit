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
  const [whatConsumed, setWhatConsumed] = useState(null);
  const [sortedAdjustedAchievmentsArr, setSortedAdjustedAchievmentsArr] = useState([]);
  
  const [isEitherMenuClicked, setIsEitherMenuClicked ] = useState([]);

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

  useEffect(()=> {
    if(currentQuit){

      const keys = Object.keys(currentQuit?.usageParameters);
      const knownKeys = ["Cost", "Time"];
      const whatConsumedKey = keys.find(key => {
        return !knownKeys.includes(key)
      })
      setWhatConsumed(whatConsumedKey)
      console.log(Object.keys(currentQuit?.usageParameters)[0])
    }
  }, [currentQuit])

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
      const moneyGoal = money(amountTotal(currentQuit?.usageParameters[whatConsumed], timeDays(currentQuit?.startDate)),currentQuit?.usageParameters.Cost)  
      const amountGoal = amountTotal(currentQuit?.usageParameters[whatConsumed], timeDays(currentQuit?.startDate))
      const timeGoal = timeDays(currentQuit?.startDate)
     
    
      const goalMatchArr = [moneyGoal, moneyGoal, moneyGoal, amountGoal, amountGoal, amountGoal, timeGoal, timeGoal, timeGoal, timeGoal] 
    
      const adjustedAchievmentsArr = currentQuit?.addictionTypeID.achievments.map((achievment, index) => {
          
          if (goalMatchArr[index] >= achievment.target) {
            achievment.goalAchieved = true
            achievment.goalPercent = 100
            return achievment
          } else {
            achievment.goalAchieved = false

            achievment.goalPercent = parseInt((goalMatchArr[index] / achievment.target) * 100)
            return achievment
          }
      })
      
      setSortedAdjustedAchievmentsArr( [...adjustedAchievmentsArr].sort((a, b) => {
        return b.goalPercent - a.goalPercent;
      }))
    }
  }, [currentQuit, whatConsumed])

  return (
    <div
      className='w-full min-h-screen  bg-slate-200 dark:bg-slate-600 dark:text-slate-100'
    >
      <Header 
        setDarkMode={setDarkMode} 
        darkMode={darkMode} 
        currentQuit={currentQuit} 
        setSelectedQuit={setSelectedQuit}
        setIsEitherMenuClicked={setIsEitherMenuClicked}
        isEitherMenuClicked={isEitherMenuClicked}
      />
      <QuitNav/>
      
      <div className="p-5 grid sm:grid-rows-5 sm:grid-cols-2 gap-2 bg-slate-200 dark:bg-slate-600 overflow-auto">
        {sortedAdjustedAchievmentsArr.map((milestone, index) => {

          return (

            <CardMilestone 
                key={index}
                goalAchieved={milestone.goalAchieved}
                goalPercent={milestone.goalPercent}
                title={milestone.title}
                description={milestone.description}
                isEitherMenuClicked={isEitherMenuClicked}
                setIsEitherMenuClicked={setIsEitherMenuClicked}
            />
          )
        
        })}
        
      </div>

    </div>
  )
}

export default QuitMilestones