import React from 'react'
import QuitCard from './QuitCard'
import { set } from 'mongoose'

const QuitList = ({title, quits, setSelectedQuit}) => {

    
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
                            key={index}
                            quit={quit}
                            setSelectedQuit={setSelectedQuit}
                        />
                    )
                }
            })}
        </div>
    
    </div>
  )
}

export default QuitList