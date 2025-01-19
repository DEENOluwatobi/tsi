'use client'
import React from 'react';
import logo from '@/assets/logo/logo.png';
import Image from 'next/image';
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '@/icons';

const Footer = () => {
  return (
    <div className='w-full flex flex-col gap-10 bg-[#060019] text-white py-5 md:py-10'>
      <div className='w-[90%] mx-auto py-2 gap-5 flex flex-col justify-center items-center'>
          <div className=''>
            <Image src={logo} alt='logo' className='-ml-10 lg:ml-0 h-16 w-auto'/>
          </div>
          <p className=''>
            Copyright &copy; 2025 <span className='text-red-500'>The Skillup Initiative</span>, All rights reserved
          </p>
      </div>

      <div className='flex w-full text-[.9em] px-4 md:justify-center items-center'>
       
      </div>
    </div>
  )
}

export default Footer