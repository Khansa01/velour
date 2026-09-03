"use client";

import { useCartStore } from "@/app/store/cartStore";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const links = ["New Arrivals", "Skincare", "Makeup", "Fragrance", "Brands"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const router = useRouter();
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const isAdmin = (session?.user as any)?.role === "admin";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchOpen(false);
    setQuery("");
    router.push(`/products?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <nav className="border-b border-[rgba(201,168,124,0.2)] bg-[#1a1a1a]">
      {/* Search bar overlay */}
      {searchOpen && (
        <div className="absolute inset-x-0 top-0 z-50 bg-[#1a1a1a] border-b border-[rgba(201,168,124,0.2)] px-6 md:px-8 py-3.5 flex items-center gap-4">
          <Search size={18} className="text-[#c9a87c] shrink-0" />
          <form onSubmit={handleSearch} className="flex-1">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-transparent text-white text-sm tracking-wide placeholder:text-[#a89a80] focus:outline-none"
            />
          </form>
          <X
            size={18}
            className="text-[#a89a80] cursor-pointer hover:text-white transition-colors"
            onClick={() => { setSearchOpen(false); setQuery(""); }}
          />
        </div>
      )}

      <div className="flex items-center justify-between px-6 md:px-8 py-3.5">
        <Link href="/">
          <span className="text-xl font-medium tracking-[4px] text-white">VELOUR</span>
        </Link>
        {isAdmin && (
          <Link
            href="/admin"
            className="text-[11px] tracking-[2px] uppercase text-[#c9a87c] border border-[rgba(201,168,124,0.2)] px-3 py-1.5 hover:border-[#c9a87c] transition-colors"
          >
            Admin Panel
          </Link>
        )}

        <ul className="hidden md:flex gap-6 list-none">
          {links.map((l) => (
            <li key={l}>
              <a href="#" className="text-[13px] text-white/70 hover:text-[#c9a87c] tracking-wide transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 items-center text-white/70">
          <Search
            size={20}
            className="cursor-pointer hover:text-[#c9a87c] transition-colors"
            onClick={() => setSearchOpen(true)}
          />
          <Link href="/wishlist">
            <Heart size={20} className="hidden md:block cursor-pointer hover:text-[#c9a87c] transition-colors" />
          </Link>
          <Link href="/cart" className="relative">
            <ShoppingBag size={20} className="cursor-pointer hover:text-[#c9a87c] transition-colors" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#c9a87c] text-[#1a1a1a] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <div className="relative">
            {session ? (
              <div
                onClick={() => setShowMenu(!showMenu)}
                className="hidden md:flex items-center justify-center w-7 h-7 rounded-full bg-[#c9a87c] text-[#1a1a1a] text-[11px] font-bold cursor-pointer hover:bg-[#b8976b] transition-colors"
              >
                {session.user?.name?.[0]?.toUpperCase() ?? session.user?.email?.[0]?.toUpperCase()}
              </div>
            ) : (
              <User
                size={20}
                className="hidden md:block cursor-pointer hover:text-[#c9a87c] transition-colors"
                onClick={() => setShowMenu(!showMenu)}
              />
            )}
            {showMenu && (
              <div className="absolute right-0 top-8 bg-[#1a1a1a] border border-[rgba(201,168,124,0.2)] rounded-xl w-52 py-3 z-50 shadow-xl">
                {session ? (
                  <>
                    <div className="px-4 pb-3 border-b border-[rgba(201,168,124,0.1)]">
                      <p className="text-[11px] tracking-[2px] uppercase text-[#c9a87c] mb-1">Signed in as</p>
                      <p className="text-[13px] text-white truncate">{session.user?.email}</p>
                    </div>
                    {isAdmin && (
                      <Link href="/admin" onClick={() => setShowMenu(false)} className="block px-4 py-2.5 text-[13px] text-[#a89a80] hover:text-[#c9a87c] hover:bg-[#222] transition-colors mt-1">
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => { signOut(); setShowMenu(false); }}
                      className="w-full text-left px-4 py-2.5 text-[13px] text-[#a89a80] hover:text-white hover:bg-[#222] transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setShowMenu(false)} className="block px-4 py-2.5 text-[13px] text-[#a89a80] hover:text-[#c9a87c] hover:bg-[#222] transition-colors">
                      Sign In
                    </Link>
                    <Link href="/register" onClick={() => setShowMenu(false)} className="block px-4 py-2.5 text-[13px] text-[#a89a80] hover:text-[#c9a87c] hover:bg-[#222] transition-colors">
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <Menu size={20} className="md:hidden cursor-pointer hover:text-[#c9a87c]" onClick={() => setOpen(!open)} />
        </div>
      </div>

      {open && (
        <ul className="md:hidden flex flex-col px-6 pb-4 gap-3 list-none">
          {links.map((l) => (
            <li key={l}>
              <a href="#" className="text-[13px] text-[#a89a80] hover:text-[#c9a87c] tracking-wide">
                {l}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}