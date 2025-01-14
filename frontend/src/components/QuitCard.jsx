import React, {useEffect, useState} from 'react'
import QuitDuration from './QuitDuration.jsx';
import FormatDate from './FormatDate.jsx';
import { useNavigate } from 'react-router-dom';

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

  return (
    <div
      onClick={handleQuitClick}
      className={`h-1/3 w-full overflow-auto p-4 rounded ${bgColor} hover:cursor-pointer`}
    >

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