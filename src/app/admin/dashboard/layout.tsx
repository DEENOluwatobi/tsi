'use client';

import { useEffect, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { checkAdminAuth } from '@/store/slices/adminSlice';
import { AppDispatch, RootState } from '@/store';
import AdminSidebar from '@/features/admin/AdminSidebar';
import AdminHeader from '@/features/admin/AdminHeader';

interface AdminLayoutProps {
    children: ReactNode;
}

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

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <div className="w-16 h-16 border-4 border-red-500/20 rounded-full animate-spin">
                            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-red-500 rounded-full animate-spin"></div>
                        </div>
                        <div className="absolute inset-0 w-16 h-16 border-4 border-blue-300/10 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-center">
                        <h3 className="text-white text-lg font-semibold mb-1">Loading Admin Panel</h3>
                        <p className="text-gray-400 text-sm">Please wait while we authenticate you...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || !admin) {
        return null;
    }

    return (
        <div className="h-screen w-full bg-black flex overflow-hidden">
            {/* Sidebar Component */}
            <AdminSidebar 
                isOpen={sidebarOpen} 
                onClose={handleSidebarClose} 
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header Component */}
                <AdminHeader onMenuClick={handleSidebarToggle} />

                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-black">
                    <div className="container mx-auto px-4 py-8 lg:px-8">
                        {/* Content Container with subtle border */}
                        <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800/50 min-h-[calc(100vh-12rem)] p-6 shadow-2xl">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

