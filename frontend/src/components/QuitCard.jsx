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
      setBgColor("bg-blue-400 hover:bg-blue-300")
    } else if (quit.status === 'abandoned'){
      setBgColor("bg-red-400 hover:bg-red-300")
    } else {
      setBgColor("bg-green-400 hover:bg-green-300")
    }
    const startCheck =  new Date() - new Date(quit.startDate)
    if(startCheck >= 0) {
      setIsStarted(true)
    }
  },[quit])

  
  return (
    <div
      onClick={handleQuitClick}
      className={`h-1/3 w-full overflow-auto p-4 rounded ${bgColor} hover:cursor-pointer `}
      data-tooltip-id='cardTooltip'
      data-tooltip-content="Click to open advanced stats page"
      data-tooltip-place='bottom-start'
      data-tooltip-variant='dark'
      data-tooltip-float='true'
      data-tooltip-delay-show={500}
      
    >
      <Tooltip id="cardTooltip" opacity="0.4"/>
      <h1
        className='text-xl'
      >
        Addiction: {quit.addictionTypeID.name}
      </h1>
      <h2
        className='text-lg'
      > 
        {
          quit.abandonedDate
          ?
          <div>

            {isStarted ? "Quit Started On:" : "Quit Would have started On:"}
          </div>
          :
          <div>

            {isStarted ? "Quit Started On:" : "Quit will start On:"}
          </div>
        }
        
      </h2> 
      <FormatDate date={quit.startDate} />
      <h2
        className='text-lg'
      >
        {quit.abandonedDate ? "Quit Lasted For:" : "Current Duration:"}
        
      </h2>
       <QuitDuration startDate={quit.startDate} abandonedDate={quit.abandonedDate}/>
    </div>
  )
}

export default QuitCard