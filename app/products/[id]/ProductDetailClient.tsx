"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/products/getProducts";

const MOCK_COLORS = [
  { label: "Grey", bg: "bg-zinc-500" },
  { label: "Yellow", bg: "bg-amber-500" },
  { label: "Orange", bg: "bg-[#FF4500]" },
  { label: "Black", bg: "bg-black" },
];

const ACCORDIONS = [
  { title: "Details", content: "Crafted from premium materials for lasting performance in the field." },
  { title: "Payment Options", content: "We accept Visa, Mastercard, Swish, and Klarna." },
  { title: "Shipping", content: "Free shipping on orders over 500 SEK. Delivered within 2–5 business days." },
];

export function ProductDetailClient({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(MOCK_COLORS[0].label);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      {/* Product image */}
      <div className="bg-[#F3F3F3] w-full aspect-[4/5] lg:aspect-square flex flex-col items-center justify-center relative order-1 lg:order-2">
        <div className="w-full h-full relative p-8 md:p-16 flex items-center justify-center">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700 ease-out p-8 md:p-16"
            />
          ) : (
            <div className="text-zinc-400 font-medium text-sm">No image available</div>
          )}
        </div>
      </div>

      {/* Product info */}
      <div className="flex flex-col pt-0 lg:pt-16 order-2 lg:order-1 lg:pr-12">
        <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-black mb-6 leading-[1.05]">
          {product.name}
        </h1>

        <div className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold mb-6">
          {product.sizes?.length ? product.sizes.join(" / ") : "ONE SIZE"}
        </div>

        <div className="text-xl md:text-2xl font-normal text-black mb-8">
          {product.price} SEK
        </div>

        {/* Color Options */}
        <div role="group" aria-label="Color options" className="flex items-center gap-3 mb-10">
          {MOCK_COLORS.map((color) => (
            <button
              key={color.label}
              aria-label={color.label}
              aria-pressed={selectedColor === color.label}
              onClick={() => setSelectedColor(color.label)}
              className={`p-3 -m-1 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-[#304838] focus:ring-offset-2 ${
                selectedColor === color.label ? "ring-1 ring-offset-4 ring-zinc-400" : ""
              }`}
            >
              <span className={`block w-[18px] h-[18px] rounded-full ${color.bg}`} />
            </button>
          ))}
        </div>

        <p className="text-sm text-zinc-500 mb-16 leading-relaxed max-w-sm">
          {product.description || "This compact and durable backpack embodies a true spirit of adventure and passion for exploration."}
        </p>

        {/* Accordions */}
        <div className="border-t border-zinc-200 divide-y divide-zinc-200 w-full max-w-xs">
          {ACCORDIONS.map((item) => {
            const isOpen = openAccordion === item.title;
            return (
              <div key={item.title}>
                <button
                  onClick={() => setOpenAccordion(isOpen ? null : item.title)}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-${item.title}`}
                  className="w-full py-4 flex justify-between items-center hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#304838] focus:ring-inset"
                >
                  <span className="text-[13px] font-medium text-black">{item.title}</span>
                  <span aria-hidden="true" className="text-lg font-light text-zinc-400 transition-transform duration-200" style={{ transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                <div
                  id={`accordion-${item.title}`}
                  role="region"
                  aria-labelledby={`accordion-btn-${item.title}`}
                  hidden={!isOpen}
                  className="pb-4 text-sm text-zinc-500 leading-relaxed"
                >
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
