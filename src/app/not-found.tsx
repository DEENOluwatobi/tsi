'use client'
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent mb-6">
                    404
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                    Page Not Found
                </h2>
                <p className="text-gray-600 max-w-md mx-auto mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link 
                href="/" 
                className="inline-flex items-center px-6 py-3 text-lg font-medium rounded-lg text-white bg-gradient-to-r from-red-500 to-blue-500 hover:shadow-lg transition-shadow"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Return Home
                </Link>
            </div>
        </div>
    );
}