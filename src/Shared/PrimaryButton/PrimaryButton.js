import React from 'react'

const PrimaryButton = ({children}) => {
  return (
    <button className='btn bg-gradient-to-r from-primary to-secondary'>{children}</button>
  )
}

export default PrimaryButton