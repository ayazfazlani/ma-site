// src/app/api/admin/categories/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Category from "@/models/Category";

// PUT: Update a category
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { name, slug, description, color } = await req.json();

    const category = await Category.findByIdAndUpdate(
      id,
      { name, slug, description, color },
      { new: true }
    );

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error("Update Category Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// DELETE: Remove a category
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await dbConnect();
    const { id } = await params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json({ message: "Category not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Category deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete Category Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
