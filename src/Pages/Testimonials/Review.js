import React from 'react'

const Review = ({review}) => {
    const {userReview,location,img,name}=review
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                
                <p>{userReview}</p>
                 <div className='w-32'>
                    <div className='flex justify-between'>
                        <img className='mr-2' src={img}></img>
                        <div className='mt-5'>
                        <p className='font-bold'>{name}</p>
                        <p>{location}</p>
                        </div>
                        
                    </div>

                 </div>
            </div>
        </div>
    )
}

export default Review