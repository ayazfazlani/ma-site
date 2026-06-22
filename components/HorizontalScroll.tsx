// components/HorizontalScroll.tsx
import dbConnect from "@/lib/mongodb";
import PartnerModel from "@/models/Partner";
import HorizontalScrollWrapper from "./HorizontalScrollWrapper";
import HorizontalScrollList from "./HorizontalScrollList";

export default async function HorizontalScroll({ initialPartners }: { initialPartners?: any[] }) {
  let dbPartners: any[] = initialPartners || [];
  if (!initialPartners) {
    try {
      await dbConnect();
      dbPartners = await PartnerModel.find({ active: true }).sort({ order: 1 }).lean();
      dbPartners = dbPartners.map((p: any) => ({ ...p, _id: undefined, id: p._id?.toString() }));
    } catch {
      dbPartners = [];
    }
  }

  const fallbackBrands = ["TechSolutions", "StyleMart", "EduLearn", "HealthFirst", "FoodieHub", "TravelPK", "PropEstate"];
  const partners = dbPartners.length > 0 ? dbPartners : fallbackBrands.map(name => ({ name, logo: null }));

  return (
    <HorizontalScrollWrapper>
      <HorizontalScrollList partners={partners} />
    </HorizontalScrollWrapper>
  );
}
