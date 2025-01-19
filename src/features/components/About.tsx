'use client'
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/variants';
import Image1 from '@/assets/images/image.jpg';
import Image2 from '@/assets/images/image2.jpg';
import Image3 from '@/assets/images/image3.jpg';
import Image4 from '@/assets/images/image4.jpg';
import Image5 from '@/assets/images/image5.jpg';
import Image6 from '@/assets/images/image6.jpg';

const About = () => {
  return (
    <div>
        <div className="py-20 flex justify-center items-center bg-white">
            <motion.h1
            variants={fadeIn('up', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="text-[10rem] font-extrabold bg-clip-text text-transparent pt-16"
            style={{
            backgroundImage: `url(${Image1.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
            >
                About Us
            </motion.h1>
        </div>
        
        <div className='relative flex flex-col w-full md:flex-row bg-white py-5 md:py-20 overflow-hidden'>
            <div className='w-full md:w-50% flex justify-center items-center'>
                <div
                style={{ 
                    backgroundImage: `url(${Image2.src})`,
                    backgroundSize: 'cover', 
                }}
                className='w-[90%] h-[300px] rounded-2xl'
                >

                </div>
            </div>
            <div className="relative z-10 w-full md:w-50% py-10 px-6 md:px-12 flex flex-col gap-1">
                <h1 className='text-[.8em] font-bold text-orange-500'>ABOUT US</h1>
                <h2 className='text-gray-700 text-[1.8em] font-semibold'>
                    Who We Are
                </h2>
                <p className='text-gray-700 text-[.9em]'>
                    At SkillUp Initiative, we are driven by a passion to transform lives and uplift 
                    underserved communities through the power of technology. Our mission is to empower 
                    individuals in these communities by providing access to tech education and 
                    fostering innovation, ensuring no one is left behind in the digital age.
                </p>
            </div>

            <motion.div 
            variants={fadeIn('left', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className='absolute -z-0 -right-20 -bottom-40 w-[500px] h-[500px] rounded-full bg-orange-500'>
                
            </motion.div>
        </div>

        <div className='relative flex flex-col w-full md:flex-row bg-black bg-opacity-80 py-5 md:py-20 overflow-hidden'>
            <div className="relative z-10 w-full md:w-50% py-10 px-6 md:px-12 flex flex-col gap-1">
                <h1 className='text-[.8em] font-bold text-orange-500'>OUR MISSION</h1>
                <h2 className='text-gray-300 text-[1.8em] font-semibold'>
                    What Our Mission Is
                </h2>
                <p className='text-gray-100 text-[.9em]'>
                    At <span className="font-bold text-orange-500">RentNaija</span>, our mission is 
                    simple: to make the rental process smooth, secure, and enjoyable. We strive to 
                    empower renters and property owners by bridging the gap between them, ensuring 
                    that every rental experience is hassle-free and rewarding.
                </p>
            </div>

            <div className='w-full md:w-50%'>
                <div
                style={{ 
                    backgroundImage: `url(${Image3.src})`,
                    backgroundSize: 'cover', 
                }}
                className='w-[90%] h-[300px] rounded-2xl'
                >

                </div>
            </div>

            <motion.div 
            variants={fadeIn('right', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className='absolute -z-0 -left-20 -top-40 w-[450px] h-[450px] rounded-full bg-gray-500'>
                
            </motion.div>
        </div>

        <section className="py-10 md:py-20 px-6 md:px-12 bg-gray-100 flex flex-col justify-center items-center gap-2">
            <h1 className='text-[.8em] font-bold text-orange-500'>WHY CHOOSE US?</h1>
            <h2 className='text-gray-700 text-[1.8em] font-semibold'>
                Why Choose RentNaija?
            </h2>
            <p className="text-[1em] leading-7 text-center mb-6">
                Choosing <span className="font-bold text-orange-500">RentNaija</span> means 
                transparency, efficiency, and a diverse range of properties for every lifestyle.
            </p>
            <div className="max-w-[800px] flex flex-col md:flex-row justify-center gap-2 md:gap-4 mt-4">
                <div className="p-6 bg-white shadow-md rounded-md">
                    <h3 className="font-bold text-gray-700">Transparency</h3>
                    <p>No hidden fees or ambiguous terms.</p>
                </div>
                <div className="p-6 bg-black shadow-md rounded-md">
                    <h3 className="font-bold text-orange-500">Efficiency</h3>
                    <p className='text-white'>Fast-tracked rental processes to save you time.</p>
                </div>
                <div className="p-6 bg-orange-500 shadow-md rounded-md">
                    <h3 className="font-bold text-gray-100">Diversity</h3>
                    <p className='text-white'>Rentals for city living, family retreats, and more.</p>
                </div>
            </div>
        </section>

    </div>
  );
};

export default About;
