import React from 'react'

export default function ServerLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="pt-24">
            {children}
        </div>
    );
}

