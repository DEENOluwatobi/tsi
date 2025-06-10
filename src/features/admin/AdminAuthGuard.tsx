'use client';
import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { checkAdminAuth } from '@/store/slices/adminSlice';
import { AppDispatch, RootState } from '@/store';

interface AdminAuthGuardProps {
    children: ReactNode;
}

export default function AdminAuthGuard({ children }: AdminAuthGuardProps) {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isAuthenticated, isLoading } = useSelector((state: RootState) => state.admin);

    useEffect(() => {
        dispatch(checkAdminAuth());
    }, [dispatch]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
        router.push('/admin/login');
        }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading) {
        return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            <p className="text-white text-sm">Verifying admin access...</p>
            </div>
        </div>
        );
    }

    if (!isAuthenticated) {
        return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center">
            <h2 className="text-xl font-semibold text-white mb-4">Access Denied</h2>
            <p className="text-gray-400 mb-6">You need to be logged in as an admin to access this area.</p>
            <button
                onClick={() => router.push('/admin/login')}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
                Go to Admin Login
            </button>
            </div>
        </div>
        );
    }

    return <>{children}</>;
}