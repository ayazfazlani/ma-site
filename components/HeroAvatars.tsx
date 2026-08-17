import Image from "next/image";

export type AvatarItem = { image?: string; name?: string };

export function HeroAvatarPlaceholders() {
  return (
    <p className="text-sm font-medium tracking-wide text-gray-600 dark:text-neutral-400">
      Specialized in turning complex business workflows into practical software.
    </p>
  );
}

export function HeroAvatarStrip({ avatars }: { avatars: AvatarItem[] }) {
  const withImages = avatars.filter((a) => a.image).slice(0, 5);

  if (withImages.length === 0) {
    return <HeroAvatarPlaceholders />;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex -space-x-3">
        {withImages.map((a, i) => (
          <div
            key={`${a.name}-${i}`}
            className="w-10 h-10 rounded-full border-2 border-white dark:border-dark-950 overflow-hidden shadow-xl relative"
          >
            <Image
              src={a.image as string}
              alt={a.name || "Client"}
              width={40}
              height={40}
              sizes="40px"
              loading="lazy"
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
      <p className="text-sm font-medium tracking-wide text-gray-600 dark:text-neutral-400">
        Software built around real operations — not a generic package.
      </p>
    </div>
  );
}
