import React from 'react'
import './Button.css'

const Button = ({ className, children, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  )
}

export default Button
