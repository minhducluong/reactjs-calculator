import React from 'react'

const Input = ({ value, updateDisplay, position }) => {
  return <div 
    className={position ? "item " + position : "item"}
    onClick={() => updateDisplay(value)}
    >{ value }</div>
}

export default Input