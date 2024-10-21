"use client";

import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../src/lib/firebase';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <Button onClick={handleLogout} variant="outline" className="w-full mt-4">
      Logout
    </Button>
  );
}
