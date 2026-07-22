// src/app/api/admin/testimonials/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const testimonial = await Testimonial.findByIdAndUpdate(id, body, { new: true });
    revalidatePath("/");
    return NextResponse.json(testimonial, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating testimonial" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    await Testimonial.findByIdAndDelete(id);
    revalidatePath("/");
    return NextResponse.json({ message: "Testimonial deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting testimonial" }, { status: 500 });
  }
}
