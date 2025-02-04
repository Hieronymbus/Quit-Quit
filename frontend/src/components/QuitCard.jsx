import React, {useEffect, useState, useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import QuitDuration from './QuitDuration.jsx';
import FormatDate from './FormatDate.jsx';
import VertElipses from '../assets/svg/VertElipses.jsx';
import clockGif from '../assets/gifs/wired-lineal-45-clock-time-loop-oscillate.gif'

import calanderPNG from '../assets/calendar.png'

const QuitCard = ({quit, number, setSelectedQuit, isDragging}) => {
  const navigate = useNavigate()
  const [bgColor, setBgColor] = useState("")
  const [isStarted, setIsStarted] = useState(false)
  const cardContainerRef = useRef()
  function handleQuitClick () {
    if (isDragging) {
      e.preventDefault();
      
    } else {
      // Navigate to the desired location
      setSelectedQuit(quit._id)
      navigate('/quitStats')
     
    }
  }
  
  useEffect(() => {

    if(quit.status === 'active'){
      setBgColor("rounded-lg shadow-md bg-gradient-to-br from-gray-100 via-blue-400 to-gray-200 hover:from-gray-200 hover:via-blue-300 hover:to-gray-300   dark:from-gray-800 dark:via-blue-900 dark:to-gray-700 transition-all duration-300 dark:hover:from-gray-700 dark:hover:via-blue-800 dark:hover:to-gray-600 ")
    } else if (quit.status === 'abandoned'){
      setBgColor("rounded-lg shadow-md bg-gradient-to-br from-gray-100 via-red-400 to-gray-200 hover:from-gray-200 hover:via-red-300 hover:to-gray-300   dark:from-gray-800 dark:via-red-900 dark:to-gray-700 transition-all duration-300 dark:hover:from-gray-700 dark:hover:via-red-800 dark:hover:to-gray-600 ")
    } else {
      setBgColor("rounded-lg shadow-md bg-gradient-to-br from-gray-100 via-green-400 to-gray-200 hover:from-gray-200 hover:via-green-300 hover:to-gray-300   dark:from-gray-800 dark:via-green-900 dark:to-gray-700 transition-all duration-300 dark:hover:from-gray-700 dark:hover:via-green-800 dark:hover:to-gray-600 ")
    }
    const startCheck =  new Date() - new Date(quit.startDate)
    if(startCheck >= 0) {
      setIsStarted(true)
    }
  },[quit])

  
  return (
    <div
      ref={cardContainerRef}
      onMouseUp={(e) => handleQuitClick(e)}
      className={` relative h-[250px] lg:w-[32%] md:w-[49%] sm:w-full w-full p-4 rounded snap-center flex flex-shrink-0 flex-col gap-3  ${bgColor} hover:cursor-pointer `}
      data-tooltip-id='cardTooltip'
      data-tooltip-content="Click to open advanced stats page"
      data-tooltip-place='bottom-start'
      data-tooltip-variant='dark'
      data-tooltip-float='true'
      data-tooltip-delay-show={500}  
    >
      <Tooltip id="cardTooltip" opacity="0.8"/>
      <div
        className="absolute top-1 left-1.5" 
      >
        <span
              className='text-sm align-top font-bold '
            >
              {number}
            </span>
      </div>
      <div
        className=' absolute right-1.5 '
      >
        <VertElipses />
      </div>
      <h1
        className='text-2xl  '
      >
        {
          quit.abandonedDate
          ?
          <div>
           
            
            {"Former quit attempt,"}
          </div>
          :
          <div>
            
            {
              isStarted 
              ? " I am currently quitting,"
              : " I am going to quit,"
            } 
          </div>
        }
        {quit.addictionTypeID.name}
      </h1>
      <div>

        {
          isStarted
          &&
          <div>
            <h2
              className='text-xl italic'
            >
              {quit.abandonedDate ? "Quit Lasted For" : "Abstinance"}
              
            </h2>
            <div
              className=' flex justify-center text-3xl  font-semibold'
            > 

              <QuitDuration startDate={quit.startDate} abandonedDate={quit.abandonedDate}/>
              {
                quit.abandonedDate ? <div></div> : <img src={clockGif} alt="animated clock"  className='h-6'/>
              }         
            </div>
          </div>
        }
        <div>
          <h2
            className='text-xl italic '
          > 
            {
              quit.abandonedDate
              ?
              <div>

                {isStarted 
                ? 
                  <div>
                    Ended on
                    <div
                      className=' text-xl  font-light text-center'
                    >
                      <FormatDate date={quit.abandonedDate} />
                    </div>
                  </div>
                : 
                  <div>
                    Quit Would have started On
                    <div
                      className=' text-xl  font-light text-center'
                    >
                      <FormatDate date={quit.startDate} />
                    </div>
                  </div>
                }
                
              </div>
              :
              <div>

                {isStarted ? "Since" : "Quit scheduled to start"}
                <div
                className=' text-xl  font-light text-center'
                >
                  <FormatDate date={quit.startDate} />
                </div>
              </div>
            }
            
          </h2> 
          
        </div>
      </div>
      
    </div>
  )
}

export default QuitCard