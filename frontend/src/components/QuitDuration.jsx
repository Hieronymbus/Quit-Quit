import React, {useEffect, useState} from 'react'

const QuitDuration = ({startDate, abandonedDate}) => {

    const [duration, setDuration] = useState("");

    useEffect(() => {
      const calculateDuration = () => {

        const now = new Date();
        const start = new Date(startDate);
        
        if(abandonedDate) {
          const end = new Date(abandonedDate)

          const abandonedElapsed = end - start
          if(abandonedElapsed >= 0){
            formatDuration(abandonedElapsed)
          } else {
            setDuration("It never happned :(")
          }
        } else {

          // Calculate the elapsed time in milliseconds
          const elapsed = now - start; // Correctly calculate the time difference (future-proof)
    
          if (elapsed >= 0) { // Only calculate if the quit date is in the past
            formatDuration(elapsed)
          } else {
            setDuration("Quitting is imminent, but the farewell tour isn’t complete. There are a few more indulgences that haven’t yet fulfilled their destiny."); // Display this if the quit date is in the future
          }
        }        
      }; 
      // Calculate immediately and then every second
      calculateDuration();
      const interval = setInterval(calculateDuration, 1000);
  
      return () => clearInterval(interval); // Cleanup on component unmount
    }, [startDate]);
    
    function formatDuration (elapsed) {
      const days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
          const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
          const seconds = Math.floor((elapsed / 1000) % 60);
  
          setDuration(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }

    return <div> {duration}</div>;
}

export default QuitDuration





