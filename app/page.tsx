"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../src/context/AuthContext';
import Link from 'next/link';
import { Button } from './components/ui/button';

export default function LandingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/inbox');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return null; // This will prevent any flash of content before redirect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <div>
          <h1 className="text-4xl font-bold text-center text-purple-800">Welcome</h1>
          <p className="mt-2 text-center text-gray-600">Your personal content management assistant</p>
        </div>
        <div className="mt-8 space-y-4">
          <Link href="/login" passHref>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Sign In
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
