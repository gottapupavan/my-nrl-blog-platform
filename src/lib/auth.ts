// src/lib/auth.ts
// This file contains server actions to handle authentication state changes.
'use server';
import { signOut as nextAuthSignOut } from "next-auth/react";

// Re-export signOut as a server action
export async function signOut() {
  // Redirects to the homepage (/) after logging out
  await nextAuthSignOut({ redirect: true, callbackUrl: '/' }); 
}