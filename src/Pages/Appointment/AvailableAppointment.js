import React, { useEffect, useState } from 'react'
import { format } from 'date-fns'
import AppointmentOption from './AppointmentOption'
import BookingModal from '../BookingModal/BookingModal'
import { useQuery } from '@tanstack/react-query'
import Loading from '../../Shared/Loading/Loading'

const AvailableAppointment = ({ selectedDate }) => {
    // const [appointmentOptions, setAppointmentOptions] = useState([])
    const [treatment, setTreatment] = useState(null)
    const date= format(selectedDate,'PP')
    const {data:appointmentOptions=[],isLoading,refetch } = useQuery({
        queryKey: ['appointmentOptions',date],
        queryFn: async() => {
            const res= await fetch(`http://localhost:5000/appointmentoptions?date=${date}`);
            const data = await res.json();
            return data
        }
            
    })
    if(isLoading){
        return <Loading></Loading>
    }
    
    

    // useEffect(() => {
    //     fetch('http://localhost:5000/appointmentoptions')
    //         .then(res => res.json())
    //         .then(data => setAppointmentOptions(data))
    // }, [])
    return (
        <section className='my-10'>
            <p className='text-center '><span className='text-primary font-bold'> You have selected </span> <span className='font-bold'>{format(selectedDate, 'PP')} </span> </p>
            <div className='grid gap-6 mt-9 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        option={option}
                        setTreatment={setTreatment}

                    >

                    </AppointmentOption>)
                }

            </div>
            {
                treatment && <BookingModal treatment={treatment} 
                setTreatment={setTreatment}
                selectedDate={selectedDate}
                refetch={refetch}
                 >

                </BookingModal>
            }

        </section>
    )
}

export default AvailableAppointment