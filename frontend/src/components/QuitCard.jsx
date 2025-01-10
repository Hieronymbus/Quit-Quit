import React from 'react'
import QuitDuration from './QuitDuration.jsx';
import FormatDate from './FormatDate.jsx';
const QuitCard = ({name,startDate}) => {

  

    
  return (
    <div>

      <h1>Addiction: {name}</h1>
      <FormatDate date={startDate} />
      <QuitDuration startDate={startDate}/>
    </div>
  )
}

export default QuitCard