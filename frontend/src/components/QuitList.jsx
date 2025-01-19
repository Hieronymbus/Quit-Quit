import React, { useEffect, useState } from 'react'
import QuitCard from './QuitCard'


const QuitList = ({title,status , quits, setSelectedQuit}) => {

    const [filteredQuitsArr, setFilteredQuitsArr] = useState(
        quits.filter((quit)=>{
           return quit.status === status
        })
    ) 


    return (
        <div
            className='w-full h-full flex flex-col items-center '
        >
            <div
                className= 'w-full  '
            >
                <h2
                    className=' text-3xl  '
                >
                    {title}  
                </h2>         
            </div>
            <div
                className='w-full flex lg:gap-[2%] md:gap-[2%]  overflow-x-auto no-scrollbar  snap-x '
            >   
                {
                    filteredQuitsArr.length == 0 
                    &&
                    (
                        <div
                            className='h-40 p-5 flex justify-center items-center'
                        >
                            <i>Currently no quits in this category.</i>
                        </div>
                    )
                    
                }
                {
                    quits.map((quit, index) => {
                        
                        if(quit.status === status){
                            
                            return (
                                <QuitCard
                                    key={index}
                                    quit={quit}
                                    setSelectedQuit={setSelectedQuit}
                                />
                            )
                        }
                    })
                }
            </div>
        </div>
    )
}

export default QuitList