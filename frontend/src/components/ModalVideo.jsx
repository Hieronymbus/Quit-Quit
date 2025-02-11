import React from 'react'

const ModalVideo = ({ setIsVideoModalOpen, isVideoModalOpen, currentQuit}) => {

  return (
        <div
            className={`${!isVideoModalOpen ? "hidden": "fixed"}  rounded-lg
            z-40 w-11/12 h-fit  pb-5 md:w-1/3 aspect-auto m-auto inset-x-0 inset-y-0 border border-gray-100 bg-slate-950  shadow-md shadow-gray-100`}
        > 
            <div
                className='flex justify-end'
            >
            <button
                onClick={() => {
                    setIsVideoModalOpen(false)
                    document.body.classList.remove("overflow-hidden");
                }}
                className='text-gray-100'
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            </div>
             
            <div
                className='h-full flex flex-col justify-center items-center'
            >
                <video 
                    className='max-h-[450px]  '
                    controls
                    src={`${import.meta.env.VITE_PORT}/${currentQuit.videoPath}`}
                />
                
            </div>
        </div>
  )
}

export default ModalVideo