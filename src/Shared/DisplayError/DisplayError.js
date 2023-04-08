import React, { useContext } from 'react'
import { useRouteError } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthProvider'

const DisplayError = () => {
    const error= useRouteError()
    const {user,logOut}= useContext(AuthContext)
  const handleSignout=()=>{
    logOut()
    .then(()=>{})
    .catch(error=>console.log(error))
  }
  return (
    <div>
        <p className='text-red-500'>Something went wrong</p>
        <p className='text-red-500'>{error.statusText || error.message}</p>
        <h3 className='text-2xl mt-10'>Please <button className='btn btn-accent' onClick={handleSignout}>Sign out</button> and login back</h3>
     </div>
  )
}

export default DisplayError