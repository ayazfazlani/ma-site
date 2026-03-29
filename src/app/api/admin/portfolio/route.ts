// src/app/api/admin/portfolio/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ProjectModel from "@/models/Project";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const project = await ProjectModel.create(body);
    const plain = project.toObject();
    return NextResponse.json({ ...plain, _id: undefined, id: plain._id?.toString() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Export error" }, { status: 500 });
  }
}

export async function GET() {
  await dbConnect();
  const projects = await ProjectModel.find({}).sort({ order: 1 }).lean();
  return NextResponse.json(projects.map((p: any) => ({ ...p, _id: undefined, id: p._id?.toString() })));
}
