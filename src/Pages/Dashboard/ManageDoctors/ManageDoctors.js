import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal'
import Loading from '../../../Shared/Loading/Loading'

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null)
    const { data: doctors = [], isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization: `bearer ${localStorage.getItem('accessToken')}`
                    }

                })
                const data = await res.json()
                return data;

            } catch (error) {

            }

        }
    })
    if (isLoading) {
        return <Loading></Loading>
    }

    const closeModal = () => {
        setDeletingDoctor(null)
    }

    const handleDeleteDoctor = doctor => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },

        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch()
                    toast.success(`Dr.${doctor.name} deleted successfully`)
                }
            })

    }

    return (
        <div>
            <h2 className='text-2xl text-primary font-bold mb-10'>Manage Doctors</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Specialty</th>
                            <th>Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, i) => <tr
                                key={doctor._id}
                            >
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={doctor.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{doctor.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {doctor.email}
                                </td>
                                <td>{doctor.specialty}</td>
                                <th>
                                    <label onClick={() => setDeletingDoctor(doctor)} htmlFor="confirmation-modal" className="btn btn-error btn-xs">Delete</label>

                                </th>
                            </tr>)
                        }
                        <tr></tr>
                    </tbody>



                </table>
            </div>
            {
                deletingDoctor && <ConfirmationModal
                    title={'It will be delete permanently!'}
                    message={`Do you want to delete Dr.${deletingDoctor.name}`}
                    closeModal={closeModal}
                    successAction={handleDeleteDoctor}
                    modalData={deletingDoctor}
                ></ConfirmationModal>
            }
        </div>
    )
}

export default ManageDoctors