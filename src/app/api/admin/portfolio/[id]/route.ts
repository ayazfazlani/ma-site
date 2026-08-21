// src/app/api/admin/portfolio/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import { revalidatePath } from "next/cache";

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
    const raw = await req.json();
    const images: string[] = Array.isArray(raw.images) ? raw.images.filter(Boolean) : [];
    const image = raw.image || images[0] || "";
    const body = {
      ...raw,
      image,
      images: Array.from(new Set([...images, image].filter(Boolean))),
    };
    const project = await ProjectModel.findByIdAndUpdate(id, body, { new: true }).lean();
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    // Trigger cache revalidation
    revalidatePath("/", "page");
    revalidatePath("/portfolio");
    if (project && (project as any).slug) {
      revalidatePath(`/portfolio/${(project as any).slug}`);
    }
    
    return NextResponse.json({ ...project, _id: undefined, id: (project as any)._id?.toString() });
  } catch (error) {
    return NextResponse.json({ error: "Sync error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    if (typeof body.active !== "boolean") {
      return NextResponse.json({ error: "Active status must be a boolean" }, { status: 400 });
    }

    await dbConnect();
    const project = await ProjectModel.findByIdAndUpdate(
      id,
      { active: body.active },
      { new: true, runValidators: true }
    ).lean();
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });

    revalidatePath("/", "page");
    revalidatePath("/portfolio");
    revalidatePath(`/portfolio/${project.slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      ...project,
      _id: undefined,
      id: project._id.toString(),
    });
  } catch {
    return NextResponse.json({ error: "Could not update project visibility" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await dbConnect();
    const project = await ProjectModel.findByIdAndDelete(id);
    if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
    
    // Trigger cache revalidation
    revalidatePath("/", "page");
    revalidatePath("/portfolio");
    if (project && (project as any).slug) {
      revalidatePath(`/portfolio/${(project as any).slug}`);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Clean up error" }, { status: 500 });
  }
}
