'use client'
import React from 'react';
import Hero from './Hero';
import Reviews from './Reviews';
import TechSkills from './TechSkills';
import UpcomingEvents from './UpcomingEvents';
import FAQs from './FAQs';
import Partners from './Partners';

const Home = () => {
    return (
        <div className='w-full h-full'>
            <Hero/>
            <TechSkills/>
            <UpcomingEvents/>
            {/* <Partners/> */}
            <Reviews/>
            <FAQs/>
        </div>
    )
}

export default Home;