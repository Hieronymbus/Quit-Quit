import React, { useEffect, useState } from 'react'

const MilestonePercent = ({ progress }) => {
  
    const radius = 40; // Circle radius
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;
    const [offset, setOffset] = useState() 
    useEffect(() => {
        if(progress){
            if(progress === 100){
                setOffset(0)
            } else{

                setOffset(circumference - (progress / 100) * circumference)
            }
        }
    },[progress])
    return (
        <div>
            {
                offset >= 0
                &&
                <div className={`relative  flex items-center justify-center`}>
                    <svg width="100" height="100" viewBox="0 0 100 100">
                    {/* Background Circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        strokeWidth={strokeWidth}
                        stroke="#ddd"
                        fill="transparent"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="50"
                        cy="50"
                        r={radius}
                        strokeWidth={strokeWidth}
                        className="stroke-blue-500"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                    />
                    </svg>
                    {/* Percentage Text */}
                    <span className={`z-20 absolute text-lg font-bold ${progress === 100 ? "text-slate-100" : "text-orange-900"} `}>{progress}%</span>
                </div>
            }
        </div>
    );
}

export default MilestonePercent