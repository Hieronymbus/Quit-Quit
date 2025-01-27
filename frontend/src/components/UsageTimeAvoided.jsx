import { set } from 'mongoose';
import React,{useEffect, useState} from 'react'

const UsageTimeAvoided = ({startDate, abandonedDate, timePerDay}) => {

    const [timeSaved, setTimeSaved] = useState("");

    useEffect(() => {
    const calculateTimeSaved = () => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(abandonedDate);
        let elapsedTimeInHours ;
        if(abandonedDate) {
            elapsedTimeInHours = (end - start) / (1000 * 60 * 60 * 24); 
        } else {

            elapsedTimeInHours = (now - start) / (1000 * 60 * 60 * 24); 
        }
        return elapsedTimeInHours * timePerDay;
    };

    formatTimeSaved(calculateTimeSaved())
    const interval = setInterval(() => { 
        formatTimeSaved(calculateTimeSaved())
    }, 1000);

    return () => clearInterval(interval);
    }, [startDate, timePerDay, abandonedDate]);

    function formatTimeSaved (elapsedHours) {
            const days = Math.floor(elapsedHours  / 24);
            const hours = Math.floor(elapsedHours % 24);
            const minutes = Math.floor((elapsedHours * 60) % 60);
            const seconds = Math.floor((elapsedHours * 3600) % 60);
            if(elapsedHours >= 0) {

                setTimeSaved(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeSaved("Quit? Not just yet. There's a solemn ceremony involved, one last glorious sacrifice to the altar of bad habbits. It’s tradition, after all.")
            }
      }

    return (
    <div>
        {
            timePerDay == 0
            ?
            <div>
                Well done on starting the journey to quit a habit that, despite being suspiciously instantaneous and not stealing your time, might have quietly sapped your vitality, like a gremlin with a hidden agenda.
            </div>
            :
            <div>
                {timeSaved}
            </div>
        }
        
    </div>
    );
        
}

export default UsageTimeAvoided