// app/components/Header.tsx
'use client'; // This component uses client-side hooks

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Import usePathname

const Header = () => {
  const pathname = usePathname(); // Get the current path

  // Helper function to check if a link is active
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    // Fixed at the top, full width, high z-index
    <header className="fixed top-0 left-0 w-full z-40 bg-transparent text-white pt-4 pb-4">
      <nav className="flex justify-around items-center h-full text-lg md:text-xl lg:text-2xl font-bold">
        {/* Each link will take up its share of the space and be centered */}
        <Link
          href="/"
          className={`flex-1 text-center hover:text-gray-300 py-2 ${
            isActive('/') ? 'underline underline-offset-4' : ''
          }`}
        >
          HOME
        </Link>
        <Link
          href="/work"
          className={`flex-1 text-center hover:text-gray-300 py-2 ${
            isActive('/work') ? 'underline underline-offset-4' : ''
          }`}
        >
          WORK
        </Link>
        <Link
          href="/recognition"
          className={`flex-1 text-center hover:text-gray-300 py-2 ${
            isActive('/recognition') ? 'underline underline-offset-4' : ''
          }`}
        >
          RECOGNITION
        </Link>
        <Link
          href="/about"
          className={`flex-1 text-center hover:text-gray-300 py-2 ${
            isActive('/about') ? 'underline underline-offset-4' : ''
          }`}
        >
          ABOUT
        </Link>
      </nav>
    </header>
  );
};

export default Header;