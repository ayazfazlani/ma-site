// src/app/api/admin/portfolio/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ProjectModel from "@/models/Project";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const project = await ProjectModel.findById(id).lean();
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ...project, _id: undefined, id: (project as any)._id?.toString() });
  } catch (error) {
    return NextResponse.json({ error: "Sync error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const body = await req.json();
    const project = await ProjectModel.findByIdAndUpdate(id, body, { new: true }).lean();
    return NextResponse.json({ ...project, _id: undefined, id: (project as any)._id?.toString() });
  } catch (error) {
    return NextResponse.json({ error: "Sync error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    await ProjectModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Clean up error" }, { status: 500 });
  }
}
