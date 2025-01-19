'use client'
import React from 'react'
import InfiniteScrollHero from './InfiniteScrollHero'

const Hero = () => {
  return (
    <div className='w-full h-[95vh] flex flex-col md:flex-row justify-center items-center overflow-hidden'>
        <div className='w-full md:w-[50%]'>

        </div>

        <div className='w-full md:w-[50%]'>
            <InfiniteScrollHero/>
        </div>
    </div>
  )
}

export default Hero