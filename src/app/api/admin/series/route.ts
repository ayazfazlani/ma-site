import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SeriesModel from "@/models/Series";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const series = await SeriesModel.create(body);
    return NextResponse.json(series);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Creation error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const series = await SeriesModel.find({}).sort({ order: 1 }).lean();
    return NextResponse.json(series.map((s: any) => ({ ...s, _id: undefined, id: s._id?.toString() })));
  } catch (error) {
    return NextResponse.json({ error: "Fetch error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
    try {
      await dbConnect();
      const body = await req.json();
      const { id, ...data } = body;
      const series = await SeriesModel.findByIdAndUpdate(id, data, { new: true }).lean();
      return NextResponse.json({ ...series, _id: undefined, id: (series as any)._id?.toString() });
    } catch (error) {
      return NextResponse.json({ error: "Update error" }, { status: 500 });
    }
}
