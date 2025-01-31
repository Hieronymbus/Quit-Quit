import React from 'react'

const Overlay = ({onClickHandler}) => {
  
  return (
    <div
        onClick={()=>onClickHandler(false)}
        className='fixed inset-0 bg-black bg-opacity-70 z-30'
    >

    </div>
  )
}

export default Overlay