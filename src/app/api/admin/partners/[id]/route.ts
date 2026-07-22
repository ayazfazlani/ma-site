// src/app/api/admin/partners/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Partner from "@/models/Partner";
import { revalidatePath } from "next/cache";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();
    const partner = await Partner.findByIdAndUpdate(id, body, { new: true });
    revalidatePath("/");
    return NextResponse.json(partner, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error updating partner" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    await Partner.findByIdAndDelete(id);
    revalidatePath("/");
    return NextResponse.json({ message: "Partner deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error deleting partner" }, { status: 500 });
  }
}
