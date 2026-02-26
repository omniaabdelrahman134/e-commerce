"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { User, Mail, Shield, ShoppingBag, Heart, LogOut, ShoppingCart } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading profile...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-lg">Please login first.</p>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header Section */}
        <div className="bg-green-600 h-32 relative">
          <div className="absolute -bottom-12 left-8">
            <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-md border-4 border-white">
              <User size={40} className="text-green-600" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-16 px-8 pb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            {user.name}
          </h2>

          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <Mail size={16} />
            <span>{user.email}</span>
          </div>

          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            <Shield size={14} />
            {user.role}
          </div>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-2 gap-4 mt-8">

            <Link
              href="/allorders"
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition rounded-xl py-3 font-medium"
            >
              <ShoppingBag size={18} />
              My Orders
            </Link>

            <Link
              href="/wishList"
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition rounded-xl py-3 font-medium"
            >
              <Heart size={18} />
              Wishlist
            </Link>

            <Link
              href="/cart"
              className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition rounded-xl py-3 font-medium"
            >
              <ShoppingCart size={18} />
              My Cart
            </Link>


           

            <button
              onClick={() => signOut()}
              className="flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 transition rounded-xl py-3 font-medium"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}