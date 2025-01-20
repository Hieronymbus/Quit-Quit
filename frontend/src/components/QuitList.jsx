import React, { useEffect, useState } from 'react'
import QuitCard from './QuitCard'


const QuitList = ({title,status , quits, setSelectedQuit}) => {

    const [filteredQuitsArr, setFilteredQuitsArr] = useState(
        quits.filter((quit)=>{
           return quit.status === status
        })
    ) 


    return (
        // <div
        //     className='w-full h-full flex flex-col items-center '
        // >
        //     <div
        //         className= 'w-full  '
        //     >
        //         <h2
        //             className=' text-3xl  '
        //         >
        //             {title}  
        //         </h2>         
        //     </div>
        //     <div
        //         className='w-full flex lg:gap-[2%] md:gap-[2%]  overflow-x-auto no-scrollbar  snap-x '
        //     >   
        //         {
        //             filteredQuitsArr.length == 0 
        //             &&
        //             (
        //                 <div
        //                     className='h-40 p-5 flex justify-center items-center'
        //                 >
        //                     <i>Currently no quits in this category.</i>
        //                 </div>
        //             )
                    
        //         }
        //         {
        //             quits.map((quit, index) => {
                        
        //                 if(quit.status === status){
                            
        //                     return (
        //                         <QuitCard
        //                             key={index}
        //                             quit={quit}
        //                             setSelectedQuit={setSelectedQuit}
        //                         />
        //                     )
        //                 }
        //             })
        //         }
        //     </div>
        // </div>
        <div className="w-full h-full flex flex-col items-center">
  <div className="w-full">
    <h2 className="text-3xl">{title}</h2>
  </div>
  
  <div className="relative w-full flex items-center">
    {/* Left Scroll Button */}
    <button
      className="absolute left-0 z-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
      onClick={() => {
        const scrollContainer = document.getElementById('scrollContainer');
        scrollContainer.scrollTo({
          left: scrollContainer.scrollLeft - 300, // Scroll 300px to the left
          behavior: 'smooth', // Smooth scrolling
        });
      }}
    >
      &#8249;
    </button>

    <div
      id="scrollContainer"
      className="w-full flex lg:gap-[2%] md:gap-[2%] overflow-x-auto no-scrollbar snap-x"
    >
      {filteredQuitsArr.length === 0 && (
        <div className="h-40 p-5 flex justify-center items-center">
          <i>Currently no quits in this category.</i>
        </div>
      )}
      {quits.map((quit, index) => {
        if (quit.status === status) {
          return (
            <QuitCard
              key={index}
              quit={quit}
              setSelectedQuit={setSelectedQuit}
            />
          );
        }
      })}
    </div>

    {/* Right Scroll Button */}
    <button
      className="absolute right-0 z-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
      onClick={() => {
        const scrollContainer = document.getElementById('scrollContainer');
        scrollContainer.scrollTo({
          left: scrollContainer.scrollLeft + 300, // Scroll 300px to the right
          behavior: 'smooth', // Smooth scrolling
        });
      }}
    >
      &#8250;
    </button>
  </div>
</div>

    )
}

export default QuitList

// import { useState, useRef } from "react";

// const ScrollableContainer = ({ quits, status, title, setSelectedQuit, filteredQuitsArr }) => {
//   const [isDragging, setIsDragging] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [scrollLeft, setScrollLeft] = useState(0);
//   const scrollContainerRef = useRef(null);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setStartX(e.clientX);
//     setScrollLeft(scrollContainerRef.current.scrollLeft);
//     // Prevent text selection during drag
//     e.preventDefault();
//   };

//   const handleMouseMove = (e) => {
//     if (!isDragging) return;

//     const x = e.clientX;
//     const walk = (x - startX) * 2; // Multiplier for scroll speed
//     scrollContainerRef.current.scrollLeft = scrollLeft - walk;
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   const handleMouseLeave = () => {
//     setIsDragging(false);
//   };

//   return (
//     <div className="w-full h-full flex flex-col items-center">
//       <div className="w-full">
//         <h2 className="text-3xl">{title}</h2>
//       </div>

//       <div className="relative w-full flex items-center">
//         {/* Left Scroll Button */}
//         <button
//           className="absolute left-0 z-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
//           onClick={() => {
//             const scrollContainer = scrollContainerRef.current;
//             scrollContainer.scrollTo({
//               left: scrollContainer.scrollLeft - 300,
//               behavior: "smooth",
//             });
//           }}
//         >
//           &#8249;
//         </button>

//         <div
//           ref={scrollContainerRef}
//           className="w-full flex lg:gap-[2%] md:gap-[2%] overflow-x-auto no-scrollbar snap-x"
//           onMouseDown={handleMouseDown}
//           onMouseMove={handleMouseMove}
//           onMouseUp={handleMouseUp}
//           onMouseLeave={handleMouseLeave}
//           style={{
//             scrollSnapType: "x mandatory", // Ensuring snap behavior
//             scrollBehavior: "smooth", // Ensures smooth scrolling
//           }}
//         >
//           {filteredQuitsArr.length === 0 && (
//             <div className="h-40 p-5 flex justify-center items-center">
//               <i>Currently no quits in this category.</i>
//             </div>
//           )}

//           {quits.map((quit, index) => {
//             if (quit.status === status) {
//               return (
//                 <div
//                   key={index}
//                   className="w-[300px] snap-start" // Snap to each quit card
//                 >
//                   <QuitCard quit={quit} setSelectedQuit={setSelectedQuit} />
//                 </div>
//               );
//             }
//           })}
//         </div>

//         {/* Right Scroll Button */}
//         <button
//           className="absolute right-0 z-10 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
//           onClick={() => {
//             const scrollContainer = scrollContainerRef.current;
//             scrollContainer.scrollTo({
//               left: scrollContainer.scrollLeft + 300,
//               behavior: "smooth",
//             });
//           }}
//         >
//           &#8250;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ScrollableContainer;
