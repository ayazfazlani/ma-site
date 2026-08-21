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

export async function GET() {
  try {
    await dbConnect();
    const services = await ServiceModel.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(services.map((service) => ({ ...service, _id: undefined, id: service._id.toString() })));
  } catch {
    return NextResponse.json({ error: "Could not fetch services" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const service = await ServiceModel.create(normalizeBody(await request.json()));
    revalidatePath("/services");
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ ...service.toObject(), _id: undefined, id: service.id }, { status: 201 });
  } catch (error: unknown) {
    const duplicate = typeof error === "object" && error !== null && "code" in error && error.code === 11000;
    return NextResponse.json({ error: duplicate ? "That slug is already in use" : "Could not create service" }, { status: 400 });
  }
}