import React, { useState, useEffect } from "react";

const AmountAvoided = ({ startDate, abandonedDate, amountPerDay }) => {
  const [amountAvoided, setAmountAvoided] = useState(0);
  
  useEffect(() => {

    const calculateAmountAvoided = () => {
      const start = new Date(startDate);
      const now = new Date();
      const end = new Date(abandonedDate);
      let timeDifference;

      if(abandonedDate){
        timeDifference = end - start;
      } else { 
        timeDifference = now - start;
      }
      
      const daysElapsed = timeDifference / (1000 * 60 * 60 * 24);
      return daysElapsed * amountPerDay;
    };

    setAmountAvoided(calculateAmountAvoided());

    const interval = setInterval(() => {
      setAmountAvoided(calculateAmountAvoided());
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, abandonedDate, amountPerDay]);

  return (
    <div>
      {amountAvoided >= 0 ? amountAvoided.toFixed(5) : "The quit hasn’t begun. One does not simply storm the gates of self-control without a final feast in the Great Hall of Poor Decisions."}
    </div>
  );
};

export default AmountAvoided;
