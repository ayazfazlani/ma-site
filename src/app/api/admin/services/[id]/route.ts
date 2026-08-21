import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import dbConnect from "@/lib/mongodb";
import ServiceModel from "@/models/Service";

function normalizeBody(body: Record<string, unknown>) {
  const normalized = { ...body };
  if (Array.isArray(body.features)) normalized.features = JSON.stringify(body.features);
  if (Array.isArray(body.plans)) normalized.plans = JSON.stringify(body.plans);
  return normalized;
}

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const service = await ServiceModel.findById((await params).id).lean();
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ ...service, _id: undefined, id: service._id.toString() });
  } catch {
    return NextResponse.json({ error: "Could not fetch service" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const id = (await params).id;
    const existing = await ServiceModel.findById(id).select("slug").lean();
    const service = await ServiceModel.findByIdAndUpdate(id, normalizeBody(await request.json()), { new: true, runValidators: true }).lean();
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
    if (existing?.slug && existing.slug !== service.slug) revalidatePath(`/services/${existing.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ ...service, _id: undefined, id: service._id.toString() });
  } catch (error: unknown) {
    const duplicate = typeof error === "object" && error !== null && "code" in error && error.code === 11000;
    return NextResponse.json({ error: duplicate ? "That slug is already in use" : "Could not update service" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const service = await ServiceModel.findByIdAndDelete((await params).id);
    if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });
    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Could not delete service" }, { status: 500 });
  }
}