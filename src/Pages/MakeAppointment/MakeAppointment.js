import React from 'react'
import doctor from '../../assets/images/doctor.png'
import appointment from '../../assets/images/appointment.png'
import PrimaryButton from '../../Shared/PrimaryButton/PrimaryButton'

const MakeAppointment = () => {
    return (
        <div style={{background:`url(${appointment})`}} className="hero mt-32">
            <div className="hero-content flex-col lg:flex-row">
                <img src={doctor} className="lg:w-1/2 hidden lg:block rounded-lg -mt-32" />
                <div>
                    <h1 className="text-5xl text-primary font-bold">Appointment</h1>
                    <h1 className="text-3xl mt-2 text-white font-bold">Make an Appointment Today</h1>
                    <p className="py-6 text-white">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <PrimaryButton>Appointment</PrimaryButton>
                </div>
            </div>
        </div>
    )
}

export default MakeAppointment