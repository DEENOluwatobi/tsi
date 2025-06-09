'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { checkTutorAuth, logoutTutor } from '@/store/slices/tutorSlice';
import { AppDispatch, RootState } from '@/store';

export default function TutorDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    const [showLogoutModal, setShowLogoutModal] = useState(false);

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

    const handleLogout = () => {
        dispatch(logoutTutor());
        router.push('/tutor/login');
    };

    if (isLoading) {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="text-gray-600">Loading...</span>
            </div>
        </div>
        );
    }

    if (!isAuthenticated || !tutor) {
        return null;
    }

    const menuItems = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'students', label: 'Students', icon: '👥' },
        { id: 'courses', label: 'My Courses', icon: '📚' },
        { id: 'assignments', label: 'Assignments', icon: '📝' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'settings', label: 'Settings', icon: '⚙️' },
    ];

    const renderContent = () => {
        switch (activeTab) {
        case 'overview':
            return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6 border">
                    <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <span className="text-2xl">👥</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Total Students</p>
                        <p className="text-2xl font-bold text-gray-900">156</p>
                    </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border">
                    <div className="flex items-center">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <span className="text-2xl">📚</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Active Courses</p>
                        <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border">
                    <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                        <span className="text-2xl">✅</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-gray-900">89%</p>
                    </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border">
                    <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                        <span className="text-2xl">⭐</span>
                    </div>
                    <div className="ml-4">
                        <p className="text-sm font-medium text-gray-600">Rating</p>
                        <p className="text-2xl font-bold text-gray-900">4.8</p>
                    </div>
                    </div>
                </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-sm p-6 border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <p className="text-sm text-gray-600">New student enrolled in {tutor.course}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <p className="text-sm text-gray-600">Assignment submitted by John Doe</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <p className="text-sm text-gray-600">Course material updated</p>
                    </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Performance</h3>
                    <div className="space-y-4">
                    <div>
                        <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">{tutor.course}</span>
                        <span className="text-sm text-gray-900">85%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            );

        case 'students':
            return (
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">My Students</h3>
                </div>
                <div className="p-6">
                <div className="text-center py-12">
                    <span className="text-6xl">👥</span>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Student Management</h3>
                    <p className="mt-2 text-gray-600">View and manage your students here.</p>
                </div>
                </div>
            </div>
            );

        case 'courses':
            return (
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">My Courses</h3>
                </div>
                <div className="p-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center">
                    <div className="p-3 bg-blue-500 rounded-lg">
                        <span className="text-2xl text-white">📚</span>
                    </div>
                    <div className="ml-4">
                        <h4 className="text-lg font-semibold text-gray-900">{tutor.course}</h4>
                        <p className="text-gray-600">Your primary course</p>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            );

        default:
            return (
            <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6">
                <div className="text-center py-12">
                    <span className="text-6xl">🚧</span>
                    <h3 className="mt-4 text-lg font-medium text-gray-900">Coming Soon</h3>
                    <p className="mt-2 text-gray-600">This section is under development.</p>
                </div>
                </div>
            </div>
            );
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
                <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">T</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">Tutor Dashboard</h1>
                    <p className="text-sm text-gray-600">Welcome back, {tutor.firstname}!</p>
                </div>
                </div>

                <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                    {tutor.firstname} {tutor.lastname}
                    </p>
                    <p className="text-xs text-gray-600">{tutor.course}</p>
                </div>
                <button
                    onClick={() => setShowLogoutModal(true)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200 text-sm"
                >
                    Logout
                </button>
                </div>
            </div>
            </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex space-x-8">
            {/* Sidebar */}
            <div className="w-64 flex-shrink-0">
                <nav className="bg-white rounded-lg shadow-sm border p-4">
                <ul className="space-y-2">
                    {menuItems.map((item) => (
                    <li key={item.id}>
                        <button
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition duration-200 ${
                            activeTab === item.id
                            ? 'bg-blue-100 text-blue-700 border border-blue-200'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                        >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                        </button>
                    </li>
                    ))}
                </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {renderContent()}
            </div>
            </div>
        </div>

        {/* Logout Modal */}
        {showLogoutModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Logout</h3>
                <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
                <div className="flex space-x-4">
                <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                    Cancel
                </button>
                <button
                    onClick={handleLogout}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                >
                    Logout
                </button>
                </div>
            </div>
            </div>
        )}
        </div>
    );
}