import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddDoctors = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate=useNavigate()
    const imageHostKey = process.env.REACT_APP_imgbb_apiKey
    const { data: specialties, isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/specialty`)
            const data = await res.json()
            return data
        }
    })
    const handleAddDoctor = data => {

        const image = data.image[0]
        const formData = new FormData()
        formData.append('image', image)
        const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url)
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        specialty: data.specialty,
                        image: imgData.data.url
                    }

                    //save doctor info into databade
                    fetch(`http://localhost:5000/doctors`,{
                        method:'POST',
                        headers:{
                            'content-type':'application/json',
                            authorization:`bearer ${localStorage.getItem('accessToken')}`
                        },
                        body:JSON.stringify(doctor)
                    })
                    .then(res=>res.json())
                    .then(result=>{
                        console.log(result)
                        toast.success(`Dr.${data.name} added successfully`)
                        navigate('/dashboard/managedoctors')
                    })

                }
            })
    }
    return (
        <div className='w-96 p-7'>
            <h2 className='text-primary text-2xl font-bold'>Add A Doctor</h2>

            <form onSubmit={handleSubmit(handleAddDoctor)}>
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
                    <input type='email' {...register('email', {
                        required: 'E-mail is required'
                    })} className="input input-bordered w-full max-w-xs"></input>
                    {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Specialty</span>
                    </label>
                    <select {...register('specialty')} className="select select-bordered w-full max-w-xs">
                        <option disabled selected>Select Doctors Specialty</option>
                        {
                            specialties?.map(specialty => <option
                                key={specialty._id}
                                value={specialty.name}
                            >{specialty.name}</option>)
                        }

                    </select>
                </div>

                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Image</span>
                    </label>
                    <input type='file' {...register('image', {
                        required: 'img is required'
                    })} className="input input-bordered w-full max-w-xs"></input>
                    {errors.img && <p className='text-red-500'>{errors.img?.message}</p>}
                </div>
                <input type="submit" value="Add Doctor" className='btn btn-secondary w-full text-white mt-5'></input>

            </form>
        </div>
    )
}

export default AddDoctors