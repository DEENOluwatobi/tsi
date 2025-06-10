'use client';
import { useAdmin } from '@/hooks/useAdmin';
import { Settings, Save, Bell, Shield, Database } from 'lucide-react';

export default function AdminSettings() {
    const { admin, isSuperAdmin } = useAdmin();

    const settingSections = [
        {
        title: 'General Settings',
        icon: <Settings size={20} />,
        description: 'Basic platform configuration',
        available: true
        },
        {
        title: 'Security Settings',
        icon: <Shield size={20} />,
        description: 'Authentication and security options',
        available: isSuperAdmin
        },
        {
        title: 'Database Settings',
        icon: <Database size={20} />,
        description: 'Database configuration and maintenance',
        available: isSuperAdmin
        },
        {
        title: 'Notifications',
        icon: <Bell size={20} />,
        description: 'System notification preferences',
        available: true
        }
    ];

    return (
        <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold text-white">Admin Settings</h1>
            <p className="text-gray-400 mt-1">Configure platform settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settingSections.map((section, index) => (
            <div
                key={index}
                className={`bg-gray-800 rounded-lg border border-gray-700 p-6 ${
                section.available 
                    ? 'hover:bg-gray-750 cursor-pointer transition-colors' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
            >
                <div className="flex items-start space-x-4">
                <div className="text-purple-400">
                    {section.icon}
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">
                    {section.title}
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                    {section.description}
                    </p>
                    {!section.available && (
                    <p className="text-red-400 text-xs mt-2">
                        Super Admin access required
                    </p>
                    )}
                </div>
                </div>
            </div>
            ))}
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <h2 className="text-lg font-semibold text-white mb-4">Current Admin Info</h2>
            <div className="space-y-3 text-sm">
            <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-white">{admin?.firstname} {admin?.lastname}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400">Email:</span>
                <span className="text-white">{admin?.email}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400">Role:</span>
                <span className="text-white capitalize">{admin?.role}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-gray-400">Designation:</span>
                <span className="text-white capitalize">{admin?.designation}</span>
            </div>
            </div>
        </div>
        </div>
    );
}