'use client'
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/variants';

const Hero = () => {
    const stats = [
        { number: '1000+', label: 'Students Empowered' },
        { number: '50+', label: 'Skills Taught' },
        { number: '15+', label: 'Countries Reached' }
    ];

    const features = [
        'Tech Skills Training',
        'Career Mentorship',
        'Job Placement Support',
        'Community Building'
    ];

    return (
        <div className='relative w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden'>

            <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse'></div>
                <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000'></div>
                <div className='absolute top-40 left-1/2 w-60 h-60 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000'></div>
            </div>

        
            <div className='relative z-10 lg:max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between min-h-screen'>
                
                <div className='w-full lg:w-1/2 space-y-8 text-center lg:text-left'>
                
                <motion.div
                    variants={fadeIn('down', 0.1)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'
                >
                    🚀 Transforming Lives Through Technology
                </motion.div>

                <motion.h1
                    variants={fadeIn('up', 0.2)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='text-2xl md:text-3xl lg:text-5xl font-bold text-gray-900 leading-tight'
                >
                    Empower Youth with
                    <span className='block bg-gradient-to-r from-blue-600 to-red-500 bg-clip-text text-transparent'>
                    Essential Tech Skills
                    </span>
                </motion.h1>

                <motion.p
                    variants={fadeIn('up', 0.3)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='text-lg text-gray-600 leading-relaxed max-w-2xl'
                >
                    Bridge the digital divide in Sub-Saharan Africa by providing world-class technology education, mentorship, and career opportunities to underrepresented youth and adults.
                </motion.p>

                <motion.div
                    variants={fadeIn('up', 0.4)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='grid grid-cols-2 gap-4 max-w-lg mx-auto lg:mx-0'
                >
                    {features.map((feature, index) => (
                    <div key={index} className='flex items-center space-x-3'>
                        <div className='w-2 h-2 bg-red-500 rounded-full'></div>
                        <span className='text-gray-700 font-medium'>{feature}</span>
                    </div>
                    ))}
                </motion.div>

                <motion.div
                    variants={fadeIn('up', 0.5)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'
                >
                    <Link href='/auth/register'>
                        <button className='px-8 py-4 bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl'>
                            Start Your Journey
                        </button>
                    </Link>
                    <Link href='/learn'>
                        <button className='px-8 py-4 bg-white text-gray-800 font-semibold rounded-full border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300'>
                            Learn More
                        </button>
                    </Link>
                </motion.div>

                {/* <motion.div
                    variants={fadeIn('up', 0.6)}
                    initial='hidden'
                    whileInView={'show'}
                    viewport={{ once: false, amount: 0.1 }}
                    className='flex justify-center lg:justify-start space-x-8 pt-8'
                >
                    {stats.map((stat, index) => (
                        <div key={index} className='text-center'>
                            <div className='text-2xl md:text-3xl font-bold text-gray-900'>{stat.number}</div>
                            <div className='text-sm text-gray-600'>{stat.label}</div>
                        </div>
                    ))}
                </motion.div> */}
                </div>

                <div className='w-full lg:w-1/2 mt-16 lg:mt-0 relative'>
                    <motion.div
                        variants={fadeIn('left', 0.3)}
                        initial='hidden'
                        whileInView={'show'}
                        viewport={{ once: false, amount: 0.1 }}
                        className='relative max-w-lg mx-auto'
                    >
                        <div className='bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden'>
                            <div className='absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10'></div>
                            
                            <div className='relative z-10'>
                                <div className='w-16 h-16 bg-gradient-to-r from-blue-500  to-red-500 rounded-xl flex items-center justify-center mb-6'>
                                    <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
                                    </svg>
                                </div>
                                
                                <h3 className='text-xl font-bold text-gray-900 mb-3'>
                                    Comprehensive Learning Path
                                </h3>
                                
                                <p className='text-gray-600 mb-6 text-[.9em]'>
                                    From basic digital literacy to advanced programming, our structured curriculum adapts to your pace and goals.
                                </p>

                                <div className='space-y-4'>
                                    {[
                                        { skill: 'Web Development', progress: 85 },
                                        { skill: 'Search Engine Optimization', progress: 70 },
                                        { skill: 'Product Management', progress: 60 }
                                    ].map((item, index) => (
                                        <div key={index} className='space-y-2'>
                                            <div className='flex justify-between text-sm'>
                                                <span className='font-medium text-gray-700'>{item.skill}</span>
                                                <span className='text-gray-500'>{item.progress}%</span>
                                            </div>
                                            <div className='w-full bg-gray-200 rounded-full h-2'>
                                                <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${item.progress}%` }}
                                                viewport={{ once: false, amount: 0.1 }}
                                                transition={{ duration: 1.5, delay: index * 0.2 }}
                                                className='bg-gradient-to-r from-blue-800 to-blue-500 h-2 rounded-full'
                                                ></motion.div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className='absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100'
                        >
                            <div className='w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center'>
                                <svg className='w-4 h-4 text-green-600' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                                </svg>
                            </div>
                            <div className='text-sm font-medium text-gray-900 mt-2'>Course Completed!</div>
                        </motion.div>

                        <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        className='absolute -bottom-20 -left-4 md:-left-12 bg-white rounded-xl shadow-lg p-4 border border-gray-100'
                        >
                            <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                                <svg className='w-4 h-4 text-blue-600' fill='currentColor' viewBox='0 0 20 20'>
                                    <path d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                                </svg>
                            </div>
                            <div className='text-sm font-medium text-gray-900 mt-2'>Mentors Available</div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Hero;

// 'use client'
// import React from 'react';
// import { motion } from 'framer-motion';
// import { fadeIn } from '@/lib/variants';
// import InfiniteScrollHero from './InfiniteScrollHero';

// const Hero = () => {
//   return (
//     <div className='w-full h-full md:h-[95vh] flex flex-col md:flex-row justify-center items-center overflow-hidden'>
//         <div className='w-full md:w-[50%] flex flex-col gap-6 justify-center px-4 md:px-6 pt-32 pb-10 md:pt-0 md:pb-0'>
//             <motion.h1
//             variants={fadeIn('down', 0.1)}
//             initial='hidden'
//             whileInView={'show'}
//             viewport={{ once: false, amount: 0.1 }}
//             className="text-[2rem] md:text-[2.7rem] leading-[2rem] md:leading-[2.5rem] text-center md:text-left font-extrabold bg-clip-text text-transparent bg-gradient-to-tr from-blue-500  to-red-500 [text-shadow:_2px_2px_2px_rgb(0_0_0_/_20%)] relative"
//             style={{
//                 WebkitBackgroundClip: 'text',
//                 backgroundSize: '200% auto',
//                 animation: 'shine 4s linear infinite',
//             }}
//             >
//             <span>Empower & Provide Skill Acquisition to Underrepresented Youth</span>

//             <style jsx>{`
//                 @keyframes shine {
//                 to {
//                     backgroundPosition: 200% center;
//                 }
//                 }
//             `}</style>
//             </motion.h1>

//             <motion.p
//             variants={fadeIn('up', 0.1)}
//             initial='hidden'
//             whileInView={'show'}
//             viewport={{ once: false, amount: 0.1 }}
//             className='w-full text-center md:text-left text-gray-600 text-[1em]'
//             >
//                 Our aim is to use skills acquisition, and empowerment to bridge the education, mentoring, and career opportunities gap for underrepresented youth in Sub-Saharan Africa. 
//             </motion.p>
            
//             <motion.button
//             variants={fadeIn('right', 0.1)}
//             initial='hidden'
//             whileInView={'show'}
//             viewport={{ once: false, amount: 0.1 }}
//             className='mx-auto md:mx-0 w-[200px] h-[50px] bg-red-500 rounded-full text-white flex items-center justify-center'
//             >
//                 Join Now!
//             </motion.button>

//         </div>

//         <div className='w-full md:w-[50%]'>
//             <InfiniteScrollHero/>
//         </div>
//     </div>
//   )
// }

// export default Hero