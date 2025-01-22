import React, {useState} from 'react'
import Overlay from './Overlay';

const CardMilestone = ({goalAchieved,description,title}) => {
  
    const [isMilestoneClicked, setIsMilestoneClicked] = useState(false);

    const handleMilestoneClick = () =>  {
        setIsMilestoneClicked(!isMilestoneClicked)
    }

    return (
            <div 
                className={
                    `   p-2 rounded-xl hover:cursor-pointer
                    ${goalAchieved ? "bg-green-500 dark:bg-green-700 border-4 border-yellow-600" : "bg-slate-300 dark:bg-slate-500 border-4 border-slate-700"} 
                    overflow-auto `}
                onClick={handleMilestoneClick}
            > 
                <div
                    className='flex flex-col justify-between items-center gap-2'
                >
                    <h2 className='text-center text-2xl'>
                    {title} 
                    </h2> 
                    {
                    goalAchieved 
                    ?
                    <div
                        className='flex'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                        </svg>
                        <h2>
                            Completed
                        </h2>
                    </div>
                    :
                    <div>
                            Not reached
                    </div>
                    }
                    
                </div>
                {
                    isMilestoneClicked
                    &&
                    <div
                        className='bg-inherit border-inherit'
                    >

                        <Overlay />
                        <div 
                            className=' p-2 m-4  md:m-auto md:w-1/2 fixed top-20 inset-x-0 bg-inherit rounded-xl border-4 border-inherit '
                        >   
                        <div
                            className='flex flex-col items-center'
                        >

                        <h2 className='text-center text-2xl'>
                            {title} 
                        </h2> 
                        {
                            goalAchieved 
                            ?
                            <div
                                className='flex'
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                                </svg>
                                <h2>
                                    Completed
                                </h2>
                            </div>
                            :
                            <div>
                                    Not reached
                            </div>
                        }
                        </div>
                            <p
                                className='mt-2 max-h-[60vh] text-lg  prose whitespace-pre-line overflow-auto'
                            >

                                {description}
                            </p>
                        </div>
                    </div>
                }
            </div>
            )
}

export default CardMilestone