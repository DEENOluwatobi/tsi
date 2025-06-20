'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo/logo.png'
import { usePathname } from 'next/navigation';
import { AtSign, Facebook, Instagram, Linkedin, Phone, Menu, X, User, ChevronDown, GraduationCap, LayoutDashboard } from 'lucide-react';
import { Xicon2 } from '@/icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Header = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useSelector((state: RootState) => state.auth);
    const { tutor } = useSelector((state: RootState) => state.tutor);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleDropdown = () => {
        setIsMenuOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const menu = [
        {title: 'Home', link: '/'},
        {title: 'What We Do', link: '/testimonials'},
        {title: 'About', link: '/about'},
        {title: 'Contact', link: '/contact'}
    ]

    return (
        <div className={`${['/dashboard', '/tutor/dashboard', '/admin/dashboard'].some(path => pathname.startsWith(path)) && 'hidden'} 
            w-full fixed top-0 left-0 z-[99] `}
        >
            <div className='w-full bg-black py-1 px-4 hidden md:flex justify-between items-center'>
                <div className='flex items-center gap-6'>
                    <div className='flex gap-1 text-[.8em] items-center'>
                        <Phone className={`text-white w-5 h-5`}/>
                        <span className={`text-white`}>(+234)8022321648,  (+234)9028654402</span>
                    </div>
                    <div className='flex gap-1 text-[.8em] items-center'>
                        <AtSign className={`text-white w-5 h-5`}/>
                        <span className={`text-white`}>theskilluptsi@gmail.com</span>
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

            <div className='w-full h-20 px-2 md:px-4 py-2 flex justify-between items-center bg-white/70 backdrop-blur-[30px] shadow-sm'>
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

                <div className='hidden md:flex gap-8 justify-center items-center'>
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

                <div className='flex items-center gap-4'>
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center gap-[2px] px-2 py-2 text-black text-[.9em] font-medium hover:text-red-500 duration-300 ease-in-out transition-all"
                        >
                            <User size={20} />
                            <ChevronDown size={16} className={`transform transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isMenuOpen && (
                            <>
                                <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={closeDropdown}
                                />
                                
                                {/* Dropdown menu */}
                                <div className="p-2 absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg w-[250px] z-20">
                                    <div className="py-1 divide-y-2 divide-gray-300 flex flex-col gap-1">
                                        {user ? (
                                            <Link href="/dashboard">
                                                <button 
                                                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-[.9em] text-black hover:bg-gray-50 transition-colors duration-200"
                                                    onClick={closeDropdown}
                                                >
                                                    <LayoutDashboard size={18}/>
                                                    Go to Dashboard
                                                </button>
                                            </Link>
                                        ) : (
                                            <Link href="/auth/login">
                                                <button 
                                                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-[.9em] text-black hover:bg-gray-50 transition-colors duration-200"
                                                    onClick={closeDropdown}
                                                >
                                                    <User size={18}/>
                                                    Login as Student
                                                </button>
                                            </Link>
                                        )}

                                        { tutor ? (
                                            <Link href="/tutor/dashboard">
                                                <button 
                                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-[.9em] text-black hover:bg-gray-50 transition-colors duration-200"
                                                onClick={closeDropdown}
                                                >
                                                    <GraduationCap size={18}/>
                                                    Enter Staff Dashboard
                                                </button>
                                            </Link>
                                        ) : (
                                            <Link href="/tutor/login">
                                                <button 
                                                className="w-full text-left flex items-center gap-2 px-4 py-2 text-[.9em] text-black hover:bg-gray-50 transition-colors duration-200"
                                                onClick={closeDropdown}
                                                >
                                                    <GraduationCap size={18}/>
                                                    Login as Staff
                                                </button>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>


                    <button className='hidden md:flex bg-gradient-to-br from-blue-500 to-red-500 shadow-lg hover:shadow-red-300 duration-300 ease-in-out transition-all text-white text-[.9em] font-medium px-8 py-2 rounded-full'>
                        <span>Donate</span>
                    </button>
                </div>
                
                {/* ---- MOBILE MENU ---- */}
                <div className="flex md:hidden">
                    <button
                    onClick={toggleMenu}
                    className="p-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                    >
                        {isOpen ? <X className='w-6 h-6 text-gray-800'/> : <Menu className='w-6 h-6 text-gray-800'/>}
                    </button>
                </div>

                {/* Sliding Menu */}
                <div
                className={`flex md:hidden flex-col gap-5 absolute top-0 z-[99] left-0 w-full bg-gray-100 h-[500px] shadow-md transition-transform duration-300 ${
                isOpen ? 'translate-y-0' : '-translate-y-full'
                }`}
                >
                    <div className="flex items-center justify-between p-4">
                        <p className="text-lg font-semibold">Menu</p>
                        <button
                            onClick={toggleMenu}
                            className="p-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="p-4 flex flex-col gap-6">         
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
                                            : 'w-0 group-hover:w-10 group-hover:scale-x-100'
                                    } absolute -bottom-1 left-4 transform -translate-x-1/2 h-[3px] bg-red-500 transition-all duration-300 origin-center`}
                                ></div>
                            </Link>
                        ))}
                    </div>
                    
                    <button className='ml-4 mt-4 w-32 bg-gradient-to-br from-blue-500 to-red-500 shadow-lg hover:shadow-red-300 duration-300 ease-in-out transition-all text-white text-[.9em] font-medium px-8 py-2 rounded-full'>
                        <span>Donate</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header