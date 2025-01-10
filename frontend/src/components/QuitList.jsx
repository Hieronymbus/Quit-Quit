import React from 'react'
import QuitCard from './QuitCard'

const QuitList = ({title, quits}) => {


  return (
    <div
        className='w-1/3 h-full border-4 flex flex-col items-center'
    >
        <div>
            {title}           
        </div>
        <div>
            {quits.map((quit, index) => {
                if(quit.status === title.toLowerCase()){
                    return (
                        <QuitCard
                            name={quit.addictionTypeID.name}
                            startDate={quit.startDate}
                    
                        />
                    )
                }
            })}
        </div>
    
    </div>
  )
}

export default QuitList