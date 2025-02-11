import React, { useEffect, useState, useRef } from 'react'
import QuitCard from './QuitCard'
import { useNavigate } from 'react-router-dom'
import rocketPNG from '../assets/rocket.png'
import yachtPNG from '../assets/yacht.png'
import crashPNG from '../assets/helicopter.png'

const QuitList = ({title,status , quits, setSelectedQuit}) => {

    const [filteredQuitsArr, setFilteredQuitsArr] = useState(
        
      quits.filter((quit)=>{
           return quit.status === status
        }).sort((quit)=> {
          if(status === 'Action-Phase' || status === "Maintenance-Phase"){
            return  new Date() - new Date(quit.startDate) 
          } else  {
            return new Date() - new Date(quit.abandonedDate)
          }                   
        })

    ) 
    

    const navigate = useNavigate()
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(null);
    const [scrollStart, setScrollStart] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);
    // let startX = 0;
    // let scrollStart = 0;
    // let dragDistance = 0;

    const handleMouseDown = (e) => {
      if(filteredQuitsArr.length > 3){

        setIsDragging(false);
        setStartX(e.pageX - containerRef.current.offsetLeft) 
        setScrollStart(containerRef.current.scrollLeft);
        setDragDistance(0); // Reset drag distance
        console.log(startX)
        containerRef.current.style.cursor = "grabbing";
        containerRef.current.style.userSelect = "none";
      }
    };

    const handleMouseMove = (e) => {
      if (startX == null) return; // Ignore if mouse isn't down
      const x = e.pageX - containerRef.current.offsetLeft;
      setDragDistance(Math.abs(x - startX) );
      containerRef.current.scrollLeft = scrollStart - (x - startX);
      if (dragDistance > 5) {
        
        setIsDragging(true); // Mark as dragging if distance exceeds threshold
      }
      
      
    };

    const handleMouseUpOrLeave = () => {
      setStartX(null);
      if(filteredQuitsArr.length > 3){
        containerRef.current.style.cursor = "grab";
      }
      
      containerRef.current.style.removeProperty("user-select");
    };

    
    return (

      <div className="w-full h-full flex flex-col items-center mb-10 sm:mb-0">
        <div className="w-full mb-2 mt-[16px]">
        <h2 className="relative text-3xl text-center text-blue-600 dark:text-blue-400 flex items-center justify-center">
          <img 
            src={title === 'Action Phase' ? rocketPNG : title === 'Maintenance' ? yachtPNG : crashPNG} 
            className="size-9 mr-2 " 
            alt="Phase Icon"
          />
          <span>{title}</span>  
          <img 
            src={title === 'Action Phase' ? rocketPNG : title === 'Maintenance' ? yachtPNG : crashPNG} 
            className="size-9 ml-2" 
            alt="Phase Icon"
          />
        </h2>
          <h3
            className='text-xl font-mono text-center'
          >
            count : {filteredQuitsArr.length}
          </h3>
        </div>
        <div className={`relative h-[270px] w-full flex flex-col sm:flex-row items-center py-2 pl-2 pr-2 ${filteredQuitsArr.length > 2 && 'sm:pr-0 lg:pr-2'} ${filteredQuitsArr.length > 2 && 'sm:pr-0 lg:pr-2'} rounded-md bg-slate-300 dark:bg-slate-500`}>       
          {/* Scrollable Container */}
          <div
            ref={containerRef}
            style={{
              scrollBehavior: "smooth"
            }}
            className="w-full flex lg:gap-[2%] md:gap-[2%] rounded-t-lg overflow-x-auto no-scrollbar snap-x  "
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            onMouseEnter={()=>{
              if(filteredQuitsArr.length > 3){
                containerRef.current.style.cursor = "grab";
              }
            }}
          >
            {/* No quits message */}
            {filteredQuitsArr.length === 0 && (
              <div className="h-[250px] w-full p-5 flex justify-center items-center text-center">
                <i>
                  Currently no quits in this category.<i> </i> 
                  {
                    title === "Action Phase"
                    &&
                    <i>
                       To start a new quit click the <b className='underline text-blue-400 cursor-pointer' onClick={() => navigate("/addQuit")}>here</b>
                    </i>
                  }
                </i>
                
                  
                
              </div>
            )}
            {/* Quit cards */}
            {
                filteredQuitsArr.map((quit, index) => {
                    
                    if(quit.status === status){
                        return (
                            <QuitCard
                                key={index} 
                                number={index + 1}                              
                                quit={quit}
                                isDragging={isDragging}
                                setSelectedQuit={setSelectedQuit}
                            />
                        )
                    }
                })
            }
            
          </div>
            {
              filteredQuitsArr.length > 3
              &&
              <div
                className=' hidden ml-2 sm:flex sm:h-[270px] w-full sm:w-fit  sm:flex-col rounded-b-lg'
              >
                <button
                  className="w-1/2 order-1 sm:h-1/2 sm:w-full p-2 rounded-tr-lg bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-800 dark:bg-slate-700 dark:text-white "
                  onClick={() => {
                    containerRef.current.scrollBy({
                      left: 300,
                      behavior: "smooth",
                    });
                  }}
                >
                  ▶
                </button>
                <button
                  className="w-1/2 order-2 sm:h-1/2 sm:w-full p-2 rounded-br-lg  bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-800 dark:bg-slate-700 dark:text-white "
                  onClick={() => {
                    containerRef.current.scrollBy({
                      left: -300,
                      behavior: "smooth",
                    });
                  }}
                >
                  ◀
                </button>
              </div>
            }
            {
              filteredQuitsArr.length > 2
              &&
              <div
                className=' hidden md:flex ml-2 lg:hidden sm:h-[270px] w-full sm:w-fit  sm:flex-col rounded-b-lg'
              >
                <button
                  className="w-1/2 order-2 sm:order-1 sm:h-1/2 sm:w-full p-2 rounded-rb-lg bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-800 dark:bg-slate-700 dark:text-white "
                  onClick={() => {
                    containerRef.current.scrollBy({
                      left: 300,
                      behavior: "smooth",
                    });
                  }}
                >
                  ▶
                </button>
                <button
                  className="w-1/2 order-1 sm:order-2 sm:h-1/2 sm:w-full p-2 rounded-l-lg sm:rounded-l-none sm:rounded-r-lg bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-800 dark:bg-slate-700 dark:text-white "
                  onClick={() => {
                    containerRef.current.scrollBy({
                      left: -300,
                      behavior: "smooth",
                    });
                  }}
                >
                  ◀
                </button>
              </div>
            }
            {
              filteredQuitsArr.length >= 0
              &&
              <div
                className='absolute -bottom-9 sm:h-[250px] sm:hidden w-full sm:w-fit  flex sm:flex-col rounded-b-lg'
              >
                <button
                  className="w-1/2 order-2 sm:order-1 sm:h-1/2 sm:w-full p-2 rounded-br-lg bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-800 dark:bg-slate-700 dark:text-white "
                  onClick={() => {
                    containerRef.current.scrollBy({
                      left: 335,
                      behavior: "smooth",
                    });
                  }}
                >
                  ▶
                </button>
                <button
                  className="w-1/2 order-1 sm:order-2 sm:h-1/2 sm:w-full p-2 rounded-bl-lg sm:rounded-l-none sm:rounded-r-lg bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-800 dark:bg-slate-700 dark:text-white "
                  onClick={() => {
                    containerRef.current.scrollBy({
                      left: -335,
                      behavior: "smooth",
                    });
                  }}
                >
                  ◀
                </button>
              </div>
            }      
        </div>
      </div>
      
    )
}

export default QuitList


