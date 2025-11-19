import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ContractsPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const token = localStorage.getItem('rmn_token');
    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('rmn_token');
      router.push('/login');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          backgroundColor: '#111827',
          color: 'white',
          padding: '20px 16px',
        }}
      >
        <h1 style={{ fontSize: 
