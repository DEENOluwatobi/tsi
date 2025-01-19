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
        <div className="pt-20 md:py-20 flex justify-center items-center bg-white">
            <motion.h1
            variants={fadeIn('up', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{ once: false, amount: 0.1 }}
            className="text-[4rem] md:text-[10rem] font-extrabold bg-clip-text text-transparent md:pt-16"
            style={{
            backgroundImage: `url(${Image1.src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}
            >
                About Us
            </motion.h1>
        </div>
        
        <div className='relative flex flex-col-reverse w-full md:flex-row bg-white py-5 md:py-20 overflow-hidden'>
            <div className='w-full md:w-50% flex justify-center items-center'>
                <div
                style={{ 
                    backgroundImage: `url(${Image2.src})`,
                    backgroundSize: 'cover', 
                }}
                className='w-[90%] h-[300px] rounded-2xl relative z-10'
                >

                </div>
            </div>
            <div className="relative z-10 w-full md:w-50% py-10 px-6 md:px-12 flex flex-col gap-1">
                <h1 className='text-[.9em] font-bold text-blue-500'>ABOUT US</h1>
                <h2 className='text-gray-700 text-[1.8em] font-semibold'>
                    Who We Are
                </h2>
                <p className='text-gray-700 text-[.9em]'>
                    At <span className='font-semibold text-red-500'>The SkillUp Initiative</span>, we are driven by a passion to transform lives and uplift 
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
            className='absolute -z-0 -right-20 -bottom-40 w-[500px] h-[500px] rounded-full bg-red-500'>
                
            </motion.div>
        </div>

        <div className='relative flex flex-col w-full md:flex-row bg-black bg-opacity-80 py-5 md:py-20 overflow-hidden'>
            <div className="relative z-10 w-full md:w-50% py-10 px-6 md:px-12 flex flex-col gap-1">
                <h1 className='text-[.9em] font-bold text-red-500'>OUR MISSION</h1>
                <h2 className='text-gray-300 text-[1.9em] font-semibold'>
                    What Our Mission Is
                </h2>
                <p className='text-gray-100 text-[.9em] flex flex-col gap-4'>
                    <span>
                        Our mission is to empower underserved communities by providing access to tech education and fostering innovation. We aim to create opportunities where the&apos;re needed most, ensuring everyone has the tools to succeed in a rapidly evolving digital world.
                        We understand the challenges faced by many in underserved areas; limited access to resources, opportunities, and mentorship. That&apos;s why we&apos;ve made it our purpose to bridge this gap. Through hands-on training and guidance, we equip individuals with practical skills that open doors to brighter futures, helping them not just to dream but to achieve.
                    </span>
                     <span>
                        For us, this is more than just teaching tech skills. it&apos;s about igniting a love for learning, inspiring creativity, and building confidence. It&apos;s about showing people their potential and helping them see that they can be leaders, innovators, and change-makers in their communities.
                    </span>
                    <span>
                        At SkillUp Initiative, we&apos;re not just shaping skills; we&apos;re shaping lives. One person at a time, one community at a time, we&apos;re creating a ripple effect of progress, hope, and empowerment.
                    </span>
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
            className='absolute -z-0 -left-20 -top-40 w-[450px] h-[450px] rounded-full bg-blue-500'>
                
            </motion.div>
        </div>

        

    </div>
  );
};

export default About;
