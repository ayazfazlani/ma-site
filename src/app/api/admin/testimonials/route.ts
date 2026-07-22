// src/app/api/admin/testimonials/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(testimonials, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching testimonials" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const testimonial = await Testimonial.create(body);
    revalidatePath("/");
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating testimonial" }, { status: 500 });
  }
}
