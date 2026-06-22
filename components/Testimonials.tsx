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

  const fallbackTestimonials = [
    {
      name: "Ahmed Khan",
      role: "CEO, TechSolutions PK",
      content: "MA Softs transformed our business processes with a custom ERP. The efficiency gains have been incredible. Ayaz is a brilliant developer!",
      rating: 5,
    },
    {
      name: "Sarah Ali",
      role: "Marketing Director, StyleMart",
      content: "The team is professional, responsive, and delivers results. Exceptional service and very transparent reporting.",
      rating: 5,
    }
  ];

  const raw = (dbTestimonials && dbTestimonials.length > 0) ? dbTestimonials : fallbackTestimonials;
  const testimonials = JSON.parse(JSON.stringify(raw.map((t: any) => ({ ...t, _id: undefined, id: t._id?.toString?.() || t.id }))));

  return (
    <TestimonialsWrapper>
      <TestimonialsList testimonials={testimonials} />
    </TestimonialsWrapper>
  );
}
