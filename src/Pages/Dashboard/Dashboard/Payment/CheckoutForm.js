
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({booking}) => {
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

   const stripe = useStripe();
  
  const elements = useElements();
  const { price, email, patient, _id } = booking;
  const navigate= useNavigate()

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
    setProcessing(true)
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
      
        const payment={
          price,
          transactionId:paymentIntent.id,
          email,
          bookingId:_id

        }
      fetch("http://localhost:5000/payments",{
        method:'POST',
        headers:{
          'content-type':'application/json',
          authorization:`bearer ${localStorage.getItem('accessToken')}`
        },
        body:JSON.stringify(payment)
      })
      .then(res=>res.json())
      .then(data=>{
        if(data.insertedId){
          setSuccess('Payment hasbeen successfully done')
          setTransactionId(paymentIntent.id)
          navigate('/dashboard')
        }
      })

    }
    setProcessing(false)
  
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
        <button className="mt-5 btn btn-xs btn-primary text-white" type="submit" disabled={!stripe || !clientSecret || processing}>
          Pay Now
        </button>
      </form>
      <p className="text-red-500">{cardError}</p>
      {
        success && <div> 
            <p className="text-green-500">{success} </p>
            <p>Your transaction Id is <span className="font-bold text-accent">{transactionId} </span></p>
        </div>
      }
    </div>
  );
};

export default CheckoutForm;
