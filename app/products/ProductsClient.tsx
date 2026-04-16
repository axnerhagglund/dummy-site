"use client";

import { useState, useMemo } from "react";
import { Product } from "@/lib/products/getProducts";
import { ProductGrid } from "@/components/dummy-site/ProductGrid";
import { ProductCard } from "@/components/dummy-site/ProductCard";

interface ProductsClientProps {
  initialProducts: Product[];
  initialCategory?: string;
  initialGender?: string;
}

const CATEGORIES = ["All Categories", "Jackets", "Pants", "Backpacks", "Tents", "Hiking Shoes"];

const CAT_MAP: Record<string, string> = {
  "Jackets": "shell_jacket",
  "Pants": "pants",
  "Backpacks": "backpack",
  "Tents": "tent",
  "Hiking Shoes": "hiking_shoes",
};

export function ProductsClient({ initialProducts, initialCategory = "All Categories", initialGender }: ProductsClientProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedGenders, setSelectedGenders] = useState<string[]>(
    initialGender ? [initialGender] : []
  );
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const hasActiveFilters =
    selectedCategory !== "All Categories" ||
    selectedGenders.length > 0 ||
    selectedSizes.length > 0;

  function clearFilters() {
    setSelectedCategory("All Categories");
    setSelectedGenders([]);
    setSelectedSizes([]);
  }

  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      if (selectedCategory !== "All Categories") {
        const mappedCat = CAT_MAP[selectedCategory];
        if (product.category !== mappedCat) return false;
      }
      if (selectedGenders.length > 0) {
        if (!product.gender || !selectedGenders.includes(product.gender)) return false;
      }
      if (selectedSizes.length > 0) {
        if (!product.sizes || !product.sizes.some((size) => selectedSizes.includes(size))) return false;
      }
      return true;
    });
  }, [initialProducts, selectedCategory, selectedGenders, selectedSizes]);

  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price);
      case "newest":
        return sorted.sort((a, b) => {
          if (!a.created_at || !b.created_at) return 0;
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        });
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  return (
    <div className="w-full flex flex-col pt-8">
      {/* Header Area */}
      <div className="flex flex-col mb-10">
        <h1 className="text-4xl sm:text-[3.5rem] font-serif text-[#111] tracking-tight mb-8">
          All products
          <span className="text-sm text-zinc-400 font-sans tracking-normal ml-3 align-middle relative -top-3">
            ({sortedProducts.length})
          </span>
        </h1>

        <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              aria-expanded={isFiltersOpen}
              aria-controls="filters-panel"
              className="text-[13px] text-zinc-600 font-bold tracking-wide hover:text-[#111] transition-colors flex items-center gap-2 relative"
            >
              Filters
              <span className="absolute -bottom-[17px] left-0 w-full h-[2px] bg-[#111]" />
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-[13px] font-medium text-zinc-500 hover:text-[#111] transition-colors underline underline-offset-2"
              >
                Clear filters
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-[13px] text-zinc-400">Sort by:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[13px] font-medium text-[#111] focus:ring-2 focus:ring-[#111] focus:ring-offset-1 cursor-pointer outline-none rounded"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expandable Filters Section */}
      <div
        id="filters-panel"
        className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${isFiltersOpen ? "max-h-[800px] mb-12 opacity-100" : "max-h-0 mb-0 opacity-0"}`}
        aria-hidden={!isFiltersOpen}
      >
        <fieldset className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-[#FAF9F5] rounded-xl border border-zinc-100">
          <legend className="sr-only">Filter products</legend>

          <div>
            <h3 id="category-label" className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Category</h3>
            <div role="radiogroup" aria-labelledby="category-label" className="flex flex-col gap-3">
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
            <h3 id="gender-label" className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Gender</h3>
            <div role="group" aria-labelledby="gender-label" className="flex flex-col gap-3">
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
            <h3 id="size-label" className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-4">Size</h3>
            <div role="group" aria-labelledby="size-label" className="flex flex-wrap gap-2">
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
                    aria-pressed={isSelected}
                    className={`px-4 h-10 border rounded-lg text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#111] focus:ring-offset-1 ${
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
        </fieldset>
      </div>

      {/* Product Grid */}
      <div className="w-full">
        {sortedProducts.length > 0 ? (
          <ProductGrid>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        ) : (
          <div className="w-full py-24 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-medium text-[#111] mb-2">No products found</h3>
            <p className="text-sm text-zinc-500">Try adjusting your filters to see more results.</p>
            <button
              onClick={clearFilters}
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
