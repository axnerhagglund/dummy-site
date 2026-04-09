"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/products/getProducts";
import { ProductGrid } from "@/components/dummy-site/ProductGrid";
import { ProductCard } from "@/components/dummy-site/ProductCard";

interface ProductsClientProps {
  initialProducts: Product[];
  initialCategory?: string;
}

const CATEGORIES = ["All Categories", "Jackets", "Pants", "Backpacks", "Tents", "Hiking Shoes"];

export function ProductsClient({ initialProducts, initialCategory = "All Categories" }: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Filter by Category
      if (selectedCategory !== "All Categories") {
        // Simple mapping to match product category field logic inside your db
        const catMap: Record<string, string> = {
          "Jackets": "shell_jacket",
          "Pants": "pants",
          "Backpacks": "backpack",
          "Tents": "tent",
          "Hiking Shoes": "hiking_shoes",
        };
        const mappedCat = catMap[selectedCategory];
        if (product.category !== mappedCat) {
          return false;
        }
      }

      // Filter by Gender
      if (selectedGenders.length > 0) {
        if (!product.gender || !selectedGenders.includes(product.gender)) {
          return false;
        }
      }

      // Filter by Size
      if (selectedSizes.length > 0) {
        if (!product.sizes || !product.sizes.some((size) => selectedSizes.includes(size))) {
          return false;
        }
      }

      return true;
    });
  }, [initialProducts, selectedCategory, selectedGenders, selectedSizes]);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <div className="w-full flex flex-col pt-8">
      {/* Elegant Header Area */}
      <div className="flex flex-col mb-10">
        <h1 className="text-4xl sm:text-[3.5rem] font-serif text-[#111] tracking-tight mb-8">
          All products
          <span className="text-sm text-zinc-400 font-sans tracking-normal ml-3 align-middle relative -top-3">
            ({filteredProducts.length})
          </span>
        </h1>

        <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-8">
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="text-[13px] text-zinc-600 font-bold tracking-wide hover:text-[#111] transition-colors flex items-center gap-2 relative"
          >
            Filters
            {/* The underline shown in the mockup under "Filters" */}
            <span className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-[#111]" />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-[13px] text-zinc-400">Sort by:</span>
            <select className="bg-transparent text-[13px] font-medium text-[#111] focus:ring-0 cursor-pointer outline-none">
              <option>Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expandable Filters Section */}
      <div className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${isFiltersOpen ? "max-h-[800px] mb-12 opacity-100" : "max-h-0 mb-0 opacity-0"}`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-[#FAF9F5] rounded-xl border border-zinc-100">
          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Category</h3>
            <div className="flex flex-col gap-3">
              {CATEGORIES.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    className="w-4 h-4 border-zinc-300 text-[#111] focus:ring-[#111]"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                  />
                  <span className={`text-[13px] transition-colors ${selectedCategory === cat ? "text-[#111] font-semibold" : "text-zinc-600 group-hover:text-[#111]"}`}>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Gender</h3>
            <div className="flex flex-col gap-3">
              {["Men", "Women", "Unisex"].map((gender) => (
                <label key={gender} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-sm border-zinc-300 text-[#111] focus:ring-[#111]"
                    checked={selectedGenders.includes(gender)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedGenders((prev) => [...prev, gender]);
                      } else {
                        setSelectedGenders((prev) => prev.filter((g) => g !== gender));
                      }
                    }}
                  />
                  <span className="text-[13px] text-zinc-600 group-hover:text-[#111] transition-colors">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Size</h3>
            <div className="flex flex-wrap gap-2">
              {["S", "M", "L", "XL", "Unisex"].map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedSizes((prev) => prev.filter((s) => s !== size));
                      } else {
                        setSelectedSizes((prev) => [...prev, size]);
                      }
                    }}
                    className={`px-4 h-10 border rounded-lg text-xs font-medium transition-colors focus:outline-none ${
                      isSelected
                        ? "border-[#111] text-[#111] bg-black/5"
                        : "border-zinc-200 text-zinc-600 hover:border-[#111] hover:text-[#111]"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid section */}
      <div className="w-full">
        {filteredProducts.length > 0 ? (
          <ProductGrid>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        ) : (
          <div className="w-full py-24 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-medium text-[#111] mb-2">No products found</h3>
            <p className="text-sm text-zinc-500">Try adjusting your filters to see more results.</p>
            <button 
              onClick={() => {
                setSelectedCategory("All Categories");
                setSelectedGenders([]);
                setSelectedSizes([]);
              }}
              className="mt-6 text-[13px] font-bold text-[#111] border-b border-[#111] pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
