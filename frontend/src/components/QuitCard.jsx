import React from 'react'
import QuitDuration from './QuitDuration.jsx';
import FormatDate from './FormatDate.jsx';
import { useNavigate } from 'react-router-dom';
const QuitCard = ({name,startDate}) => {
  const navigate = useNavigate()
  
  function handleQuitClick () {
    navigate('/quitStats')
  }
    
  return (
    <div
      onClick={handleQuitClick}
    >

      <h1>Addiction: {name}</h1>
      <FormatDate date={startDate} />
      <QuitDuration startDate={startDate}/>
    </div>
  )
}

export default QuitCard