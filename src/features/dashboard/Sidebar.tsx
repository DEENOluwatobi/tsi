'use client'
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import { RootState, AppDispatch } from '@/store';
import { signOutUser } from '@/store/slices/authSlice';
import { 
    Menu, 
    X, 
    Home, 
    User, 
    BookOpen, 
    Settings, 
    LogOut,
    GraduationCap,
    PanelLeft,
    PanelLeftClose
} from 'lucide-react';

interface SidebarProps {
    isCollapsed: boolean;
    onToggle: () => void;
    isMobileOpen: boolean;
    onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
    isCollapsed, 
    onToggle, 
    isMobileOpen, 
    onMobileClose 
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useSelector((state: RootState) => state.auth);

    const handleSignOut = async () => {
        try {
        await dispatch(signOutUser());
        router.push('/auth/login');
        } catch (error) {
        console.error('Sign out error:', error);
        }
    };

    const navigationItems = [
        { name: 'Overview', icon: Home, href: '/dashboard' },
        { name: 'Profile', icon: User, href: '/dashboard/profile' },
        { name: 'Classroom', icon: BookOpen, href: '/dashboard/classroom' },
        { name: 'Settings', icon: Settings, href: '/dashboard/settings' },
    ];

    const handleNavigation = (href: string) => {
        router.push(href);
        onMobileClose();
    };

    return (
        <>
        {/* Mobile Overlay */}
        <div 
            className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
            isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={onMobileClose}
        />

        {/* Sidebar */}
        <aside className={`
            fixed top-0 left-0 h-full bg-white shadow-xl z-50 
            transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-20 overflow-x-hidden' : 'w-64'}
            ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
            <div className="flex flex-col h-full relative">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className={`flex items-center transition-all duration-300 ${
                    isCollapsed ? 'justify-center w-full' : 'space-x-3'
                    }`}>
                        <div className="p-2 bg-gradient-to-r from-blue-600 to-red-600 rounded-xl shadow-lg">
                            <GraduationCap className="h-7 w-7 text-white" />
                        </div>
                        {!isCollapsed && (
                            <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-800">TSI</span>
                            <span className="text-xs text-gray-500">Learning Platform</span>
                            </div>
                        )}
                    </div>
                    
                    <button
                    onClick={isMobileOpen ? onMobileClose : onToggle}
                    className={`${(isMobileOpen && window.innerWidth < 1024) || isCollapsed && ''}
                    p-2 rounded-lg hover:bg-gray-100 transition-colors`}
                    >
                        {(isMobileOpen && window.innerWidth < 1024) || isCollapsed ? 
                            <PanelLeft className="h-5 w-5 text-gray-600" /> : 
                            <PanelLeftClose className="h-5 w-5 text-gray-600" />
                        }
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-1 overflow-x-hidden overflow-y-auto">
                    {navigationItems.map((item) => {
                    const isActive = pathname === item.href || 
                        (item.href !== '/dashboard' && pathname.startsWith(item.href));
                    
                    return (
                        <div key={item.name} className="relative group">
                        <button
                            onClick={() => handleNavigation(item.href)}
                            className={`
                            w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium 
                            transition-all duration-200 relative
                            ${isActive
                                ? 'bg-gradient-to-r from-blue-50 to-red-50 text-blue-700 shadow-sm border border-blue-100'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }
                            ${isCollapsed ? 'justify-center' : ''}
                            `}
                        >
                            <item.icon className={`h-5 w-5 flex-shrink-0 ${
                            isActive ? 'text-blue-600' : 'text-gray-500'
                            }`} />
                            {!isCollapsed && (
                            <span className="ml-4 font-medium">{item.name}</span>
                            )}
                            {isActive && !isCollapsed && (
                            <div className="absolute right-3 w-2 h-2 bg-blue-600 rounded-full" />
                            )}
                        </button>
                        
                        {/* Tooltip for collapsed state */}
                        {isCollapsed && (
                            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                            {item.name}
                            <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                            </div>
                        )}
                        </div>
                    );
                    })}
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50/30">
                    <div className={`flex items-center mb-4 ${isCollapsed ? 'justify-center' : ''}`}>
                    <div className="relative">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-blue-500 to-red-600 flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">
                            {user?.firstName?.[0]}{user?.lastName?.[0]}
                        </span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                    {!isCollapsed && (
                        <div className="ml-4 flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                            {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            {user?.email}
                        </p>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                            Online
                        </span>
                        </div>
                    )}
                    </div>
                    
                    <div className="relative group">
                    <button
                        onClick={handleSignOut}
                        className={`
                        w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium 
                        text-red-600 hover:bg-red-50 transition-all duration-200
                        ${isCollapsed ? 'justify-center' : ''}
                        `}
                    >
                        <LogOut className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && <span className="ml-4">Sign Out</span>}
                    </button>
                    
                    {isCollapsed && (
                        <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                        Sign Out
                        <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900" />
                        </div>
                    )}
                    </div>
                </div>
            </div>
        </aside>
        </>
    );
};

export default Sidebar;