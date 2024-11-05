import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Poppins } from '@next/font/google';
import { Toaster } from 'sonner';
import ReduxProvider from "./redux-provider";

 

import "./globals.css";

import ConditionalFooter from "@/components/Footer/ConditionalFooter";
import ConditionalHeader from "@/components/Header/ConditionalHeader";
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
          <ConditionalHeader />
          <main className="">{children}</main>
          <ConditionalFooter/>
          </ReduxProvider>
          <Toaster />
      </body>
    </html>
  );
}
