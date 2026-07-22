// src/app/api/admin/partners/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Partner from "@/models/Partner";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    await dbConnect();
    const partners = await Partner.find({}).sort({ order: 1 }).lean();
    return NextResponse.json(partners, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching partners" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const partner = await Partner.create(body);
    revalidatePath("/");
    return NextResponse.json(partner, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating partner" }, { status: 500 });
  }
}
