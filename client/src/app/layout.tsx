import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from '@next/font/google';
import { Toaster } from 'sonner';
import ReduxProvider from "./redux-provider";
 

import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'], // Add weights as needed
  style: ['normal', 'italic'], // Optional
});
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
      <ReduxProvider>
          <Header />
          <main className="">{children}</main>
          <Footer/>
          </ReduxProvider>
          <Toaster />
      </body>
    </html>
  );
}
