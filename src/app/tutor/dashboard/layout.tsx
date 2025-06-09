'use client';
import React, { JSX, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { checkTutorAuth, logoutTutor } from '@/store/slices/tutorSlice';
import { AppDispatch, RootState } from '@/store';
import Sidebar from '@/features/tutor/Sidebar';
import Header from '@/features/tutor/Header';
import OverviewPage from '@/features/tutor/Overview';
import StudentsPage from '@/features/tutor/Students';
import CoursesPage from '@/features/tutor/Courses';
import { AssignmentsPage } from '@/features/tutor/Assignments';
import AnalyticsPage from '@/features/tutor/Analytics';
import ProfilePage from '@/features/tutor/Profile';
import SettingsPage from '@/features/tutor/Settings';

type ActiveTab = 'overview' | 'students' | 'courses' | 'assignments' | 'analytics' | 'profile' | 'settings';

export default function TutorDashboard(): JSX.Element | null {
    const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
    const [sidebarMinimized, setSidebarMinimized] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { tutor, isAuthenticated, isLoading } = useSelector((state: RootState) => state.tutor);

    useEffect(() => {
        dispatch(checkTutorAuth());
    }, [dispatch]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/tutor/login');
        }
    }, [isAuthenticated, isLoading, router]);

    const handleLogout = (): void => {
        dispatch(logoutTutor());
        router.push('/tutor/login');
    };

    const toggleSidebar = (): void => {
        setSidebarMinimized(!sidebarMinimized);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="text-black">Loading...</span>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || !tutor) {
        return null;
    }

    const renderContent = (): JSX.Element => {
        switch (activeTab) {
            case 'overview':
                return <OverviewPage tutor={tutor} />;
            case 'students':
                return <StudentsPage />;
            case 'courses':
                return <CoursesPage tutor={tutor} />;
            case 'assignments':
                return <AssignmentsPage />;
            case 'analytics':
                return <AnalyticsPage />;
            case 'profile':
                return <ProfilePage tutor={tutor} />;
            case 'settings':
                return <SettingsPage />;
            default:
                return <OverviewPage tutor={tutor} />;
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar - Fixed Position */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMinimized={sidebarMinimized}
                toggleSidebar={toggleSidebar}
            />

            {/* Main Content Area - Responsive to sidebar width */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
                sidebarMinimized 
                    ? 'ml-16' // When minimized, leave space for narrow sidebar
                    : 'ml-64' // When expanded, leave space for full sidebar
            }`}>
                {/* Header */}
                <Header 
                    tutor={tutor} 
                    onLogout={handleLogout}
                    sidebarMinimized={sidebarMinimized}
                    toggleSidebar={toggleSidebar}
                />

                {/* Page Content - Scrollable and Responsive */}
                <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
                    <div className="p-4 sm:p-6 lg:p-8 w-full">
                        <div className="max-w-full mx-auto">
                            {renderContent()}
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile Overlay - For when sidebar is open on mobile */}
            {(!sidebarMinimized) && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                    onClick={toggleSidebar}
                />
            )}
        </div>
    );
}