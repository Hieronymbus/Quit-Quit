import React,{useEffect,useState} from 'react'
import Header from '../components/Header.jsx'
import QuitNav from '../components/QuitNav.jsx'

import { useQuitStore } from '../store/quit.js'
import { useUserStore } from '../store/user.js'


const QuitAdvice = ({selectedQuit,setSelectedQuit, setDarkMode, darkMode}) => {

  const {fetchQuits, quits} = useQuitStore();
  const {user } = useUserStore()
  const [isStartOpen, setIsStartOpen] = useState(true);
  const [isMiddleOpen,setIsMiddleOpen] = useState(false);
  const [isEndOpen,setIsEndOpen] = useState(false);
  const [isOngoingOpen, setIsOngoinOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await fetchQuits(user.userDetails._id);   
    };
    loadData();
  }, [fetchQuits]);
  
  const currentQuit = quits.find((quit) => quit._id === selectedQuit)



  return (
    <div
      className='min-h-screen dark:text-slate-200 bg-slate-200 dark:bg-slate-600'
    >
      <Header setDarkMode={setDarkMode} darkMode={darkMode} currentQuit={currentQuit} setSelectedQuit={setSelectedQuit}/>
      <QuitNav/>
      {
        currentQuit 
        ?
        <div
          className=" p-5 text-xl  dark:text-slate-200"
        > 
          
          <div dangerouslySetInnerHTML={{ __html: currentQuit.addictionTypeID.expertGuide.warning }} /> 
          <h2
            className='text-4xl font-bold my-5 ' 
          >
            Action Phase(6 months)
          </h2>
          <div
            className='mb-10 p-2 bg-slate-300  dark:bg-slate-800'
          >
            <div
              {...(isStartOpen ? {className: "block"} : {className: "hidden"} )}
            >
              <div className='mb-5' dangerouslySetInnerHTML={{ __html: currentQuit.addictionTypeID.expertGuide.action.start }} /> 
            </div>
            <div
              onClick={()=>{setIsStartOpen(!isStartOpen)}}
            >
              <h2>
                {
                  isStartOpen
                  ?
                  "Click to Colapse"
                  :
                  "Click to expand weeks 1-2"
                }
                
              </h2>
            </div>
          </div>
          <div
            className='mb-10 p-2 bg-slate-300 dark:bg-slate-800'           
          >
            <div
              {...(isMiddleOpen ? {className: "block"} : {className: "hidden"} )}
            >
              <div className='mb-5' dangerouslySetInnerHTML={{ __html: currentQuit.addictionTypeID.expertGuide.action.middle }} /> 
            </div>
            <div
              onClick={()=>{setIsMiddleOpen(!isMiddleOpen)}}
            >
              <h2>
                {
                  isMiddleOpen
                  ?
                  "Click to Colapse"
                  :
                  "Click to Expand weeks 3-8"
                }
              </h2>
            </div>
          </div>

          <div
            className='mb-10 p-2 bg-slate-300 dark:bg-slate-800'
          >
            <div
              {...(isEndOpen ? {className: "block"} : {className: "hidden"} )}
            >
              <div className='mb-5' dangerouslySetInnerHTML={{ __html: currentQuit.addictionTypeID.expertGuide.action.end }} /> 
            </div>
            <div
              onClick={()=>{setIsEndOpen(!isEndOpen)}}
              className=''
            >
              <h2>            
                {
                  isEndOpen
                  ?
                  "Click to Colapse"
                  :
                  "Click to Expand months 2-6"
                }
              </h2>
            </div>
          </div>

          <h2
            className='text-4xl font-bold mb-5'
          >
            Maintenance Phase(ongoing)
          </h2>
          <div
            className='mb-10 p-2 bg-slate-300 dark:bg-slate-800'
          >
            <div
              {...(isOngoingOpen ? {className: "block"} : {className: "hidden"} )}
            >
              <div className='mb-5' dangerouslySetInnerHTML={{ __html: currentQuit.addictionTypeID.expertGuide.maintenance }} /> 
            </div>
            <div
              onClick={()=>{setIsOngoinOpen(!isOngoingOpen)}}
              className=''
            >
              <h2>
              {
                    isOngoingOpen
                    ?
                    "Click to Colapse"
                    :
                    "Click to expand month 7-infinity"
                  }
              </h2>
            </div>
          </div>  
        </div>
        :
        <div
          className="h-full-minus-navbar p-5 text-xl bg-slate-200 dark:bg-slate-600 dark:text-slate-200"
        >
            Loading..
        </div>
      }     
    </div>
  )
}

export default QuitAdvice