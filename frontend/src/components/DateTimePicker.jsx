import React, { useState } from 'react';


///
const DateTimePicker = ({ onChange }) => {
  const [dateTime, setDateTime] = useState('');

  const handleNowButtonClick = () => {
    const now = new Date();

    // Adjust for New Zealand time zone
    const nzDate = new Date(now.toLocaleString('en-US', { timeZone: 'Pacific/Auckland' }));

    // Format the date and time as YYYY-MM-DDTHH:mm (required for datetime-local)
    const year = nzDate.getFullYear();
    const month = (nzDate.getMonth() + 1).toString().padStart(2, '0'); // month is 0-based
    const day = nzDate.getDate().toString().padStart(2, '0');
    const hours = nzDate.getHours().toString().padStart(2, '0');
    const minutes = nzDate.getMinutes().toString().padStart(2, '0');

    // Combine into the format YYYY-MM-DDTHH:mm
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    setDateTime(formattedDateTime);
    onChange(formattedDateTime)
  };

  return (
    <div>
      <input
        className="block w-full p-2 pl-3 border border-gray-300 rounded-t-md rounded-br-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500 dark:text-slate-700"
        id='startDateInput'
        type="datetime-local"
        value={dateTime}
        onChange={(e) => onChange(e)}
      />
      <button 
        className="p-2 px-4 text-md  rounded-b-3xl bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-sm shadow-black transform transition-transform duration-150 hover:shadow-md hover:shadow-black active:shadow-sm hover:translate-y-0.5 active:translate-y-2"
        type='button'
        onClick={handleNowButtonClick} 
        
      >
        Use Now as start time
      </button>
    </div>
  );
};

export default DateTimePicker;
