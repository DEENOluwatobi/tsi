'use client';
import { useAdmin } from '@/hooks/useAdmin';
import { Users, Plus, Search, Filter } from 'lucide-react';

export default function AdminUsers() {
    const { admin, isSuperAdmin } = useAdmin();

    return (
        <div className="space-y-6">
        <div className="flex items-center justify-between">
            <div>
            <h1 className="text-2xl font-bold text-white">User Management</h1>
            <p className="text-gray-400 mt-1">Manage all platform users</p>
            </div>
            {isSuperAdmin && (
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Plus size={16} />
                <span>Add User</span>
            </button>
            )}
        </div>

        <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
            <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
            </div>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Filter size={16} />
                <span>Filter</span>
            </button>
            </div>

            <div className="text-center py-12 text-gray-400">
            <Users size={48} className="mx-auto mb-4 opacity-50" />
            <p>User management interface will be implemented here</p>
            </div>
        </div>
        </div>
    );
}
