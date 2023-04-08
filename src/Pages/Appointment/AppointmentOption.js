import React from 'react'

const AppointmentOption = ({ option,setTreatment}) => {
    const {name,slots,price}=option
    return (
        <div className="card  bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-center text-secondary text-2xl font-bold">{name}</h2>
                <p>{slots.length>0 ? slots[0]: <span className='text-red-600 font-bold'>Try Another Date</span>} </p>
                <p>{slots.length} {slots.length>1?'spaces':'space'} available</p>
                <p className='text-secondary font-bold'>Price:${price}</p>
                <div className="card-actions justify-center">
                    
                    <label htmlFor="booking-modal" disabled={slots.length===0} onClick={()=>setTreatment(option)}
                     className='btn bg-gradient-to-r from-primary to-secondary text-white border-none'>Book Appointment</label>
                </div>
            </div>
        </div>
    )
}

export default AppointmentOption