// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import React, { useEffect, useState } from "react";

// const CheckoutForm = ({ booking }) => {
//   const [cardError, setCardError] = useState("");
//   const [clientSecret, setClientSecret] = useState("");
//   const stripe = useStripe();
//   const elements = useElements();
//   const { price,email,patient } = booking;

//   useEffect(() => {
//     fetch("http://localhost:5000/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         authorization: `bearer ${localStorage.getItem("accessToken")}`,
//       },
//       body: JSON.stringify({ price }),
//     })
//       .then((res) => res.json())
//       .then((data) => setClientSecret(data.clientSecret));
//   }, [price]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);

//     if (card == null) {
//       return;
//     }
//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });
//     if (error) {
//       console.log(error);
//       setCardError(error.message);
//     } else {
//       setCardError("");
//     }

//     const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(
//       clientSecret ,
//       {
//         payment_method: {
//           card: card,
//           billing_details: {
//             name: patient,
//             email:email
//           },
//         },
//       },
//     );
//     if(confirmError){
//       setCardError(confirmError.message)
//       return;
//     }
//     console.log('paymentIntent',paymentIntent)

//   };
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                 },
//               },
//               invalid: {
//                 color: "#9e2146",
//               },
//             },
//           }}
//         />
//         <button type="submit" disabled={!stripe || !clientSecret}>
//           Pay
//         </button>
//       </form>
//       <p className="text-red-500">{cardError}</p>
//     </div>
//   );
// };

// export default CheckoutForm;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({booking}) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

   const stripe = useStripe();
  
  const elements = useElements();
  const { price, email, patient, _id } = booking;

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError("");
    }
   
    setSuccess('')
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patient,
            email: email,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if(paymentIntent.status==="succeeded"){
      setSuccess('Payment hasbeen successfully done')
      setTransactionId(paymentIntent.id)

    }
  
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button className="mt-5 btn btn-xs btn-primary text-white" type="submit" disabled={!stripe || !clientSecret}>
          Pay Now
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
    </div>
  );
};

export default CheckoutForm;
