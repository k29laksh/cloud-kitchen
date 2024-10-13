import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'sonner';
 

import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KitchenConn",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
          <Header />
          <main className="">{children}</main>
          <Footer/>
          <Toaster />
      </body>
    </html>
  );
}
