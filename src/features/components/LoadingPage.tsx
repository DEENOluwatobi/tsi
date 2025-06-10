'use client'
import React from 'react';
import Image from 'next/image';
import Logo from '@/assets/logo/logo.png'

const LoadingPage = () => {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div className='w-auto h-[50px] md:h-[80px]'>
                <Image
                    src={Logo}
                    alt="logo"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain"
                />
            </div>
        </div>
    )
}

export default LoadingPage