"use client";

import { MessageCircle } from "lucide-react";

export function ChatbotPlaceholder() {
  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* 
        This is a placeholder for the future AI chatbot integration.
        Structure here is ready to be replaced by the script tag:
        <script src="chatbot.js"></script>
        or an imported component.
      */}
      <button 
        className="bg-[#69FFB6] hover:bg-[#52ebb0] text-[#304838] rounded-full p-4 shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-[#69FFB6]/50 group"
        onClick={() => alert("Chatbot widget integration coming soon!")}
        aria-label="Chat with us"
      >
        <MessageCircle className="w-8 h-8 group-hover:fill-[#304838]/10 transition-colors" strokeWidth={2.5} />
      </button>
    </div>
  );
}
