import React from 'react'
import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-white">
            <ShoppingCart className="h-7 w-7 text-green-500" />
            <span>
              <span className="text-green-500">Fresh</span>
              <span className="text-white">Cart</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm">
            Quality products at the best prices. Shop confidently and enjoy fast delivery.
          </p>
          <div className="flex gap-3 mt-2">
            <Link href="#" className="p-2 rounded-full bg-gray-800 hover:bg-green-600 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" /></svg>
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link href="#" className="p-2 rounded-full bg-gray-800 hover:bg-green-600 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.942 5.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.586 11.586 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3 17.392 17.392 0 0 0-2.868 11.662 15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.638 10.638 0 0 1-1.706-.83c.143-.106.283-.217.418-.331a11.664 11.664 0 0 0 10.118 0c.137.114.277.225.418.331-.544.328-1.116.606-1.71.832a12.58 12.58 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM8.678 14.813a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.929 1.929 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" /></svg>
              <span className="sr-only">Discord community</span>
            </Link>
            <Link href="#" className="p-2 rounded-full bg-gray-800 hover:bg-green-600 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" /></svg>
              <span className="sr-only">Twitter page</span>
            </Link>
            <Link href="#" className="p-2 rounded-full bg-gray-800 hover:bg-green-600 transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2a10 10 0 1 0 10 10A10.009 10.009 0 0 0 12 2Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.093 20.093 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366Z" clipRule="evenodd" /></svg>
              <span className="sr-only">GitHub account</span>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold uppercase text-white">Resources</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="/brands" className="hover:text-green-500 transition">Brands</Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-green-500 transition">Categories</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold uppercase text-white">Follow Us</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="https://github.com/themesberg/flowbite" className="hover:text-green-500 transition">Github</Link>
            </li>
            <li>
              <Link href="https://discord.gg/4eeurUVvTy" className="hover:text-green-500 transition">Discord</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-lg font-semibold uppercase text-white">Legal</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link href="#" className="hover:text-green-500 transition">Privacy Policy</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-green-500 transition">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <span>© 2026 <Link href="/" className="hover:text-green-500 transition">FreshCart</Link>. All Rights Reserved.</span>
          <div className="flex mt-2 md:mt-0 gap-4">
            <Link href="#" className="hover:text-green-500 transition">Facebook</Link>
            <Link href="#" className="hover:text-green-500 transition">Twitter</Link>
            <Link href="#" className="hover:text-green-500 transition">Instagram</Link>
            <Link href="#" className="hover:text-green-500 transition">GitHub</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}