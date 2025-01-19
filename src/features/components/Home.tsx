'use client'
import React from 'react';
import Hero from './Hero';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div className='w-full h-full'>
            <Hero/>
            <Reviews/>
        </div>
    )
}

export default Home