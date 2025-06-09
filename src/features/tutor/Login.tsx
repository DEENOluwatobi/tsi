'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { loginTutor, clearTutorError, checkTutorAuth } from '@/store/slices/tutorSlice';
import { AppDispatch, RootState } from '@/store';

export default function TutorLogin() {
    const [formData, setFormData] = useState({
        email: '',
        passkey: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { isLoading, error, isAuthenticated } = useSelector((state: RootState) => state.tutor);

    useEffect(() => {
        // Check if tutor is already authenticated
        dispatch(checkTutorAuth());
    }, [dispatch]);

    useEffect(() => {
        if (isAuthenticated) {
        router.push('/tutor/dashboard');
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
        dispatch(clearTutorError());
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.email || !formData.passkey) {
        return;
        }

        dispatch(loginTutor({
        email: formData.email.trim(),
        passkey: formData.passkey
        }));
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <div>
            <div className="flex justify-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                </div>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold text-black">
                Tutor Login
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
                Access your tutor dashboard
            </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
                    Email Address
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 text-black"
                    placeholder="Enter your email"
                />
                </div>

                <div>
                <label htmlFor="passkey" className="block text-sm font-medium text-black mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 text-black pr-12"
                    placeholder="Enter your passkey"
                    />
                    <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                    >
                    {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )}
                    </button>
                </div>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading || !formData.email || !formData.passkey}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
            >
                {isLoading ? (
                <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                </div>
                ) : (
                'Sign In'
                )}
            </button>

            <div className="text-center">
                <a href="/" className="text-sm text-gray-600 hover:text-blue-500 transition duration-200">
                ← Back to main site
                </a>
            </div>
            </form>
        </div>
        </div>
    );
}