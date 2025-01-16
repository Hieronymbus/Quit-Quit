import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import QuitDuration from './QuitDuration.jsx';
import FormatDate from './FormatDate.jsx';

const QuitCard = ({quit,setSelectedQuit}) => {
  const navigate = useNavigate()
  const [bgColor, setBgColor] = useState("")
  const [isStarted, setIsStarted] = useState(false)

  function handleQuitClick () {
    setSelectedQuit(quit._id)
    navigate('/quitStats')
  }
  useEffect(() => {

    if(quit.status === 'active'){
      setBgColor("bg-blue-400 hover:bg-blue-300 dark:bg-blue-700 dark:hover:bg-blue-600")
    } else if (quit.status === 'abandoned'){
      setBgColor("bg-red-400 hover:bg-red-300 dark:bg-red-800 dark:hover:bg-red-700")
    } else {
      setBgColor("bg-green-400 hover:bg-green-300 dark:bg-green-700 dark:hover:bg-green-600")
    }
    const startCheck =  new Date() - new Date(quit.startDate)
    if(startCheck >= 0) {
      setIsStarted(true)
    }
  },[quit])

  
  return (
    <div
      onClick={handleQuitClick}
      className={`min-h-[250px] w-full m-2 p-4 rounded flex flex-col items-center gap-6 ${bgColor} hover:cursor-pointer `}
      data-tooltip-id='cardTooltip'
      data-tooltip-content="Click to open advanced stats page"
      data-tooltip-place='bottom-start'
      data-tooltip-variant='dark'
      data-tooltip-float='true'
      data-tooltip-delay-show={500}
      
    >
      <Tooltip id="cardTooltip" opacity="0.4"/>
      <h1
        className='text-2xl'
      >
        Addiction: {quit.addictionTypeID.name}
      </h1>
      <div>
        <h2
          className='text-xl'
        > 
          {
            quit.abandonedDate
            ?
            <div>

              {isStarted ? "Quit Started On" : "Quit Would have started On"}
            </div>
            :
            <div>

              {isStarted ? "Quit Started On" : "Quit will start On"}
            </div>
          }
          
        </h2> 
        <FormatDate date={quit.startDate} />
      </div>
      <div>
        <h2
          className='text-lg'
        >
          {quit.abandonedDate ? "Quit Lasted For" : "Current Duration"}
          
        </h2>
        <QuitDuration startDate={quit.startDate} abandonedDate={quit.abandonedDate}/>
      </div>
    </div>
  )
}

export default QuitCard