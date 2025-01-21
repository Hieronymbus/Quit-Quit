import React, { useEffect, useState, useRef } from 'react'
import QuitCard from './QuitCard'


const QuitList = ({title,status , quits, setSelectedQuit}) => {

    const [filteredQuitsArr, setFilteredQuitsArr] = useState(
        quits.filter((quit)=>{
           return quit.status === status
        })
    ) 
    const containerRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(null);
    const [scrollStart, setScrollStart] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);
    // let startX = 0;
    // let scrollStart = 0;
    // let dragDistance = 0;

    const handleMouseDown = (e) => {
      setIsDragging(false);
      setStartX(e.pageX - containerRef.current.offsetLeft) 
      setScrollStart(containerRef.current.scrollLeft);
      setDragDistance(0); // Reset drag distance
      console.log(startX)
      containerRef.current.style.cursor = "grabbing";
      containerRef.current.style.userSelect = "none";
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
      containerRef.current.style.cursor = "grab";
      containerRef.current.style.removeProperty("user-select");
    };

    
    return (

      <div className="w-full h-full flex flex-col items-center">
        <div className="w-full">
          <h2 className="text-3xl">{title}</h2>
        </div>
        <div className="relative w-full flex flex-col sm:flex-row items-center">
         
    
          {/* Scrollable Container */}
          <div
            ref={containerRef}
            style={{
              scrollBehavior: "smooth"
            }}
            className="w-full flex lg:gap-[2%] md:gap-[2%] overflow-x-auto no-scrollbar snap-x"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            {/* No quits message */}
            {filteredQuitsArr.length === 0 && (
              <div className="h-40 p-5 flex justify-center items-center">
                <i>Currently no quits in this category.</i>
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
          <div
            className='h-full ml-2 flex  sm:flex-col '
          >
             
            <button
              className="w-1/2  sm:h-1/2 sm:w-full p-2 bg-blue-500 text-white "
              onClick={() => {
                containerRef.current.scrollBy({
                  left: -300,
                  behavior: "smooth",
                });
              }}
            >
              ◀
            </button>
            
            <button
              className="h-1/2 p-2 bg-blue-500 text-white "
              onClick={() => {
                containerRef.current.scrollBy({
                  left: 300,
                  behavior: "smooth",
                });
              }}
            >
              ▶
            </button>
          </div>
        </div>
      </div>
      
    )
}

export default QuitList


