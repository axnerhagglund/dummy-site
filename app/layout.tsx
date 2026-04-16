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
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#304838] focus:text-[#69FFB6] focus:px-4 focus:py-2 focus:font-bold focus:rounded-md"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />

        {/* Chatbot UI Container */}
        <div id="north-chatbot-root"></div>

        {/* Chatbot Configuration and Script */}
        <Script id="north-chatbot-config" strategy="beforeInteractive">
          {`window.NORTH_API_URL = "http://localhost:3001";`}
        </Script>
        <Script src="http://localhost:3001/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
