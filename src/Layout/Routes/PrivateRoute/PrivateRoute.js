import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthProvider'
import Loading from '../../../Shared/Loading/Loading'

const PrivateRoute = ({children}) => {
    const {user,loading}= useContext(AuthContext)
    const location = useLocation()
    if(loading){
     <Loading> </Loading>
    }
    if (user){
        return children;
    }
  return <Navigate to='/login' state={{from:location}} replace></Navigate>

  
}

export default PrivateRoute