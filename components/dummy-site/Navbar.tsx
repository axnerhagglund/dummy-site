"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "./Container";
import { Search, ShoppingBag, Menu, X } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#FFFDEC] border-b border-[#304838]/10 sticky top-0 z-40">
      <Container>
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-3xl font-extrabold tracking-tighter text-[#304838]">
              OUTWARD.
            </Link>

            {/* Desktop Links (Visible on 768px+) */}
            <div className="md:flex items-center gap-4 lg:gap-8">
              <Link href="/products?category=Hiking Shoes" className="text-xs lg:text-sm font-bold tracking-wide text-[#304838] hover:text-[#69FFB6] transition-colors uppercase">Hiking shoes</Link>
              <Link href="/products?category=Tents" className="text-xs lg:text-sm font-bold tracking-wide text-[#304838] hover:text-[#69FFB6] transition-colors uppercase">Tent</Link>
              <Link href="/products?category=Backpacks" className="text-xs lg:text-sm font-bold tracking-wide text-[#304838] hover:text-[#69FFB6] transition-colors uppercase">Backpack</Link>
              <Link href="/products?category=Jackets" className="text-xs lg:text-sm font-bold tracking-wide text-[#304838] hover:text-[#69FFB6] transition-colors uppercase">Shell jackets</Link>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-[#304838] hover:text-[#69FFB6] transition-colors hidden sm:block">
              <Search className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <button className="text-[#304838] hover:text-[#69FFB6] transition-colors relative">
              <ShoppingBag className="w-6 h-6" strokeWidth={2.5} />
              <span className="absolute -top-2 -right-2 bg-[#304838] text-[#69FFB6] text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
            </button>

            {/* Mobile Menu Burger Icon (Visible below 768px) */}
            <button
              className="text-[#304838] hover:text-[#69FFB6] transition-colors md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="w-7 h-7" strokeWidth={2.5} /> : <Menu className="w-7 h-7" strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-[#304838]/10 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
            <Link href="/products?category=Hiking Shoes" onClick={() => setIsOpen(false)} className="text-sm font-bold tracking-wide text-[#304838] hover:bg-[#69FFB6] bg-transparent p-3 rounded-lg transition-colors uppercase">Hiking shoes</Link>
            <Link href="/products?category=Tents" onClick={() => setIsOpen(false)} className="text-sm font-bold tracking-wide text-[#304838] hover:bg-[#69FFB6] bg-transparent p-3 rounded-lg transition-colors uppercase">Tent</Link>
            <Link href="/products?category=Backpacks" onClick={() => setIsOpen(false)} className="text-sm font-bold tracking-wide text-[#304838] hover:bg-[#69FFB6] bg-transparent p-3 rounded-lg transition-colors uppercase">Backpack</Link>
            <Link href="/products?category=Jackets" onClick={() => setIsOpen(false)} className="text-sm font-bold tracking-wide text-[#304838] hover:bg-[#69FFB6] bg-transparent p-3 rounded-lg transition-colors uppercase">Shell jackets</Link>
          </div>
        )}
      </Container>
    </nav>
  );
}
