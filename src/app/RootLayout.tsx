'use client';
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles from "@/components/magicui/particles";

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
        className={``}
      >
        {children}
        
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={80}
          color={color}
          refresh
        />
      </body>
    </html>
  )
}
