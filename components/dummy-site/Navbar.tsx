"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Container } from "./Container";
import { Search, ShoppingBag, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/products?category=Hiking Shoes", label: "Hiking shoes", category: "Hiking Shoes" },
  { href: "/products?category=Tents", label: "Tent", category: "Tents" },
  { href: "/products?category=Backpacks", label: "Backpack", category: "Backpacks" },
  { href: "/products?category=Jackets", label: "Shell jackets", category: "Jackets" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function isActive(category: string) {
    return pathname === "/products" && searchParams.get("category") === category;
  }

  return (
    <nav className="bg-[#FFFDEC] border-b border-[#304838]/10 sticky top-0 z-40">
      <Container>
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-10">
            <Link href="/" className="text-3xl font-extrabold tracking-tighter text-[#304838]">
              OUTWARD.
            </Link>

            {/* Desktop Links (Visible on 768px+) */}
            <div className="hidden md:flex items-center gap-4 lg:gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.category}
                  href={link.href}
                  aria-current={isActive(link.category) ? "page" : undefined}
                  className={`text-xs lg:text-sm font-bold tracking-wide transition-colors uppercase ${
                    isActive(link.category)
                      ? "text-[#304838] underline underline-offset-4 decoration-2"
                      : "text-[#304838] hover:text-[#69FFB6]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button aria-label="Search" className="text-[#304838] hover:text-[#69FFB6] transition-colors">
              <Search className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <button aria-label="Shopping bag, 0 items" className="text-[#304838] hover:text-[#69FFB6] transition-colors relative">
              <ShoppingBag className="w-6 h-6" strokeWidth={2.5} />
              <span aria-hidden="true" className="absolute -top-2 -right-2 bg-[#304838] text-[#69FFB6] text-[10px] font-bold px-1.5 py-0.5 rounded-full">0</span>
            </button>

            {/* Mobile Menu Burger Icon (Visible below 768px) */}
            <button
              className="text-[#304838] hover:text-[#69FFB6] transition-colors md:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-7 h-7" strokeWidth={2.5} /> : <Menu className="w-7 h-7" strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-[#304838]/10 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-200">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.category}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={isActive(link.category) ? "page" : undefined}
                className={`text-sm font-bold tracking-wide p-3 rounded-lg transition-colors uppercase ${
                  isActive(link.category)
                    ? "bg-[#304838] text-[#69FFB6]"
                    : "text-[#304838] hover:bg-[#69FFB6] bg-transparent"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </Container>
    </nav>
  );
}
