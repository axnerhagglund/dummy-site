import { notFound } from "next/navigation";
import { Container } from "@/components/dummy-site/Container";
import { getProducts } from "@/lib/products/getProducts";
import Link from "next/link";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const products = await getProducts();
  
  // Safely find the product by converting both to string and URL-decoding the parameter. 
  const product = products.find(p => String(p.id) === decodeURIComponent(String(resolvedParams.id)));
  
  if (!product) {
    notFound();
  }

  // Get up to 4 other products for the bottom section
  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="py-12 bg-white flex-grow font-sans text-black">
      <Container>
        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 items-start">
          
          {/* Left Column: Product Info */}
          <div className="flex flex-col pt-0 lg:pt-16 order-2 lg:order-1 lg:pr-12">
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-medium tracking-tight text-black mb-6 leading-[1.05]">
              {product.name}
            </h1>
            
            <div className="text-[11px] text-zinc-500 uppercase tracking-widest font-semibold mb-6">
              {product.sizes?.length ? product.sizes.join(' / ') : "ONE SIZE"}
            </div>
            
            <div className="text-xl md:text-2xl font-normal text-black mb-8">
              {product.price} SEK
            </div>
            
            {/* Mocked Color Options */}
            <div className="flex items-center gap-2.5 mb-10">
              <button aria-label="Grey" className="w-[18px] h-[18px] rounded-full bg-zinc-500 ring-1 ring-offset-4 ring-zinc-300 transition-all"></button>
              <button aria-label="Yellow" className="w-[18px] h-[18px] rounded-full bg-amber-500"></button>
              <button aria-label="Orange" className="w-[18px] h-[18px] rounded-full bg-[#FF4500]"></button>
              <button aria-label="Black" className="w-[18px] h-[18px] rounded-full bg-black"></button>
            </div>

            <p className="text-sm text-zinc-500 mb-16 leading-relaxed max-w-sm">
              {product.description || "This compact and durable backpack embodies a true spirit of adventure and passion for exploration."}
            </p>

            {/* Accordions */}
            <div className="border-t border-zinc-200 divide-y divide-zinc-200 w-full max-w-xs">
              {[
                { title: 'Details' },
                { title: 'Payments Options' },
                { title: 'Shipping' }
              ].map((item, i) => (
                <div key={i} className="py-4 flex justify-between items-center cursor-pointer group hover:opacity-70 transition-opacity">
                  <span className="text-[13px] font-medium text-black">{item.title}</span>
                  <span className="text-lg font-light text-zinc-400 group-hover:text-black transition-colors">+</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Large Product Image Box */}
          <div className="bg-[#F3F3F3] w-full aspect-[4/5] lg:aspect-square flex flex-col items-center justify-center relative order-1 lg:order-2">
            <div className="w-full h-full relative p-8 md:p-16 flex items-center justify-center">
              {product.image_url ? (
                <img 
                  src={product.image_url} 
                  alt={product.name} 
                  className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="text-zinc-400 font-medium text-sm">No image available</div>
              )}
            </div>
            
            {/* Minimalist image pagination dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
              <div className="w-1 h-1 rounded-full bg-black"></div>
              <div className="w-1 h-1 rounded-full bg-zinc-300"></div>
              <div className="w-1 h-1 rounded-full bg-zinc-300"></div>
            </div>
          </div>
        </div>

        {/* Divider above recommendations */}
        <hr className="border-zinc-200 mb-12" />

        {/* Bottom Section: Looking for more? */}
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-xl font-semibold text-black tracking-tight">Looking for more?</h2>
          <Link 
            href="/products" 
            className="text-[10px] font-semibold px-5 py-2 border border-zinc-200 rounded-full hover:bg-zinc-50 hover:border-zinc-300 transition-all uppercase tracking-widest flex items-center gap-3"
          >
            MORE <span aria-hidden="true" className="text-sm leading-none">&rarr;</span>
          </Link>
        </div>

        {/* Recommendations Grid (Minimalist design matching screenshot) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-20">
          {relatedProducts.map(p => (
            <Link href={`/products/${p.id}`} key={p.id} className="group block">
              <div className="bg-[#F3F3F3] aspect-square mb-6 flex items-center justify-center p-8 relative overflow-hidden">
                 {p.image_url ? (
                   <img 
                      src={p.image_url} 
                      alt={p.name} 
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700 ease-out" 
                   />
                 ) : (
                   <span className="text-zinc-400 text-xs">No image</span>
                 )}
              </div>
              <div className="flex justify-between items-start pt-1">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-black max-w-[70%]">
                  {p.name}
                </span>
                <span className="text-[10px] sm:text-[11px] text-zinc-500 font-medium whitespace-nowrap">
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
