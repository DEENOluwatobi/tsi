'use client';

import { 
  BarChart3, 
  BookOpen, 
  FileText, 
  Home, 
  Menu, 
  Settings, 
  TrendingUp, 
  User, 
  Users, 
  X 
} from 'lucide-react';
import { JSX } from 'react';

type ActiveTab = 'overview' | 'students' | 'courses' | 'assignments' | 'analytics' | 'profile' | 'settings';

interface MenuItem {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isMinimized: boolean;
  toggleSidebar: () => void;
}

const menuItems: MenuItem[] = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'courses', label: 'My Courses', icon: BookOpen },
  { id: 'assignments', label: 'Assignments', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab, isMinimized, toggleSidebar }: SidebarProps): JSX.Element {
  return (
    <>
      {/* Mobile Overlay */}
      {!isMinimized && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-30 transition-all duration-300 ${
        isMinimized ? 'w-16' : 'w-64'
      } ${isMinimized ? 'translate-x-0' : 'translate-x-0'} lg:translate-x-0 ${
        isMinimized ? '' : 'lg:w-64'
      }`}>
        
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isMinimized && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                TSI
              </span>
            </div>
          )}
          
          {isMinimized && (
            <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">T</span>
            </div>
          )}
        </div>

        {/* Toggle Button */}
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center lg:justify-start space-x-2 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            {isMinimized ? (
              <Menu className="w-5 h-5" />
            ) : (
              <>
                <X className="w-5 h-5" />
                {!isMinimized && <span className="text-sm">Minimize</span>}
              </>
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 pb-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-red-500 to-blue-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                    }`}
                    title={isMinimized ? item.label : ''}
                  >
                    <IconComponent className={`w-5 h-5 ${isMinimized ? 'mx-auto' : ''} ${
                      isActive ? 'text-white' : 'text-gray-600 group-hover:text-black'
                    }`} />
                    {!isMinimized && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Section */}
        {!isMinimized && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-gradient-to-r from-red-50 to-blue-50 border border-gray-200 rounded-lg p-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold text-sm text-black mb-1">Upgrade to Pro</h4>
                <p className="text-xs text-gray-600 mb-3">Get advanced analytics and more features</p>
                <button className="w-full bg-gradient-to-r from-red-500 to-blue-500 text-white text-xs py-2 px-3 rounded-lg hover:opacity-90 transition-opacity duration-200">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}