'use client';
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import AuthProvider from '@/features/auth/AuthProvider';

export default function DashLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { resolvedTheme } = useTheme();
    const [color, setColor] = useState("#ffffff");

    useEffect(() => {
        setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
    }, [resolvedTheme]);

    return (
        <Provider store={store}>
          <PersistGate loading={
              <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-blue-500"></div>
              </div>
            } persistor={persistor}>
              <AuthProvider>
                {children}
              </AuthProvider>
          </PersistGate>
        </Provider>
    )
}
