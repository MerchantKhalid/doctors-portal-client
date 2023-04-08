import React from 'react'
import fluoride from '../../assets/images/fluoride.png'
import cavity from '../../assets/images/cavity.png'
import whitening from '../../assets/images/whitening.png'
import Service from './Service'


const Services = () => {
    const services = [
        {
            id:1,
            name:'Fluoride Treatment',
            description:'Fluoride joins the tooth structure when your teeth develop, thus strengthening the teeth enamel making them less susceptible to bacteria and cavities.',
            icon:fluoride
        },
        {
            id:2,
            name:'Cavity Feeling',
            description:' Fillings are made of various materials, such as tooth-colored composite resins, porcelain or dental amalgam that is a combination of several materials',
            icon:cavity
        },
        {
            id:3,
            name:'Whitening',
            description:'The most common ingredients used in bleaching are carbamide peroxide and hydrogen peroxide, which are used at different concentrations depending on the products or regimens used',
            icon:whitening
        },
    ]
  return (
    <div className='mt-32 text-center'>
        <div>
            <h3 className='text-primary text-2xl font-bold'>Our Services</h3>
            <h2 className='font-bold text-xl md:text-3xl lg:text-4xl'>Service We Provide </h2>

        </div>
        <div className='mt-16 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                services.map(service=><Service
                    key={service.id}
                    service={service}
                >

                </Service>)
            }

        </div>
    </div>
  )
}

export default Services