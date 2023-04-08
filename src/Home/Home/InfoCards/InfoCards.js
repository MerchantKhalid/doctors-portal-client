import React from 'react'
import clock from '../../../assets/icons/clock.svg'
import marker from '../../../assets/icons/marker.svg'
import phone from '../../../assets/icons/phone.svg'
import InfoCard from './InfoCard'

const InfoCards = () => {

    const cardData=[
        {
            id:1,
            name:'Opening Hours',
            description:'Open at 9am to 5pm',
            bgClass:'bg-gradient-to-r from-primary to-secondary',
            icon:clock
        },
        {
            id:2,
            name:'Location',
            description:'22 Rue Des Muguets,Saint denis',
            bgClass:'bg-accent',
            icon:marker
        },
        {
            id:3,
            name:'Contact Us',
            description:'+351920102458',
            bgClass:'bg-gradient-to-r from-primary to-secondary',
            icon:phone
        },
    ]
  return (
    <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-32'>
        {
            cardData.map(card=><InfoCard
            key={card.id}
            card={card}
            ></InfoCard>)
        }

    </div>
  )
}

export default InfoCards