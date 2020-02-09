import React from 'react'
import './Screen.css'

const Screen = ({ display, fadeEffect }) => {
  return (
    <div className="Screen top-left">
      <div className={fadeEffect ? "fadeEffect" : ""}>{ display }</div>
    </div>
  )
}

export default Screen