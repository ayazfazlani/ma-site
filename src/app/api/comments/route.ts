import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Comment from "@/models/Comment";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json({ message: "Post ID is required" }, { status: 400 });
    }

    const comments = await Comment.find({ postId, approved: true }).sort({ createdAt: -1 });
    return NextResponse.json(comments, { status: 200 });
  } catch (error) {
    console.error("Fetch Comments Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, content, postId } = await req.json();

    if (!name || !email || !content || !postId) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newComment = await Comment.create({
      name,
      email,
      content,
      postId,
    });

    return NextResponse.json(newComment, { status: 201 });
  } catch (error) {
    console.error("Create Comment Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
