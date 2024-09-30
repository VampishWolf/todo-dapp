import ContextProvider from '@/context';
import type { Metadata } from "next";
import localFont from "next/font/local";
import { headers } from "next/headers";

import { Toaster } from '@/components/ui/sonner';
import { ReactNode } from "react";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const sylviaAngel = localFont({
  src: "./fonts/SylviaAngel.otf",
  variable: "--font-sylvia-angel",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookies = headers().get('cookie')

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sylviaAngel.variable} antialiased bg-[#f8f7f4] max-w-[1020px] mx-auto border-x-black border-x-2 min-h-lvh`}
      >
        <ContextProvider cookies={cookies}>{children}</ContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
