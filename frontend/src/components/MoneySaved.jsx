import React, { useEffect, useState } from 'react';


const MoneySaved = ({startDate, cupsPerDay, costPerCup}) => {
  
  const [moneySaved, setMoneySaved] = useState(0);

  useEffect(() => {
    const calculateMoneySaved = () => {

      const currentDate = new Date();

      const start = new Date(startDate);

      const timeDiff = currentDate - start;

      const daysPassed = timeDiff / (1000 * 3600 * 24);

      const totalCupsAvoided = daysPassed * cupsPerDay;

      const totalMoneySaved = totalCupsAvoided * costPerCup;

      setMoneySaved(totalMoneySaved.toFixed(2));  
    };

    calculateMoneySaved();

    const interval = setInterval(calculateMoneySaved, 60000);

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);

  }, [startDate, cupsPerDay, costPerCup]);

  return (
    <div>
      {moneySaved >= 0 ? moneySaved + "$" : "The quit has yet to begin, so the money saved remains precisely where it was—nowhere."}
    </div>
  );



}

export default MoneySaved