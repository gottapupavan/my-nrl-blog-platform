// src/app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/SessionProvider'; // <-- CRITICAL IMPORT

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NRL Dynamic Blog Platform',
  description: 'A fully dynamic blog built with Next.js and PostgreSQL.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* CRITICAL: WRAP APPLICATION WITH AUTH PROVIDER */}
        <AuthProvider> 
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}