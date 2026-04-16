import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products/getProducts";

export function ProductCard({ product }: { product: Product }) {
  const subtitle = product.category
    ? product.category.replace("_", " ").charAt(0).toUpperCase() + product.category.replace("_", " ").slice(1)
    : "Outdoor Gear";

  return (
    <Link href={`/products/${product.id}`} className="group block w-full">
      <div className="bg-[#FAF9F5] aspect-square mb-4 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden transition-colors group-hover:bg-[#F2F1ED]">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain mix-blend-multiply group-hover:scale-[1.03] transition-transform duration-700 ease-out p-8 sm:p-12"
          />
        ) : (
          <span className="text-zinc-400 text-xs font-medium">No image</span>
        )}
      </div>
      <div className="flex justify-between items-start gap-3">
        <span className="text-[13px] font-medium text-[#222] max-w-[75%] leading-tight">
          {product.name}
        </span>
        <span className="text-[13px] font-medium text-[#222] whitespace-nowrap">
          {product.price} SEK
        </span>
      </div>
      <div className="mt-1">
        <span className="text-xs text-zinc-500">
          {subtitle}
        </span>
      </div>
    </Link>
  );
}
