// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
// import React from "react";
// import { useLoaderData } from "react-router-dom";
// import CheckoutForm from "./CheckoutForm";

// const Payment = () => {
//   const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);
//   console.log(stripePromise);
//   const booking = useLoaderData();
//   const { price, treatment, slot, appointmentDate } = booking;
//   console.log("booking", booking);
//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-accent">
//         Payment for {booking.treatment}
//       </h2>
//       <h2 className="text-xl font-bold text-accent">
//         Please pay ${price} euro for your appointment on {appointmentDate} at
//         {slot}
//       </h2>
//       <div className="w-96 mt-10">
//         <Elements stripe={stripePromise}>
//           <CheckoutForm 
//             booking={booking}
//           />
//         </Elements>
//       </div>
//       <button className="btn btn-xs btn-primary text-white mt-8">Pay Now</button>
//     </div>
//   );
// };

// export default Payment;


import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';



const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY);


const Payment = () => {
    const booking = useLoaderData();
    // const navigation = useNavigation();
    const { treatment, price, appointmentDate, slot } = booking;
    // if(navigation.state === "loading"){
    //     return <Loading></Loading>
    // }
    return (
        <div>
            <h3 className="text-3xl">Payment for {treatment}</h3>
            <p className="text-xl">Please pay <strong>${price}</strong> for your appointment on {appointmentDate} at {slot}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
            {/* <button className="btn btn-xs btn-primary text-white mt-8">Pay Now</button> */}
        </div>
    );
};

export default Payment;
