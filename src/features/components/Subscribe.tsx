'use client'
import { Button } from '@/components/ui/button'
import React from 'react'
import { usePathname } from 'next/navigation';

const Subscribe = () => {
  const pathname = usePathname();

  return (
    <div className={`${['/dashboard', '/tutor/dashboard', '/admin/dashboard'].some(path => pathname.startsWith(path)) && 'hidden'} bg-[#060019] w-full`}>
      <div className='w-[90%] md:w-[80%] mx-auto flex flex-col lg:flex-row justify-center lg:justify-start items-center text-white py-2 md:py-10 gap-2 md:gap-4'>
        <span className='text-[1em] md:text-[1.4em] font-medium'>Join our Newsletter</span>
        <div className='flex-grow w-full lg:w-auto'>
          <input 
            type="text" 
            className='rounded-full bg-gray-100 text-gray-700 placeholder:text-gray-400 
                        px-4 py-3 md:py-4 w-full border-none outline-none text-[.8em] md:text-[.9em]' 
            placeholder='Enter email to join our newsletter'
          />
        </div>
        <Button className='w-full md:w-[200px] h-full lg:w-auto bg-gradient-to-r from-[bg-gradient-to-l from-[#21367a] to-[#1b84fc] text-white text-[.8em] md:text-[.9em] px-6 py-4 rounded-full cursor-pointer'>
          Subscribe
        </Button>
      </div>
    </div>
  )
}

export default Subscribe