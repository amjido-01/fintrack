"use client"
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';

export default function RootLayouts({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith('/auth/');

  return (
    <>
      {!isAuthPage && <Navbar />}
      {children}
    </>
  );
}