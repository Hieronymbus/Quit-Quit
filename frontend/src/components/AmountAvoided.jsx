import React, { useState, useEffect } from "react";

const AmountAvoided = ({ startDate, amountPerDay }) => {
  const [amountAvoided, setAmountAvoided] = useState(0);
    console.log(amountPerDay)
  useEffect(() => {

    const calculateAmountAvoided = () => {
      const start = new Date(startDate);
      const now = new Date();
      const timeDifference = now - start;
      const daysElapsed = timeDifference / (1000 * 60 * 60 * 24);
      return daysElapsed * amountPerDay;
    };

    setAmountAvoided(calculateAmountAvoided());

    const interval = setInterval(() => {
      setAmountAvoided(calculateAmountAvoided());
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, amountAvoided]);

  return (
    <div>
      {amountAvoided.toFixed(5)}
    </div>
  );
};

export default AmountAvoided;
