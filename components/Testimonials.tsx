// components/Testimonials.tsx
import dbConnect from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";
import TestimonialsWrapper from "./TestimonialsWrapper";
import TestimonialsList from "./TestimonialsList";

export default async function Testimonials({ initialTestimonials }: { initialTestimonials?: any[] }) {
  let dbTestimonials = initialTestimonials;

  if (!initialTestimonials) {
    await dbConnect();
    dbTestimonials = await TestimonialModel.find({ active: true }).sort({ createdAt: -1 }).lean();
  }

  const raw = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : [];
  const testimonials = JSON.parse(JSON.stringify(raw.map((t: any) => ({ ...t, _id: undefined, id: t._id?.toString?.() || t.id }))));

  if (testimonials.length === 0) return null;

  return (
    <TestimonialsWrapper>
      <TestimonialsList testimonials={testimonials} />
    </TestimonialsWrapper>
  );
}
