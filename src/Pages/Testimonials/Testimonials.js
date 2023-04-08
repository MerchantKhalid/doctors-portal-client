import React from 'react'
import quote from '../../assets/icons/quote.svg'
import people1 from '../../assets/images/people1.png'
import people2 from '../../assets/images/people2.png'
import people3 from '../../assets/images/people3.png'
import Review from './Review'
const Testimonials = () => {
 const reviews = [
    {
        _id:1,
        name:'Khalid',
        userReview:'A user review is a review conducted by any person who has access to the internet and publishes their experience to a review site or social media platform following product testing',
        location:'Lisbon',
        img:people1

    },
    {
        _id:2,
        name:'Hasan',
        userReview:'A user review is a review conducted by any person who has access to the internet and publishes their experience to a review site or social media platform following product testing',
        location:'Paris',
        img:people2

    },
    {
        _id:3,
        name:'Merchant',
        userReview:'A user review is a review conducted by any person who has access to the internet and publishes their experience to a review site or social media platform following product',
        location:'Dhaka',
        img:people3

    }
 ]

  return (
    <section className='mt-16'>
        <div className='flex justify-between'>
            <div>
                <h2 className='text-xl text-primary font-bold'>Testimonials</h2>
                <h3 className='text-3xl font-bold '>What our patient says</h3>
            </div>
            <img className='w-24 lg:w-32' src={quote}></img>

        </div>
        <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16'>
            {
                reviews.map(review=><Review
                    key={review._id}
                    review={review}
                ></Review>)
            }

        </div>
    </section>
  )
}

export default Testimonials