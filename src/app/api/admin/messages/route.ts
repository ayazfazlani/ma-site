import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";

export async function GET() {
  try {
    await dbConnect();
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(messages.map((m: any) => ({ ...m, _id: undefined, id: m._id?.toString() })));
  } catch (error) {
    return NextResponse.json({ error: "Fetch error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
    try {
      await dbConnect();
      const body = await req.json();
      const { id, status } = body;
      const message = await ContactMessage.findByIdAndUpdate(id, { status }, { new: true }).lean();
      return NextResponse.json({ ...message, _id: undefined, id: (message as any)._id?.toString() });
    } catch (error) {
      return NextResponse.json({ error: "Update error" }, { status: 500 });
    }
}

