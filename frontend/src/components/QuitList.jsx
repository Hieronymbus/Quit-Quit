import React from 'react'

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
                    return <h1 key={index}>{quit._id}</h1>
                }
            })}
        </div>
    
    </div>
  )
}

export default QuitList