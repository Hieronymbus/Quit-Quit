import React,{useEffect, useState} from 'react'

const UsageTimeAvoided = ({startDate, timePerDay}) => {

    const [timeSaved, setTimeSaved] = useState(0);

    useEffect(() => {
    const calculateTimeSaved = () => {
        const now = new Date();
        const start = new Date(startDate);
        const elapsedTimeInHours = (now - start) / (1000 * 60 * 60 * 24); 
        return elapsedTimeInHours * timePerDay;
    };

    const interval = setInterval(() => {
        setTimeSaved(calculateTimeSaved().toFixed(5));
    }, 1000);

    return () => clearInterval(interval);
    }, [startDate, timePerDay]);

    return (
    <div>
        {timeSaved >= 0 ? timeSaved : "Quit? Not just yet. There's a solemn ceremony involved, one last glorious sacrifice to the altar of bad habbits. It’s tradition, after all."} 
    </div>
    );
        
}

export default UsageTimeAvoided