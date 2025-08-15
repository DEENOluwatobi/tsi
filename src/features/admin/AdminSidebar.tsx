'use client';

import { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAdmin } from '@/store/slices/adminSlice';
import { AppDispatch, RootState } from '@/store';
import { 
    Shield, 
    Users, 
    GraduationCap, 
    BarChart3, 
    Settings, 
    LogOut,
    X,
    FileText,
    Calendar,
    Mails
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo/black-logo.png'

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

interface SidebarItemProps {
    icon: ReactNode;
    label: string;
    href: string;
    isActive?: boolean;
    onClick?: () => void;
}

const SidebarItem = ({ icon, label, href, isActive, onClick }: SidebarItemProps) => (
    <Link
        href={href}
        onClick={onClick}
        className={`group flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
            isActive
                ? 'bg-gradient-to-r from-red-600 to-blue-600 text-white shadow-lg shadow-red-500/25'
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-white hover:shadow-md'
        }`}
    >
        <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`}>
            {icon}
        </div>
        <span className="font-medium text-[.9em]">{label}</span>
        {isActive && (
            <div className="w-2 h-2 bg-white rounded-full ml-auto animate-pulse" />
        )}
    </Link>
);

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { admin } = useSelector((state: RootState) => state.admin);

    const handleLogout = () => {
        dispatch(logoutAdmin());
        router.push('/admin/login');
    };

    const sidebarItems = [
        {
            icon: <BarChart3 size={20} />,
            label: 'Dashboard',
            href: '/admin/dashboard',
        },
        {
            icon: <Users size={20} />,
            label: 'Users',
            href: '/admin/dashboard/users',
        },
        {
            icon: <GraduationCap size={20} />,
            label: 'Tutors',
            href: '/admin/dashboard/tutors',
        },
        {
            icon: <Calendar size={20} />,
            label: 'Events',
            href: '/admin/dashboard/events',
        },
        {
            icon: <Mails size={20} />,
            label: 'Mails',
            href: '/admin/dashboard/mails',
        },
        {
            icon: <FileText size={20} />,
            label: 'Forms',
            href: '/admin/dashboard/forms',
        },
        {
            icon: <Settings size={20} />,
            label: 'Settings',
            href: '/admin/dashboard/settings',
        },
    ];

    return (
        <>
            {/* Sidebar */}
            <div className={`${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            } fixed inset-y-0 left-0 z-50 w-72 h-full bg-black border-r border-gray-700/50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 shadow-2xl`}>
                
                {/* Header */}
                <div className="flex items-center justify-between h-20 px-6 border-b border-gray-700/50">
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            {/* <Shield className="w-10 h-10 text-red-500" /> */}
                            <div className='w-auto h-[35px]'>
                                <Image
                                    src={Logo}
                                    alt="logo"
                                    width={80}
                                    height={30}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="absolute inset-0 w-10 h-10 text-red-500 animate-ping opacity-20">
                                <Shield className="w-10 h-10" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xs lg:text-lg font-bold text-white">Admin Panel</h2>
                            <p className="text-xs text-gray-400">Management System</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Admin Info */}
                {admin && (
                    <div className="px-6 py-2 border-b border-gray-700/50">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                <span className="text-white font-semibold text-lg">
                                    {admin.firstname.charAt(0)}{admin.lastname.charAt(0)}
                                </span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-white font-medium truncate">
                                    {admin.firstname} {admin.lastname}
                                </p>
                                <p className="text-gray-400 text-sm capitalize truncate">
                                    {admin.designation}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-2">
                        Navigation
                    </div>
                    {sidebarItems.map((item) => (
                        <SidebarItem
                            key={item.href}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                            isActive={pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/admin/dashboard')}
                            onClick={onClose}
                        />
                    ))}
                </nav>

                {/* Logout Button */}
                <div className="mt-auto p-4 border-t border-gray-700/50">
                    <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 px-4 py-3 w-full text-gray-300 hover:bg-red-500/10 hover:text-red-400 rounded-xl transition-all duration-200 group"
                    >
                        <LogOut size={20} className="group-hover:rotate-12 transition-transform duration-200" />
                        <span className="font-medium text-[.9em]">Sign Out</span>
                    </button>
                </div>
            </div>

            {/* Sidebar Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}
        </>
    );
}