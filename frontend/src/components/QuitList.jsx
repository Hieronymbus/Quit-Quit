import React, { useEffect, useState, useRef } from 'react'
import QuitCard from './QuitCard'
import { useNavigate } from 'react-router-dom'


const QuitList = ({title,status , quits, setSelectedQuit}) => {

    const [filteredQuitsArr, setFilteredQuitsArr] = useState(
        quits.filter((quit)=>{
           return quit.status === status
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

      <div className="w-full h-full flex flex-col items-center">
        <div className="w-full mb-2">
          <h2 className="text-3xl text-center">
            {title}
          </h2>
        </div>
        <div className="relative w-full flex flex-col sm:flex-row items-center p-2 rounded-md bg-slate-300 dark:bg-slate-500">
         
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
                    title === "Action-Phase"
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
                quits.map((quit, index) => {
                    
                    if(quit.status === status){
                        return (
                            <QuitCard
                                key={index}
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
                className='hidden sm:flex sm:h-[250px] w-full sm:w-fit  sm:flex-col rounded-b-lg'
              >
                <button
                  className="w-1/2 order-2 sm:order-1 sm:h-1/2 sm:w-full p-2 rounded-r-lg bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-800 dark:bg-slate-700 dark:text-white "
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
              filteredQuitsArr.length > 2
              &&
              <div
                className='hidden sm:flex md:hidden lg:hidden sm:h-[250px] w-full sm:w-fit  sm:flex-col rounded-b-lg'
              >
                <button
                  className="w-1/2 order-2 sm:order-1 sm:h-1/2 sm:w-full p-2 rounded-r-lg bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-800 dark:bg-slate-700 dark:text-white "
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
              filteredQuitsArr.length > 1
              &&
              <div
                className='sm:h-[250px] sm:hidden w-full sm:w-fit  flex sm:flex-col rounded-b-lg'
              >
                <button
                  className="w-1/2 order-2 sm:order-1 sm:h-1/2 sm:w-full p-2 rounded-r-lg bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-800 dark:bg-slate-700 dark:text-white "
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
                  className="w-1/2 order-1 sm:order-2 sm:h-1/2 sm:w-full p-2 rounded-l-lg sm:rounded-l-none sm:rounded-r-lg bg-slate-400 hover:bg-slate-500 dark:hover:bg-slate-800 dark:bg-slate-700 dark:text-white "
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


