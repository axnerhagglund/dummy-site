import { ReactNode } from "react";
import { Navbar } from "@/components/dummy-site/Navbar";
import { Footer } from "@/components/dummy-site/Footer";
import Script from "next/script";

import "./globals.css";

export const metadata = {
  title: "Outward. | Dummy Shop",
  description: "Explore the outdoors with confidence. Premium gear for your next adventure.",
};

export default function DummySiteLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#FFFDEC] text-zinc-900 selection:bg-[#69FFB6] selection:text-[#304838]">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
        
        {/* Chatbot UI Container */}
        <div id="north-chatbot-root"></div>

        {/* Chatbot Configuration and Script */}
        <Script id="north-chatbot-config" strategy="beforeInteractive">
          {`window.NORTH_API_URL = "http://localhost:3000";`}
        </Script>
        <Script src="http://localhost:3000/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
