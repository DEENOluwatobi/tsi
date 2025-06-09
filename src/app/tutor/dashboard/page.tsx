'use client';
import React, { JSX } from 'react';
import OverviewPage from '@/features/tutor/Overview';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Page = (): JSX.Element => {
    const { tutor } = useSelector((state: RootState) => state.tutor);

    if (!tutor) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading...</h2>
                    <p className="text-gray-600">Please wait while we load your dashboard.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <OverviewPage tutor={tutor} />
        </div>
    );
};

export default Page;