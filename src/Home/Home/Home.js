import React from 'react';
import MakeAppointment from '../../Pages/MakeAppointment/MakeAppointment';
import Services from '../../Pages/Services/Services';
import Testimonials from '../../Pages/Testimonials/Testimonials';
import Footer from '../../Shared/Footer/Footer';
import Banner from './Banner/Banner';
import InfoCards from './InfoCards/InfoCards';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <InfoCards></InfoCards>
            <Services></Services>
            <MakeAppointment></MakeAppointment>
            <Testimonials></Testimonials>
            
        </div>
    );
};

export default Home;