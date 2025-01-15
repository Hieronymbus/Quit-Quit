import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import QuitDuration from './QuitDuration.jsx';
import FormatDate from './FormatDate.jsx';

const QuitCard = ({quit,setSelectedQuit}) => {
  const navigate = useNavigate()
  const [bgColor, setBgColor] = useState("")

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
  },[quit])

  console.log("QuitCard", quit)
  return (
    <div
      onClick={handleQuitClick}
      className={`h-1/3 w-full overflow-auto p-4 rounded ${bgColor} hover:cursor-pointer`}
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
        Quit Started On:
      </h2> 
      <FormatDate date={quit.startDate} />
      <h2
        className='text-lg'
      >
        Current Duration:
      </h2>
       <QuitDuration startDate={quit.startDate} />
    </div>
  )
}

export default QuitCard