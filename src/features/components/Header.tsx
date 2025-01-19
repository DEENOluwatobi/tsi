'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo/logo.png'
import { usePathname } from 'next/navigation';
import { AtSign, Facebook, Instagram, Linkedin, Phone } from 'lucide-react';
import { Xicon2 } from '@/icons';

const Header = () => {
    const pathname = usePathname();

    const menu = [
        {title: 'Home', link: '/'},
        {title: 'Testimonials', link: '/testimonials'},
        {title: 'About', link: '/about'},
        {title: 'Contact', link: '/contact'}
    ]

    return (
        <div className='w-full fixed top-0 left-0 z-50 '>
            <div className='w-full bg-black py-1 px-4 hidden md:flex justify-between items-center'>
                <div className='flex items-center gap-6'>
                    <div className='flex gap-1 text-[.7em] items-center'>
                        <Phone className={`text-white w-5 h-5`}/>
                        <span className={`text-white`}>(+234)8022321648, (+234)9028654402</span>
                    </div>
                    <div className='flex gap-1 text-[.7em] items-center'>
                        <AtSign className={`text-white w-5 h-5`}/>
                        <span className={`text-white`}>theskillupinitiative@gmail.com</span>
                    </div>
                </div>

                <div className='flex items-center gap-3 lg:gap-4 pb-0.5'>
                    <div className='hidden md:flex items-center gap-3 lg:gap-4'>
                        <Link href="" target="_blank" rel="noopener noreferrer">
                            <Facebook className={`text-white w-5 h-5`}/>
                        </Link>
                        <Link href="" target="_blank" rel="noopener noreferrer">
                            <Instagram className={`text-white w-5 h-5`}/>
                        </Link>
                        <Link href="" target="_blank" rel="noopener noreferrer">
                            <Linkedin className={`text-white w-6 h-6`}/>
                        </Link> 
                        <Link href="https://x.com/TSI086300625617?T=w9YDBDCE16aF0nUq7vxvQ&s=08" target="_blank" rel="noopener noreferrer">
                            <Xicon2 className={`fill-white w-5 h-5`}/>
                        </Link> 
                    </div>
                </div>
            </div>

            <div className='w-full h-20 px-2 md:px-4 py-2 flex justify-between items-center bg-white/50 backdrop-blur-[5px] shadow-sm overflow-hidden'>
                <Link href="/">
                    <div className='w-auto h-[50px]'>
                        <Image
                            src={Logo}
                            alt="logo"
                            width={80}
                            height={30}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </Link>

                <div className='flex gap-8 justify-center items-center'>
                    {menu.map((link, index) => (
                        <Link 
                        key={index} 
                        href={link.link} 
                        className='relative group'
                        >
                            <span className='font-medium text-[.9em] text-black/80'>{link.title}</span>
                            <div
                                className={`${
                                    pathname === link.link
                                        ? 'w-6'
                                        : 'w-0 group-hover:w-full group-hover:scale-x-100'
                                } absolute -bottom-1 left-1/2 transform -translate-x-1/2 h-[3px] bg-red-500 transition-all duration-300 origin-center`}
                            ></div>
                        </Link>
                    ))}
                </div>

                <div>
                    <button className='bg-gradient-to-br from-blue-500 to-red-500 shadow-lg shadow-blue-300 hover:shadow-red-300 duration-300 ease-in-out transition-all text-white text-[.9em] font-medium px-8 py-2 rounded-full'>
                        <span>Donate</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header