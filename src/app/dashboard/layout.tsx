'use client'
import React, { useState } from 'react';
import DashLayout from './DashLayout';
import Sidebar from '@/features/dashboard/Sidebar';
import Header from '@/features/dashboard/Header';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    const router = useRouter();
    const { user } = useSelector((state: RootState) => state.auth);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const sidebarWidth = sidebarCollapsed ? '80px' : '256px';

    if (!user) {
        router.push('/auth/login');
    };

    return (
        <DashLayout>
            <div className="min-h-screen bg-gray-50">
                <Sidebar
                    isCollapsed={sidebarCollapsed}
                    onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                    isMobileOpen={isMobileMenuOpen}
                    onMobileClose={() => setIsMobileMenuOpen(false)}
                />

                <Header
                    onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    sidebarWidth={sidebarWidth}
                />

                <main 
                className="pt-20 transition-all duration-300 ease-in-out min-h-screen"
                style={{ 
                    marginLeft: sidebarWidth,
                    paddingLeft: '0px'
                }}
                >
                    <div className="p-2">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </div>
                </main>

                <style jsx>{`
                    @media (max-width: 1023px) {
                        main {
                            margin-left: 0 !important;
                        }
                    }
                `}</style>
            </div>
        </DashLayout>
    );
};

export default DashboardLayout;