"use client";

import React from 'react';
import { useAuth } from '../../src/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ContentLibrary from '../components/ContentLibrary';

export default function ContentLibraryPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return <ContentLibrary />;
}
