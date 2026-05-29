import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PostModel from "@/models/Post";
import ProjectModel from "@/models/Project";
import ContactMessageModel from "@/models/ContactMessage";

export async function GET() {
  try {
    await dbConnect();
    
    const [postsCount, projectsCount, messagesCount] = await Promise.all([
      PostModel.countDocuments(),
      ProjectModel.countDocuments(),
      ContactMessageModel.countDocuments({ status: "unread" }),
    ]);

    return NextResponse.json({
      posts: postsCount,
      projects: projectsCount,
      unreadMessages: messagesCount,
    });
  } catch (error) {
    return NextResponse.json({ error: "Fetch error" }, { status: 500 });
  }
}
