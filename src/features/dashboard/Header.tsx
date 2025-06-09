'use client'
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';
import { RootState } from '@/store';
import { 
  Bell, 
  Search, 
  Menu,
  MessageSquare,
  Settings,
  User,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  onMobileMenuToggle: () => void;
  sidebarWidth: string;
}

const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle, sidebarWidth }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showNotifications, setShowNotifications] = useState(false);
    const pathname = usePathname();
    const { user } = useSelector((state: RootState) => state.auth);

    const getPageTitle = () => {
        const segments = pathname.split('/').filter(Boolean);
        if (segments.length === 1 && segments[0] === 'dashboard') {
        return 'Overview';
        }
        if (segments.length > 1) {
        const page = segments[segments.length - 1];
        return page.charAt(0).toUpperCase() + page.slice(1);
        }
        return 'Dashboard';
    };

    const notifications = [
        { id: 1, message: 'New assignment available in React Course', time: '5 min ago', unread: true },
        { id: 2, message: 'Profile updated successfully', time: '1 hour ago', unread: true },
        { id: 3, message: 'Welcome to TSI platform!', time: '2 hours ago', unread: false },
    ];

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <header 
        className="fixed top-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-30 transition-all duration-300"
        style={{ left: sidebarWidth, height: '80px' }}
        >
            <div className="h-full px-6 flex items-center justify-between">
                {/* Left Section */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={onMobileMenuToggle}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
                    >
                        <Menu className="h-6 w-6 text-gray-600" />
                    </button>

                    <div>
                        <h1 className="text-xl font-bold text-gray-900">
                        {getPageTitle()}
                        </h1>
                        <p className="text-sm text-gray-500 mt-0.5">
                        {new Date().toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                        })}
                        </p>
                    </div>
                </div>
                
                {/* Right Section */}
                <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative hidden md:block">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-3 w-80 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200"
                    />
                </div>

                {/* Quick Actions */}
                <div className="flex items-center space-x-2">
                    <button className="p-3 rounded-xl hover:bg-gray-100 transition-colors relative">
                        <MessageSquare className="h-5 w-5 text-gray-600" />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                    </button>
                    
                    <div className="relative">
                        <button 
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-3 rounded-xl hover:bg-gray-100 transition-colors relative"
                        >
                            <Bell className="h-5 w-5 text-gray-600" />
                            {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                {unreadCount}
                            </span>
                            )}
                        </button>
                        
                        {showNotifications && (
                            <>
                            <div 
                                className="fixed inset-0 z-40" 
                                onClick={() => setShowNotifications(false)}
                            />
                            <div className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                                <div className="px-6 py-4 border-b border-gray-100">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-bold text-gray-900">Notifications</h3>
                                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
                                    {unreadCount} new
                                    </span>
                                </div>
                                </div>
                                <div className="max-h-80 overflow-y-auto">
                                {notifications.map((notification) => (
                                    <div 
                                    key={notification.id} 
                                    className={`px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                                        notification.unread ? 'bg-blue-50/50 border-l-4 border-blue-500' : ''
                                    }`}
                                    >
                                    <div className="flex items-start space-x-3">
                                        <div className={`w-2 h-2 rounded-full mt-2 ${
                                        notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                                        }`} />
                                        <div className="flex-1">
                                        <p className="text-sm text-gray-900 font-medium">
                                            {notification.message}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {notification.time}
                                        </p>
                                        </div>
                                    </div>
                                    </div>
                                ))}
                                </div>
                                <div className="px-6 py-3 border-t border-gray-100">
                                <button className="text-sm text-blue-600 hover:text-blue-800 font-semibold">
                                    Mark all as read
                                </button>
                                </div>
                            </div>
                            </>
                        )}
                        </div>
                    </div>
                    
                    {/* User Profile */}
                    <div className="flex items-center space-x-4 pl-4 border-l border-gray-200">
                        <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900">
                            Welcome, {user?.firstName}!
                        </p>
                        <p className="text-xs text-gray-500">
                            {user?.email}
                        </p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-red-600 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">
                                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                                </span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;