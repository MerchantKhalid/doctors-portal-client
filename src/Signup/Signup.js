import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'
import useToken from '../hooks/useToken'

const Signup = () => {
  const { register, handleSubmit,formState:{errors} } = useForm()
  const {createUser,updateUser}= useContext(AuthContext)
  const [signupError,setSignupError]= useState('')
  const [createdUserEmail,setCreatedUserEmail]= useState('')
  const [token]= useToken(createdUserEmail)
  const navigate = useNavigate()

  if(token){
    navigate('/')
  }

  const handleSignup = (data) => {
    setSignupError('')
    createUser(data.email,data.password)
    .then(result=>{
      const user=result.user
      console.log(user)
      toast.success('User Created Successfully')
      const userInfo={
            displayName:data.name
      }
      updateUser(userInfo)
        .then(()=>{
          saveUser(data.name,data.email)
        })
        .catch(error=>console.log(error))
    })
    .catch(error=>{
      console.log(error)
      setSignupError(error.message)
    })

  }
  const saveUser=(name,email)=>{
    const user ={name,email}
    fetch('http://localhost:5000/users',{
      method:'POST',
      headers:{
        'content-type':'application/json'
      },
      body:JSON.stringify(user)

    })
    .then(res=>res.json())
    .then (data=>{
      setCreatedUserEmail(email)
      
    })
  }

  

  return (
    <div className='h-[800px] flex justify-center items-center'>
      <div className='w-96 p-5 shadow-xl'>
        <h2 className='text-4xl text-center font-bold'>Signup</h2>

        {/* React Hook Form */}
        <form onSubmit={handleSubmit(handleSignup)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type='text' {...register('name', {
              required: 'Name is required'
            })} className="input input-bordered w-full max-w-xs"></input>
              {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">E-mail</span>
            </label>
            <input type='email' {...register('email',{
              required:'E-mail is required'
            })} className="input input-bordered w-full max-w-xs"></input>
              {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input type='password' {...register('password',{
              required:'Password is required',
              minLength:{value:6}
            })} className="input input-bordered w-full max-w-xs"></input>
            {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}


          </div>
          <input type="submit" value="Signup" className='btn btn-accent w-full mt-5'></input>
            {signupError && <p className='test-red-500'>{signupError} </p>}
        </form>
        <p className='mt-3'>Already have an account?<Link className='text-secondary' to="/login"> Please Login</Link></p>
        <div className='divider'>OR</div>
        <button className='mt-3 w-full btn btn-outline bordered-full'>CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  )
}

export default Signup