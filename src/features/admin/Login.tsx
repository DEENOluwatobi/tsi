'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { loginAdmin, clearAdminError, checkAdminAuth } from '@/store/slices/adminSlice';
import { AppDispatch, RootState } from '@/store';
import Link from 'next/link';
import { Shield, Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
    const [formData, setFormData] = useState({
        email: '',
        passkey: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.admin);

    useEffect(() => {
        // Check if admin is already authenticated
        dispatch(checkAdminAuth());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
        router.push('/admin/dashboard');
        }
    }, [isAuthenticated, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
        
        // Clear error when user starts typing
        if (error) {
        dispatch(clearAdminError());
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.email || !formData.passkey) {
        return;
        }

        dispatch(loginAdmin({
        email: formData.email.trim(),
        passkey: formData.passkey
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
            <div className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
                <Shield size={28} className="text-white" />
                </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-white">
                Admin Access
            </h2>
            <p className="mt-2 text-center text-sm text-gray-300">
                Secure administrative dashboard
            </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-800 text-white placeholder-gray-400"
                    placeholder="Enter your admin email"
                />
                </div>

                <div>
                <label htmlFor="passkey" className="block text-sm font-medium text-gray-200 mb-2">
                    Passkey
                </label>
                <div className="relative">
                    <input
                    id="passkey"
                    name="passkey"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.passkey}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 bg-gray-800 text-white placeholder-gray-400 pr-12"
                    placeholder="Enter your passkey"
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-300"
                    >
                    {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                    ) : (
                        <Eye className="w-5 h-5" />
                    )}
                    </button>
                </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm backdrop-blur-sm">
                {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading || !formData.email || !formData.passkey}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 shadow-lg"
            >
                {isLoading ? (
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Authenticating...
                </div>
                ) : (
                'Access Dashboard'
                )}
            </button>

            <div className="text-center">
                <Link href="/" className="text-sm text-gray-300 hover:text-blue-400 transition duration-200">
                ← Back to main site
                </Link>
            </div>
            </form>

            <div className="text-center">
            <p className="text-xs text-gray-400">
                This is a secure administrative area. Unauthorized access is prohibited.
            </p>
            </div>
        </div>
        </div>
    );
}