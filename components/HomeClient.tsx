'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeClient() {
  const router = useRouter();

  useEffect(() => {
    console.log('Client-side effect');
  }, []);

  return <div>This part is client-side only</div>;
}
