import Image from "next/image";

export type AvatarItem = { image?: string; name?: string };

const avatarColors = [
  "bg-primary-500",
  "bg-accent-500",
  "bg-primary-600",
  "bg-accent-600",
  "bg-primary-400",
];

const defaultAvatars: AvatarItem[] = [
  { image: "", name: "Ahmed K" },
  { image: "", name: "Sarah A" },
  { image: "", name: "Omar B" },
  { image: "", name: "Fatima R" },
  { image: "", name: "Zara M" },
];

export function HeroAvatarPlaceholders() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex -space-x-3">
        {defaultAvatars.slice(0, 5).map((a, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full border-2 border-white dark:border-dark-950 overflow-hidden shadow-xl relative ${i >= 3 ? "hidden sm:block" : ""}`}
          >
            <div
              className={`w-full h-full flex items-center justify-center text-[11px] font-black uppercase text-white ${avatarColors[i % 5]}`}
            >
              {(a.name || "C")[0]}
            </div>
          </div>
        ))}
        <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-500 dark:border-dark-950 dark:bg-primary-600 flex items-center justify-center text-[10px] font-black text-white shadow-xl">
          100+
        </div>
      </div>
      <p className="text-sm font-semibold tracking-wide text-gray-600 dark:text-neutral-400">
        Trusted by <span className="text-primary-500 underline decoration-primary-500/30 underline-offset-4">100+ Global Businesses</span> & Startups
      </p>
    </div>
  );
}

export function HeroAvatarStrip({ avatars }: { avatars: AvatarItem[] }) {
  const displayAvatars =
    avatars.length > 0 ? avatars : defaultAvatars;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex -space-x-3">
        {displayAvatars.slice(0, 5).map((a, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full border-2 border-white dark:border-dark-950 overflow-hidden shadow-xl relative ${i >= 3 ? "hidden sm:block" : ""}`}
          >
            {a.image ? (
              <Image
                src={a.image}
                alt={a.name || "Happy Client Avatar"}
                width={40}
                height={40}
                sizes="40px"
                loading="lazy"
                className="object-cover w-full h-full"
              />
            ) : (
              <div
                className={`w-full h-full flex items-center justify-center text-[11px] font-black uppercase text-white ${avatarColors[i % 5]}`}
              >
                {(a.name || "C")[0]}
              </div>
            )}
          </div>
        ))}
        <div className="w-10 h-10 rounded-full border-2 border-white bg-primary-500 dark:border-dark-950 dark:bg-primary-600 flex items-center justify-center text-[10px] font-black text-white shadow-xl">
          100+
        </div>
      </div>
      <p className="text-sm font-semibold tracking-wide text-gray-600 dark:text-neutral-400">
        Trusted by <span className="text-primary-500 underline decoration-primary-500/30 underline-offset-4">100+ Global Businesses</span> & Startups
      </p>
    </div>
  );
}
