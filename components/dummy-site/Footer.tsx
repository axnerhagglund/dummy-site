import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-[#304838] text-[#FFFDEC] py-20 border-t border-[#69FFB6]/20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24">
          <div className="col-span-1 md:col-span-2">
            <div className="text-4xl font-extrabold tracking-tighter mb-6 text-[#69FFB6]">
              OUTWARD.
            </div>
            <p className="text-[#FFFDEC]/80 max-w-sm text-lg leading-relaxed font-medium">
              Explore the outdoors with confidence. Premium gear for your next adventure, sustainably engineered for conscious explorers.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wider uppercase">Shop</h4>
            <ul className="space-y-4 text-[#FFFDEC]/80 font-medium">
              <li><a href="#" className="hover:text-[#69FFB6] transition-colors">Men's Apparel</a></li>
              <li><a href="#" className="hover:text-[#69FFB6] transition-colors">Women's Apparel</a></li>
              <li><a href="#" className="hover:text-[#69FFB6] transition-colors">Equipment & Gear</a></li>
              <li><a href="#" className="hover:text-[#69FFB6] transition-colors flex items-center gap-2">Sale <span className="bg-[#69FFB6] text-[#304838] text-[10px] uppercase px-2 py-0.5 rounded-full font-bold">New</span></a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6 tracking-wider uppercase">Support</h4>
            <ul className="space-y-4 text-[#FFFDEC]/80 font-medium">
              <li><a href="#" className="hover:text-[#69FFB6] transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-[#69FFB6] transition-colors">FAQ & Guides</a></li>
              <li><a href="#" className="hover:text-[#69FFB6] transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-[#69FFB6] transition-colors">Shipping Info</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-20 pt-10 border-t border-[#FFFDEC]/10 flex flex-col md:flex-row items-center justify-between gap-6 text-[#FFFDEC]/70 font-medium">
          <p>&copy; {new Date().getFullYear()} Outward. Dummy site for demo purposes.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#69FFB6]">Terms</a>
            <a href="#" className="hover:text-[#69FFB6]">Privacy</a>
            <a href="#" className="hover:text-[#69FFB6]">Cookies</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
