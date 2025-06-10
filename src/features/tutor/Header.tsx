'use client';
import React, { JSX, useState } from 'react';
import { Bell, LogOut, Menu, Search, User } from 'lucide-react';
import { logoutTutor } from '@/store/slices/tutorSlice';
import { useRouter } from 'next/navigation';
import { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';

interface Tutor {
  firstname: string;
  lastname: string;
  course: string;
  email?: string;
}

interface HeaderProps {
  tutor: Tutor;
  onLogout: () => void;
  sidebarMinimized: boolean;
  toggleSidebar: () => void;
}

export default function Header({ tutor, onLogout, sidebarMinimized, toggleSidebar }: HeaderProps): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState<boolean>(false);

  const handleLogout = (): void => {
    setShowLogoutModal(false);
    onLogout();
  };

  const isLogout = () => {
    dispatch(logoutTutor());
    router.push('/tutor/login');
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div>
                <h1 className="text-xl font-bold text-black">
                  Welcome back, {tutor.firstname}!
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  Manage your courses and track student progress
                </p>
              </div>
            </div>

            {/* Center Section - Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search students, courses..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center space-x-3 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium text-black">
                      {tutor.firstname} {tutor.lastname}
                    </p>
                    <p className="text-xs text-gray-600">{tutor.course}</p>
                  </div>
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {tutor.firstname.charAt(0)}{tutor.lastname.charAt(0)}
                    </span>
                  </div>
                </button>

                {/* Profile Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-medium text-black">
                        {tutor.firstname} {tutor.lastname}
                      </p>
                      <p className="text-xs text-gray-600">{tutor.course}</p>
                    </div>
                    
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>View Profile</span>
                    </button>
                    
                    <button 
                      onClick={isLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>
      </header>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-black mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to logout?</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={isLogout}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dropdown Overlay */}
      {showProfileDropdown && (
        <div 
          className="fixed inset-0 z-10"
          onClick={() => setShowProfileDropdown(false)}
        />
      )}
    </>
  );
}

