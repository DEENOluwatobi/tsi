'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/variants';
import InfiniteScrollHero from './InfiniteScrollHero';

const Hero = () => {
  return (
    <div className='w-full h-full md:h-[95vh] flex flex-col md:flex-row justify-center items-center overflow-hidden'>
        <div className='w-full md:w-[50%] flex flex-col gap-6 justify-center px-4 md:px-6 pt-32 pb-10 md:pt-0 md:pb-0'>
            <motion.h1
            variants={fadeIn('down', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="text-[2rem] md:text-[2.7rem] leading-[2rem] md:leading-[2.5rem] text-center md:text-left font-extrabold bg-clip-text text-transparent bg-gradient-to-tr from-blue-500  to-red-500 [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] relative"
            style={{
                WebkitBackgroundClip: 'text',
                backgroundSize: '200% auto',
                animation: 'shine 4s linear infinite',
            }}
            >
            <span>Empower & Provide Skill Acquisition to Underrepresented Youth</span>

            <style jsx>{`
                @keyframes shine {
                to {
                    backgroundPosition: 200% center;
                }
                }
            `}</style>
            </motion.h1>

            <motion.p
            variants={fadeIn('up', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className='w-full text-center md:text-left text-gray-600 text-[1em]'
            >
                Our aim is to use skills acquisition, and empowerment to bridge the education, mentoring, and career opportunities gap for underrepresented youth in Sub-Saharan Africa. 
            </motion.p>
            
            <motion.button
            variants={fadeIn('right', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className='mx-auto md:mx-0 w-[200px] h-[50px] bg-red-500 rounded-full text-white flex items-center justify-center'
            >
                Join Now!
            </motion.button>

        </div>

        <div className='w-full md:w-[50%]'>
            <InfiniteScrollHero/>
        </div>
    </div>
  )
}

export default Hero