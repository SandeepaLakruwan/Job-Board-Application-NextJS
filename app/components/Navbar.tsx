'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="flex items-center justify-between py-6 px-8 bg-gray-800 text-white border-b mb-8 shadow-lg">
      <Link href="/" className="text-3xl font-bold text-blue-400 hover:text-blue-300 transition-all">
        Mini Job Board
      </Link>

      <div className="space-x-6 flex items-center">
        <Link href="/" className="text-lg hover:underline">
          Home
        </Link>

        {session ? (
          <>
            <Link href="/post" className="text-lg hover:underline">
              Post Job
            </Link>
            <Link href="/dashboard" className="text-lg hover:underline">
              Dashboard
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="text-lg hover:underline text-blue-500"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/auth/login" className="text-lg hover:underline text-blue-500">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
