import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-wide rounded-md px-6 py-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-[#304838] text-white hover:bg-[#233529] focus:ring-[#304838]",
    secondary: "bg-[#69FFB6] text-[#304838] hover:bg-[#52ebb0] focus:ring-[#69FFB6]",
    outline: "border-2 border-[#304838] text-[#304838] hover:bg-[#304838] hover:text-white focus:ring-[#304838]"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
