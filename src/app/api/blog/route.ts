import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PostModel from "@/models/Post";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const query = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const seriesId = searchParams.get("seriesId") || "";
    
    const skip = (page - 1) * limit;

    const filter: any = { published: true };
    if (query) {
      filter.$or = [
        { title: { $regex: query, $options: "i" } },
        { excerpt: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ];
    }

    if (category) filter.category = category;
    if (seriesId) {
      filter.seriesId = new mongoose.Types.ObjectId(seriesId);
    }

    const [posts, total] = await Promise.all([
      PostModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      PostModel.countDocuments(filter),
    ]);

    const formattedPosts = posts.map((p: any) => ({
      ...p,
      _id: undefined,
      id: p._id?.toString() ?? p.slug,
    }));

    return NextResponse.json({
      posts: formattedPosts,
      total,
      hasMore: total > skip + posts.length,
    });
  } catch (error) {
    console.error("Error fetching paginated posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
