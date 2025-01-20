import React,{useEffect,useState} from 'react'
import Header from '../components/Header.jsx'
import QuitNav from '../components/QuitNav.jsx'

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
      
      <div className="p-5 grid grid-rows-5 grid-cols-2 gap-2 bg-slate-200 dark:bg-slate-600 overflow-auto">
        {sortedAdjustedAchievmentsArr.map((milestone, index) => {

          return  <div 
                    className={
                      `max-h-[250px] p-2 
                      ${milestone.goalAchieved ? "bg-green-500 dark:bg-green-700 border-4 border-yellow-600" : "bg-slate-500 border-4 border-slate-700"} 
                      overflow-auto no-scrollbar`}
                    key={index}
                  > 
                    <div
                      className='flex justify-between gap-4'
                    >
                      <h2 className='text-center text-xl'>
                      {milestone.title} 
                      </h2> 
                      {
                        milestone.goalAchieved 
                        ?
                        <div
                          className='flex'
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-8">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                          </svg>
                          <h2>{'Completed'}</h2>
                        </div>
                        :
                        <div>

                        </div>
                      }
                      
                    </div>
                    <div className='mt-2 '>
                      {milestone.description}
                    </div>
                  </div>
        })}
        
      </div>

    </div>
  )
}

export default QuitMilestones