import dbConnect from "@/lib/mongodb";
import PartnerModel from "@/models/Partner";
import TestimonialModel from "@/models/Testimonial";
import { HeroAvatarStrip, type AvatarItem } from "./HeroAvatars";

async function fetchHeroAvatars(): Promise<AvatarItem[]> {
  await dbConnect();
  const [partners, avatars] = await Promise.all([
    PartnerModel.find({ active: true, showInHero: true }).sort({ order: 1 }).limit(8).lean(),
    TestimonialModel.find({ active: true, showInHero: true }).sort({ order: 1 }).limit(8).lean(),
  ]);

  const stackFromPartners = partners
    .filter((p) => p.logo || p.image)
    .map((p) => ({ image: (p.logo || p.image) as string, name: p.name as string }));
  const stackFromAvatars = avatars.map((a) => ({
    image: (a.image || a.logo || "") as string,
    name: (a.name || "Client") as string,
  }));

  return stackFromPartners.length > 0 ? stackFromPartners : stackFromAvatars;
}

export default async function HeroAvatarsServer() {
  try {
    const avatars = await fetchHeroAvatars();
    return <HeroAvatarStrip avatars={avatars} />;
  } catch {
    return <HeroAvatarStrip avatars={[]} />;
  }
}
