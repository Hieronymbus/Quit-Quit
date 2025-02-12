import React from 'react'

const Overlay = ({ onClickHandler, videoRef }) => {
  
  return (
    <div
        onClick={()=>{
          onClickHandler(false)
          document.body.classList.remove("overflow-hidden");
          if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0; // Reset to beginning
          }
        }}
        className='fixed inset-0 bg-black bg-opacity-70 z-30'
    >

    </div>
  )
}

export default Overlay