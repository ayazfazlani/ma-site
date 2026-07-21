// src/app/api/admin/portfolio/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ProjectModel from "@/models/Project";

function normalizeImages(body: any) {
  const images: string[] = Array.isArray(body.images)
    ? body.images.filter(Boolean)
    : [];
  const image = body.image || images[0] || "";
  const merged = Array.from(new Set([...images, image].filter(Boolean)));
  return { ...body, image, images: merged };
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = normalizeImages(await req.json());
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
