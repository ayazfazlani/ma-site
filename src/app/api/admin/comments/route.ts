// src/app/api/admin/comments/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";
import PostModel from "@/models/Post";

// GET: Fetch all comments for the admin panel
export async function GET() {
  try {
    await dbConnect();
    const comments = await Comment.find({}).sort({ createdAt: -1 }).lean();

    // Enrich with post title
    const enriched = await Promise.all(
      comments.map(async (comment: any) => {
        const post = await PostModel.findById(comment.postId).select("title slug").lean() as any;
        return {
          ...comment,
          _id: comment._id.toString(),
          postId: comment.postId?.toString(),
          postTitle: post?.title || "Unknown Post",
          postSlug: post?.slug || "",
        };
      })
    );

    return NextResponse.json(enriched, { status: 200 });
  } catch (error) {
    console.error("Admin Fetch Comments Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
