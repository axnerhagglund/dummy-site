import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/dummy-site/Container";
import { getProducts } from "@/lib/products/getProducts";
import Link from "next/link";
import { ProductDetailClient } from "./ProductDetailClient";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const products = await getProducts();

  const product = products.find(p => String(p.id) === decodeURIComponent(String(resolvedParams.id)));

  if (!product) {
    notFound();
  }

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  const categoryLabel =
    product.category
      ? product.category.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
      : "Products";

  return (
    <div className="py-12 bg-white flex-grow font-sans text-black">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex items-center gap-2 text-xs text-zinc-400 font-medium">
            <li><Link href="/" className="hover:text-[#304838] transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/products" className="hover:text-[#304838] transition-colors">Products</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={`/products?category=${product.category}`} className="hover:text-[#304838] transition-colors">{categoryLabel}</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-zinc-600 truncate max-w-[200px]" aria-current="page">{product.name}</li>
          </ol>
        </nav>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 items-start">
          <ProductDetailClient product={product} />
        </div>

        {/* Divider */}
        <hr className="border-zinc-200 mb-12" />

        {/* Related Products */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-xl font-semibold text-black tracking-tight">Looking for more?</h2>
          <Link
            href="/products"
            className="text-xs font-semibold px-5 py-2 border border-zinc-200 rounded-full hover:bg-zinc-50 hover:border-zinc-300 transition-all uppercase tracking-widest flex items-center gap-3"
          >
            More <span aria-hidden="true" className="text-sm leading-none">&rarr;</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
          {relatedProducts.map(p => (
            <Link href={`/products/${p.id}`} key={p.id} className="group block">
              <div className="bg-[#F3F3F3] aspect-square mb-6 flex items-center justify-center relative overflow-hidden">
                {p.image_url ? (
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    className="object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out p-8"
                  />
                ) : (
                  <span className="text-zinc-400 text-xs">No image</span>
                )}
              </div>
              <div className="flex justify-between items-start pt-1">
                <span className="text-xs font-bold uppercase tracking-widest text-black max-w-[70%]">
                  {p.name}
                </span>
                <span className="text-xs text-zinc-500 font-medium whitespace-nowrap">
                  {p.price} SEK
                </span>
              </div>
            </Link>
          ))}
        </div>

      </Container>
    </div>
  );
}
