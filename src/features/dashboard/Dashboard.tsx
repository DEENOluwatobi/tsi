'use client'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState, AppDispatch } from '@/store';
import { signOutUser } from '@/store/slices/authSlice';
import { AuthGuard } from '@/features/auth/AuthGuard';
import { LogOut, User, Phone, MapPin, Briefcase, Mail } from 'lucide-react';

const Dashboard: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { user, isLoading } = useSelector((state: RootState) => state.auth);

    const handleSignOut = async () => {
        try {
        await dispatch(signOutUser());
        router.push('/auth/login');
        } catch (error) {
        console.error('Sign out error:', error);
        }
    };

    return (
        <AuthGuard>
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-black">Dashboard</h1>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-700">Welcome, {user?.firstName}!</span>
                    <button
                    onClick={handleSignOut}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                    </button>
                </div>
                </div>
            </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <div className="h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center">
                            <User className="h-12 w-12 text-white" />
                            </div>
                        </div>
                        <div className="ml-4">
                            <h3 className="text-lg font-medium text-black">
                            {user?.displayName || `${user?.firstName} ${user?.lastName}`}
                            </h3>
                            <p className="text-sm text-gray-500">{user?.techSkill}</p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>

                {/* User Information */}
                <div className="lg:col-span-2">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h3 className="text-lg font-medium text-black mb-4">Profile Information</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        
                        <div className="flex items-center">
                            <Mail className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                            <p className="text-sm font-medium text-gray-500">Email</p>
                            <p className="text-sm text-black">{user?.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Phone className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                            <p className="text-sm font-medium text-gray-500">Phone</p>
                            <p className="text-sm text-black">{user?.phone || 'Not provided'}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <Briefcase className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                            <p className="text-sm font-medium text-gray-500">Tech Skill</p>
                            <p className="text-sm text-black">{user?.techSkill || 'Not specified'}</p>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <MapPin className="h-5 w-5 text-gray-400 mr-3" />
                            <div>
                            <p className="text-sm font-medium text-gray-500">Location</p>
                            <p className="text-sm text-black">{user?.state}, {user?.country}</p>
                            </div>
                        </div>

                        </div>
                    </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                    
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                <User className="w-5 h-5 text-white" />
                            </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                Profile Completion
                                </dt>
                                <dd className="text-lg font-medium text-black">
                                {user?.phone && user?.techSkill && user?.state ? '100%' : '75%'}
                                </dd>
                            </dl>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-white" />
                            </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                Account Status
                                </dt>
                                <dd className="text-lg font-medium text-black">Active</dd>
                            </dl>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            </div>
                            <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-gray-500 truncate">
                                Member Since
                                </dt>
                                <dd className="text-lg font-medium text-black">
                                {new Date().toLocaleDateString()}
                                </dd>
                            </dl>
                            </div>
                        </div>
                        </div>
                    </div>

                    </div>
                </div>

                </div>
            </div>
            </main>
        </div>
        </AuthGuard>
    );
};

export default Dashboard;