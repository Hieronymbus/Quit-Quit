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
  return (
    <div
      onClick={handleQuitClick}
    >

      <h1>Addiction: {name}</h1>
      <FormatDate date={quit.startDate} />
      <QuitDuration startDate={quit.startDate}/>
    </div>
  )
}

export default QuitCard