'use client';

import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { 
    Menu,
    Bell,
    Search,
    ChevronDown,
    Sun,
    Moon
} from 'lucide-react';
import { useState } from 'react';

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const pathname = usePathname();
    const { admin } = useSelector((state: RootState) => state.admin);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    const getPageTitle = (path: string): string => {
        const routes: Record<string, string> = {
            '/admin/dashboard': 'Dashboard Overview',
            '/admin/dashboard/users': 'User Management',
            '/admin/dashboard/tutors': 'Tutor Management',
            '/admin/dashboard/forms': 'Form Management',
            '/admin/dashboard/settings': 'System Settings',
        };

        return routes[path] || 'Dashboard';
    };

    const getBreadcrumb = (path: string): string[] => {
        if (path === '/admin/dashboard') return ['Dashboard'];
        
        const segments = path.split('/').filter(Boolean);
        return segments.slice(1).map(segment => 
            segment.charAt(0).toUpperCase() + segment.slice(1)
        );
    };

    const pageTitle = getPageTitle(pathname || '');
    const breadcrumbs = getBreadcrumb(pathname || '');

    return (
        <header className="bg-black border-b border-gray-700/50 h-20 flex items-center justify-between px-4 lg:px-8 shadow-lg">
            {/* Left Section */}
            <div className="flex items-center space-x-6">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                    <Menu size={20} />
                </button>
                
                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold text-white">
                        {pageTitle}
                    </h1>
                    <nav className="flex items-center space-x-2 text-sm text-gray-400">
                        {breadcrumbs.map((crumb, index) => (
                            <span key={crumb} className="flex items-center">
                                {index > 0 && <span className="mx-2">/</span>}
                                <span className={index === breadcrumbs.length - 1 ? 'text-red-400' : ''}>
                                    {crumb}
                                </span>
                            </span>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Center Section - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search anything..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
                {/* Search Icon for mobile */}
                <button className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                    <Search size={18} />
                </button>

                {/* Theme Toggle */}
                <button className="hidden sm:flex p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
                    <Sun size={18} />
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button 
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors relative"
                    >
                        <Bell size={18} />
                        <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">3</span>
                        </span>
                    </button>

                    {/* Notification Dropdown */}
                    {notificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50">
                            <div className="p-4 border-b border-gray-700">
                                <h3 className="text-white font-semibold">Notifications</h3>
                                <p className="text-gray-400 text-sm">You have 3 new notifications</p>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-4 border-b border-gray-700 hover:bg-gray-700/30 cursor-pointer">
                                        <p className="text-white text-sm font-medium">New user registration</p>
                                        <p className="text-gray-400 text-xs mt-1">John Doe has registered as a new user</p>
                                        <p className="text-gray-500 text-xs mt-2">2 minutes ago</p>
                                    </div>
                                ))}
                            </div>
                            <div className="p-3 text-center border-t border-gray-700">
                                <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
                                    View all notifications
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Admin Profile */}
                {admin && (
                    <div className="flex items-center space-x-3 pl-3 border-l border-gray-700">
                        <div className="hidden sm:block text-right">
                            <p className="text-white text-sm font-medium">
                                {admin.firstname} {admin.lastname}
                            </p>
                            <p className="text-gray-400 text-xs capitalize">
                                {admin.designation}
                            </p>
                        </div>
                        
                        <div className="relative group">
                            <button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-800 transition-colors">
                                <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-white font-semibold text-sm">
                                        {admin.firstname.charAt(0)}{admin.lastname.charAt(0)}
                                    </span>
                                </div>
                                <ChevronDown size={14} className="text-gray-400 group-hover:text-white transition-colors" />
                            </button>

                            {/* Profile Dropdown */}
                            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                                <div className="p-3 border-b border-gray-700">
                                    <p className="text-white font-medium text-sm">{admin.firstname} {admin.lastname}</p>
                                    <p className="text-gray-400 text-xs">{admin.designation}</p>
                                </div>
                                <div className="py-2">
                                    <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 text-sm">
                                        View Profile
                                    </button>
                                    <button className="w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700 text-sm">
                                        Account Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Click away listener for notifications */}
            {notificationsOpen && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationsOpen(false)}
                />
            )}
        </header>
    );
}