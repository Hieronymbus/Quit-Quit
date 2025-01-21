import React from 'react'

const ModalVideo = ({ setIsVideoModalOpen, isVideoModalOpen, currentQuit}) => {


  return (
        <div
            className={`${!isVideoModalOpen ? "hidden": "fixed"}  rounded-lg
            z-20 w-11/12 sm:h-2/4 aspect-square m-auto inset-x-0 inset-y-0 border border-gray-100 bg-slate-950  shadow-lg shadow-gray-100`}
        > 
            <div
            className='flex justify-end'
            >
            <button
                onClick={() => setIsVideoModalOpen(false)}
                className='text-gray-100'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            </div>
             
            <div
                className=' flex flex-col items-center gap-5'
            >
                <video 
                    className='rounded-xl  '
                    controls
                    src={`https://quitforealtho.onrender.com/${currentQuit.videoPath}`}
                />
                <h3
                    className='text-2xl text-gray-100 ' 
                >
                    Message from past you..
                </h3>        
            </div>
        </div>
  )
}

export default ModalVideo