'use client'
import React from 'react';
import logo from '@/assets/logo/logo.png';
import Image from 'next/image';
import { FacebookIcon, InstagramIcon, LinkedInIcon, TwitterIcon } from '@/icons';

const Footer = () => {
  return (
    <div className='w-full flex flex-col gap-10 bg-[#060019] text-white py-5 md:py-10'>
      <div className='w-[90%] md:w-[90%] mx-auto py-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-2'>

          <div className='col-span-2 w-full h-full flex flex-col gap-4 justify-between'>
            <div className='w-full h-full'>
              <div className=''>
                <Image src={logo} alt='logo' className='-ml-10 lg:ml-0 h-16 w-[150px]'/>
              </div>
              <div className='lg:px-2 mt-4 w-full flex justify-start items-center gap-4'>
                <FacebookIcon/>
                <TwitterIcon/>
                <InstagramIcon/>
                <LinkedInIcon/>
              </div>
            </div>

            <div className='pl-6 text-[.8em] hidden lg:flex'>
              <span>Copyright &copy; 2025 The Skillup Initiative, All rights reserved</span>
            </div>
          </div>

          <div className='col-span-1 w-full flex flex-col gap-4'>
            <h1 className='text-[1.3em] md:text-[1.2em] font-medium'>Virtuo</h1>
            <ul className='text-gray-400 text-[.9em] flex flex-col gap-4'>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>About us</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>How it works</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>FAQs</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>Privacy Policy</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>Terms & Condition</li>
            </ul>
          </div>

          <div className='col-span-1 w-full flex flex-col gap-4'>
            <h1 className='text-[1.3em] md:text-[1.2em] font-medium'>Product</h1>
            <ul className='text-gray-400 text-[.9em] flex flex-col gap-3'>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>Identification</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>Business Card</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>Attendance</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>NFC Payment</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>More+</li>
            </ul>
          </div>

          <div className='col-span-1 w-full flex flex-col gap-4'>
            <h1 className='text-[1.3em] md:text-[1.2em] font-medium'>Experience</h1>
            <ul className='text-gray-400 text-[.9em] flex flex-col gap-3'>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>Signup as Merchant</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>Card samples </li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>Security</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>Career</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>Blog</li>
            </ul>
          </div>

          <div className='col-span-1 w-full flex flex-col gap-4 items-end'>
            <h1 className='text-[1.3em] md:text-[1.2em] font-medium'>Contact us</h1>
            <ul className='text-gray-400 text-[.9em] flex flex-col gap-3 items-end'>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>+234 706 427 2131</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>info@virtuobusiness.com</li>
              <li className='hover:underline duration-300 ease-in-out hover:text-orange-500 cursor-pointer'>Support</li>
            </ul>
          </div>

      </div>

      <div className='flex lg:hidden w-full text-[.9em] px-4 md:justify-center items-center'>
        <span>Copyright &copy; 2024 virtuo, All rights reserved</span>
      </div>
    </div>
  )
}

export default Footer