import React from 'react'
import { Tooltip } from 'react-tooltip'

import NotificationIcon from '../assets/svg/NotificationIcon'
const ButtonNotification = () => {
  return (
    <button
        className=' p-2 hidden sm:block rounded-3xl hover:bg-slate-500 dark:hover:bg-slate-800 '
        data-tooltip-id="notification-button-tooltip"
        data-tooltip-content="Show notifications"
        data-tooltip-place="bottom"
        data-tooltip-variant='dark'
        data-tooltip-delay-show={500}
    >
        <NotificationIcon />  
        <Tooltip id="notification-button-tooltip" />
    </button>
  )
}

export default ButtonNotification