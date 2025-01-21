import React, {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import QuitDuration from './QuitDuration.jsx';
import FormatDate from './FormatDate.jsx';

const QuitCard = ({quit, setSelectedQuit, isDragging}) => {
  const navigate = useNavigate()
  const [bgColor, setBgColor] = useState("")
  const [isStarted, setIsStarted] = useState(false)
  const cardContainerRef = useRef()
  function handleQuitClick () {
    if (isDragging) {
      e.preventDefault();
      
    } else {
      // Navigate to the desired location
      setSelectedQuit(quit._id)
      navigate('/quitStats')
     
    }
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
      ref={cardContainerRef}
      onMouseUp={(e) => handleQuitClick(e)}
      className={` h-[250px] lg:w-[32%] md:w-[49%] sm:w-full w-full p-4 rounded  snap-center flex flex-shrink-0 flex-col gap-6 border-2 border-white ${bgColor} hover:cursor-pointer `}
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