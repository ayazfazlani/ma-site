// src/app/api/admin/categories/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

// GET: Fetch all categories
export async function GET() {
  try {
    await dbConnect();
    const categories = await Category.find({}).sort({ name: 1 }).lean();
    const serialized = categories.map((c: any) => ({
      ...c,
      _id: c._id.toString(),
    }));
    return NextResponse.json(serialized, { status: 200 });
  } catch (error) {
    console.error("Fetch Categories Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// POST: Create a new category
export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, slug, description, color, metaTitle, metaDesc } = await req.json();

    if (!name || !slug) {
      return NextResponse.json({ message: "Name and slug are required" }, { status: 400 });
    }

    const existing = await Category.findOne({ $or: [{ name }, { slug }] });
    if (existing) {
      return NextResponse.json({ message: "Category with this name or slug already exists" }, { status: 409 });
    }

    const category = await Category.create({ name, slug, description, color, metaTitle, metaDesc });
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Create Category Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
