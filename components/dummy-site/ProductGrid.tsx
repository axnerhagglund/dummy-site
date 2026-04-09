import { ReactNode } from "react";

export function ProductGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-12">
      {children}
    </div>
  );
}
