import React from 'react'
import chair from '../../../assets/images/chair.png'
import bg from '../../../assets/images/bg.png'

const Banner = () => {
  return (
    <div style={{ background: `url(${bg})` }} className="hero mt-16">
      <div className="hero-content flex-col lg:flex-row-reverse">

        <img src={chair} className="max-w-sm w-1/2 rounded-lg shadow-2xl" />
        <div>
          <h1 className="text-5xl font-bold">Your smile starts here</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. <br />Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti <br /> eaque aut repudiandae et a id nisi.</p>
          <button className="btn btn-primary bg-gradient-to-r from-primary to-secondary">Get Started</button>
        </div>
      </div>
    </div>
  )
}

export default Banner