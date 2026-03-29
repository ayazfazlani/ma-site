// src/app/api/admin/settings/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteSettingsModel from "@/models/SiteSettings";

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const settings = await SiteSettingsModel.findByIdAndUpdate(
      "settings",
      { $set: body },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();

    return NextResponse.json(settings);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "System sync error" }, { status: 500 });
  }
}
