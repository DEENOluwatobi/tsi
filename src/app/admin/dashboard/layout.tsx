'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { checkAdminAuth, logoutAdmin } from '@/store/slices/adminSlice';
import { AppDispatch, RootState } from '@/store';
import { 
    Shield, 
    Users, 
    GraduationCap, 
    BarChart3, 
    Settings, 
    LogOut,
    Menu,
    X,
    Bell,
    User
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

interface AdminLayoutProps {
    children: ReactNode;
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
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
        isActive
            ? 'bg-purple-600 text-white'
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
        {icon}
        <span className="font-medium">{label}</span>
    </Link>
);

export default function AdminLayout({ children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { admin, isAuthenticated, isLoading } = useSelector((state: RootState) => state.admin);

    useEffect(() => {
        dispatch(checkAdminAuth());
    }, [dispatch]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
        router.push('/admin/login');
        }
    }, [isAuthenticated, isLoading, router]);

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
        href: '/admin/users',
        },
        {
        icon: <GraduationCap size={20} />,
        label: 'Tutors',
        href: '/admin/tutors',
        },
        {
        icon: <Settings size={20} />,
        label: 'Settings',
        href: '/admin/settings',
        },
    ];

    if (isLoading) {
        return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="flex items-center space-x-2 text-white">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
            <span>Loading...</span>
            </div>
        </div>
        );
    }

    if (!isAuthenticated || !admin) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-900 flex">
        {/* Sidebar */}
        <div className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-purple-500" />
                <span className="text-xl font-bold text-white">Admin Panel</span>
            </div>
            <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-gray-400 hover:text-white"
            >
                <X size={20} />
            </button>
            </div>

            <nav className="mt-8 px-4 space-y-2">
            {sidebarItems.map((item) => (
                <SidebarItem
                key={item.href}
                icon={item.icon}
                label={item.label}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                />
            ))}
            </nav>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
            <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 w-full text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
            >
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
            </button>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 h-16 flex items-center justify-between px-4 lg:px-6">
            <div className="flex items-center space-x-4">
                <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white"
                >
                <Menu size={20} />
                </button>
                <h1 className="text-xl font-semibold text-white">
                Admin Dashboard
                </h1>
            </div>

            <div className="flex items-center space-x-4">
                <button className="text-gray-400 hover:text-white relative">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                </button>

                <div className="flex items-center space-x-3 text-white">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <User size={16} />
                </div>
                <div className="hidden sm:block">
                    <p className="text-sm font-medium">
                    {admin.firstname} {admin.lastname}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                    {admin.designation}
                    </p>
                </div>
                </div>
            </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900">
            <div className="container mx-auto px-4 py-6 lg:px-6">
                {children}
            </div>
            </main>
        </div>

        {/* Sidebar Overlay */}
        {sidebarOpen && (
            <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            />
        )}
        </div>
    );
}