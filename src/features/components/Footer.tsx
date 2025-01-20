'use client'
import React from 'react';
import logo from '@/assets/logo/logo.png';
import Image from 'next/image';

const Footer = () => {
  return (
    <div className='w-full flex flex-col gap-10 bg-[#060019] text-white py-5 md:py-10'>
      <div className='w-full md:w-[90%] mx-auto py-2 gap-5 flex flex-col justify-center items-center'>
          <div className=''>
            <Image src={logo} alt='logo' className='h-16 w-auto'/>
          </div>
          <p className='text-center text-[.8em] md:text-[.9em]'>
            Copyright &copy; 2025 <span className='text-red-500'>The Skillup Initiative</span>, All rights reserved
          </p>
      </div>

      <p className='barlow w-full text-[.7em] md:text-[.8em] py-2 text-center border-t border-gray-500'>
        Designed by <span className='text-red-500 font-medium cursor-pointer'> DEENOluwatobi</span>
      </p>
    </div>
  )
}

export default Footer