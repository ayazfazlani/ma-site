// components/HorizontalScrollList.tsx
"use client";

import { useTheme } from "./ThemeProvider";

export default function HorizontalScrollList({ partners }: { partners: any[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex gap-16 animate-marquee-fixed">
      <style jsx>{`
        .animate-marquee-fixed {
          display: flex;
          gap: 4rem;
          width: max-content;
          animation: marquee 35s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
      {[...partners, ...partners, ...partners].map((partner, i) => (
        <div key={`${partner.name}-${i}`} className="flex-shrink-0 flex items-center px-8 py-3 group/item transition-all duration-500 hover:scale-110">
          {partner.logo ? (
            <img src={partner.logo} alt={partner.name} className={`h-10 w-auto object-contain filter grayscale opacity-40 group-hover/item:opacity-100 group-hover/item:grayscale-0 transition-all duration-700 ${isDark ? 'brightness-0 invert' : ''}`} />
          ) : (
            <span className={`text-2xl font-black transition-all duration-500 whitespace-nowrap select-none tracking-tight uppercase ${isDark ? "text-white/20 group-hover/item:text-primary-500/50" : "text-gray-300 group-hover/item:text-primary-600/60"}`}>
              {partner.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
