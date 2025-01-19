import { metadata } from "./metadata";
import RootLayout from "./RootLayout";
import "./globals.css";
import Header from "@/features/components/Header";
import Footer from "@/features/components/Footer";

export { metadata };

export default function ServerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <RootLayout>
      <Header/>
      <div className="">
        {children}
      </div>
      <Footer/>
    </RootLayout>
  );
}

