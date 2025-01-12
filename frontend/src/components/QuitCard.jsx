import React from 'react'
import QuitDuration from './QuitDuration.jsx';
import FormatDate from './FormatDate.jsx';
import { useNavigate } from 'react-router-dom';

const QuitCard = ({quit,setSelectedQuit}) => {
  const navigate = useNavigate()
  
  function handleQuitClick () {
    setSelectedQuit(quit._id)
    navigate('/quitStats')
  }
  console.log(quit)
  return (
    <div
      onClick={handleQuitClick}
      className='h-1/3 overflow-auto p-4 rounded bg-blue-600 hover:bg-blue-300 hover:cursor-pointer'
    >

      <h1>Addiction: {quit.addictionTypeID.name}</h1>
      <FormatDate date={quit.startDate} />
      <QuitDuration startDate={quit.startDate}/>
    </div>
  )
}

export default QuitCard