import React from 'react'

const FormatDate = ({date}) => {


    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString(navigator.language || 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
      }

  return (
    <div>{formatDate(date)}</div>
  )
}

export default FormatDate