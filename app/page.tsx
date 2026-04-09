import Link from "next/link";
import { Container } from "@/components/dummy-site/Container";
import { Button } from "@/components/dummy-site/Button";
import { ProductGrid } from "@/components/dummy-site/ProductGrid";
import { ProductCard } from "@/components/dummy-site/ProductCard";
import { getProducts } from "@/lib/products/getProducts";

export default async function DummyHomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="flex-grow flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex w-full bg-gradient-to-br from-[#0a120b] via-[#102415] to-[#1c3f25] overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1400px] mx-auto h-full relative z-10">

          {/* Left Column - Text */}
          <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-20 md:pt-0 h-full">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-[5.5rem] tracking-tight text-[#F9F9F9] mb-8 leading-[1.05]">
              Hike where<br />
              ever you want
            </h1>
            <p className="text-base font-medium text-white/90 mb-10 max-w-sm leading-relaxed">
              Unleash confident speed in the <br />
              faster, smoother Sylan 2.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="bg-white text-[#111] text-[13px] font-bold px-8 py-3 hover:bg-zinc-100 transition-colors flex items-center justify-center">
                Shop women's
              </Link>
              <Link href="/products" className="bg-white text-[#111] text-[13px] font-bold px-8 py-3 hover:bg-zinc-100 transition-colors flex items-center justify-center">
                Shop men's
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-full flex items-center justify-center p-8 md:p-12 z-0">
            <img
              src="/jackets.jpg"
              alt="Hero Product Shell Jacket"
              className="w-full h-auto max-h-full object-cover rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] scale-110 md:scale-125 lg:translate-x-12"
            />
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="py-24 sm:py-32 bg-[#FFFDEC] w-full">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            {[
              { name: "Shell jackets", label: "Jackets", img: "/jackets.jpg" },
              { name: "Backpack", label: "Backpacks", img: "/backpacks.png" },
              { name: "Tent", label: "Tents", img: "/tents.png" },
              { name: "Hiking shoes", label: "Hiking Shoes", img: "/hiking-shoes.png" }
            ].map((category, index) => (
              <Link href={`/products?category=${category.label}`} key={index} className="group relative aspect-3/4 overflow-hidden rounded-4xl bg-zinc-200 shadow-xl">
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#304838]/90 via-[#304838]/20 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-[#FFFDEC] mb-4">{category.name}</h3>
                  <span className="text-[#69FFB6] font-bold tracking-widest uppercase text-sm flex items-center gap-3 group-hover:gap-5 transition-all duration-300">
                    Explore <span aria-hidden="true" className="text-xl leading-none">&rarr;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-24 sm:py-32 bg-white flex-grow w-full border-t border-zinc-100">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl sm:text-6xl font-black tracking-tighter text-[#304838] mb-6">Featured Gear</h2>
              <p className="text-xl font-medium text-zinc-500 leading-relaxed">
                Curated essentials for your next expedition, blending technical performance with timeless design.
              </p>
            </div>
            <Link href="/products" className="shrink-0">
              <Button variant="outline" className="rounded-full px-8 uppercase tracking-widest text-sm font-bold w-full md:w-auto">
                View all products
              </Button>
            </Link>
          </div>
          <ProductGrid>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </ProductGrid>
        </Container>
      </section>
    </div>
  );
}
