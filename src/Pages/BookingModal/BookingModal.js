import { format } from 'date-fns';
import React, { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { AuthContext } from '../../contexts/AuthProvider';

// const BookingModal = ({ treatment, setTreatment, selectedDate }) => {
//     const { name:treatmentName, slots } = treatment;
//     const date = format(selectedDate, 'PP')
//     const { user } = useContext(AuthContext)

// const handleBooking = event => {
//     event.preventDefault()

//     const form = event.target;
//     const slot = form.slot.value;
//     const name = form.name.value;
//     const email = form.email.value;
//     const phone = form.phone.value;
//     const booking = {
//         appointmentDate: date,
//         treatment: treatmentName,
//         patient: name,
//         email,
//         slot,
//         phone
//     }
//     fetch('http://localhost:5000/booking', {
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         },
//         body: JSON.stringify(booking)
//     })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             if (data.acknowledged) {
//                 setTreatment(null)
//                 toast.success(`Your booking confirmed`)
//             }

//         })
// }


const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
    // treatment is just another name of appointmentOptions with name, slots, _id
    const { name: treatmentName, slots,price } = treatment;
    const date = format(selectedDate, 'PP');
    const { user } = useContext(AuthContext);

   

    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appointmentDate: date,
            treatment: treatmentName,
            patient: name,
            slot,
            email,
            phone,
            price
        } 

        // TODO: send data to the server
        // and once data is saved then close the modal 
        // and display success toast
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.acknowledged) {
                    setTreatment(null);
                    toast.success('Booking confirmed'); 
                    refetch()   
                }
                else{
                    toast.error(data.message);
                    setTreatment(null)
                }
            })

    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Booking for {treatmentName}</h3>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-6 mt-6 ml-16'>
                        <input type="text" disabled value={date} className="input input-bordered w-full max-w-xs" />
                        <select name='slot' className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot, i) => <option
                                    key={i}
                                    value={slot}
                                >{slot} </option>)
                            }
                        </select>
                        <input type="text" name='name' defaultValue={user?.displayName} placeholder="Name" className="input input-bordered w-full max-w-xs" />
                        <input type="email" name='email' defaultValue={user?.email} placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        <input type="text" name='phone' placeholder="phone" className="input input-bordered w-full max-w-xs" />

                        <input type='submit' className="btn btn-accent w-full max-w-xs" value='Submit' />
                    </form>

                </div>
            </div>
        </>
    );
};

export default BookingModal;