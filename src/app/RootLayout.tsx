'use client';
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles from "@/components/magicui/particles";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import AuthProvider from '@/features/auth/AuthProvider';
import LoadingPage from "@/features/components/LoadingPage";

export default function RootLayout({
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
    <html lang="en">
      <body
        className={`w-full h-full overflow-x-hidden`}
      >
        <Provider store={store}>
          <PersistGate loading={<LoadingPage/>} persistor={persistor}>
              <AuthProvider>
                {children}
              </AuthProvider>
          </PersistGate>
        </Provider>
        
        <Particles
          className="absolute inset-0 z-0 w-full"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
      </body>
    </html>
  )
}
