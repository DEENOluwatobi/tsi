'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo/logo.png'
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();

    const menu = [
        {title: 'Home', link: '/'},
        {title: 'Testimonials', link: '/testimonials'},
        {title: 'About', link: '/about'},
        {title: 'Contact', link: '/contact'}
    ]

    return (
        <div className='fixed top-0 left-0 z-50 w-full h-16 px-2 md:px-4 py-2 flex justify-between items-center bg-white/50 backdrop-blur-[5px] shadow-sm overflow-hidden'>
            <div>
                <Link href="/" className='w-[150px] h-[70px]'>
                    <Image
                        src={Logo}
                        alt="logo"
                        width={80}
                        height={30}
                        className="w-full h-full object-contain"
                    />
                </Link>
            </div>

            <div className='flex gap-4 justify-center items-center'>
                {menu.map((link, index) => (
                    <Link 
                    key={index} 
                    href={link.link} 
                    className='relative group'
                    >
                        <span className='font-medium text-[.9em] text-black/80'>{link.title}</span>
                        <div className={`${pathname === `/${link.link}` || (link.link === '/' && pathname === '/') ? 'w-6' : ' w-0 group-hover:w-full group-hover:scale-x-100'} 
                            absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[3px] bg-red-500 transition-all duration-300 origin-center`}
                        ></div>
                    </Link>
                ))}
            </div>

            <div>
                <button className='bg-blue-400 text-white text-[.9em] font-medium px-8 py-2 rounded-full'>
                    <span>Donate</span>
                </button>
            </div>
        </div>
    )
}

export default Header