import React from 'react'

const Operator = ({ text, operation }) => {
  return <div 
    className="item"
    onClick={operation}
    >{ text }</div>
}

export default Operator