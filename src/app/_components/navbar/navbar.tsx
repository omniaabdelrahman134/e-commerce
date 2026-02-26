'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { CartType } from '@/app/_types/carrt-types/cartTypes';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { DropdownMenuBasic } from '../dropMenu/dropMenu';

export default function Navbar() {
  const { status, data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const { data: cartData } = useQuery<CartType>({
    queryKey: ['Get-cart'],
    queryFn: async () => {
      const res = await fetch(`/api/cart`);
      return res.json();
    },
    enabled: status === 'authenticated',
  });

  const cartCount = cartData?.numOfCartItems ?? 0;

  function logout() {
    signOut({ callbackUrl: '/login' });
  }

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Brands', href: '/brands' },
    { name: 'Categories', href: '/categories' },
    { name: 'Wishlist', href: '/wishList' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-bold tracking-tight"
        >
          <ShoppingCart className="h-7 w-7 text-green-500" />
          <span>
            <span className="text-green-500">Fresh</span>
            <span className="text-gray-900">Cart</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="transition hover:text-green-600"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {status === 'authenticated' ? (
            <>
              {/* Cart */}
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-green-600 transition" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-green-500 px-1 text-xs font-medium text-white">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Dropdown */}
              <div className="hidden md:block">
                <DropdownMenuBasic logout={logout} />
              </div>
            </>
          ) : (
            <div className="hidden md:flex items-center gap-4 text-sm font-medium">
              <Link
                href="/login"
                className="text-gray-600 hover:text-green-600 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white shadow-md">
          <div className="flex flex-col gap-4 px-6 py-4 text-gray-700 font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="hover:text-green-600 transition"
              >
                {link.name}
              </Link>
            ))}

            {status === 'authenticated' ? (
              <>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="hover:text-green-600 transition"
                >
                  Cart ({cartCount})
                </Link>
                <button
                  onClick={logout}
                  className="text-left text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  Login
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}