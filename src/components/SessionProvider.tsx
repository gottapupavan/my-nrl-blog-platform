// src/components/SessionProvider.tsx
'use client';
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

// This wrapper enables client-side NextAuth features (like useSession)
export default function AuthProvider({ children }: Props) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}