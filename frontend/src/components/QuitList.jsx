import React from 'react'
import QuitCard from './QuitCard'


const QuitList = ({title, quits, setSelectedQuit}) => {

    
  return (
    <div
        className='w-1/3 h-full p-1 flex flex-col items-center'
    >
        <div>
            <h2
                className='text-3xl'
            >
             {title}  
            </h2>         
        </div>
        <div
            className='h-5/6 w-full flex flex-col gap-3'
        >   
            {
                quits.length == 0 && 
                (
                    <div
                        className='h-40 p-5 flex justify-center items-center'
                    >
                        <i>Currently no quits in this category yet, to start a new quit click + button</i>
                    </div>
                )
            }
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