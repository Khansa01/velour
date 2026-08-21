"use client";

import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const links = ["New Arrivals", "Skincare", "Makeup", "Fragrance", "Brands"];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="border-b border-[rgba(201,168,124,0.2)] bg-[#1a1a1a]">
      <div className="flex items-center justify-between px-6 md:px-8 py-3.5">
        <span className="text-xl font-medium tracking-[4px] text-white">VELOUR</span>

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
          <Search size={20} className="cursor-pointer hover:text-[#c9a87c] transition-colors" />
          <Heart size={20} className="hidden md:block cursor-pointer hover:text-[#c9a87c] transition-colors" />
          <Link href="/cart">
            <ShoppingBag size={20} className="cursor-pointer hover:text-[#c9a87c] transition-colors" />
          </Link>
          <User size={20} className="hidden md:block cursor-pointer hover:text-[#c9a87c] transition-colors" />
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