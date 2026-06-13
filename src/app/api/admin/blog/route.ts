// src/app/api/admin/blog/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PostModel from "@/models/Post";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { title, slug, excerpt, content, category, author, image, published, metaTitle, metaDesc, readTime } = body;

    const post = await PostModel.create({
      title,
      slug,
      excerpt,
      content,
      category,
      author,
      image,
      published,
      seriesId: body.seriesId || null,
      orderInSeries: body.orderInSeries || 0,
      metaTitle: metaTitle || title,
      metaDesc: metaDesc || excerpt,
      readTime: readTime || `${Math.ceil(content.split(" ").length / 200)} min read`,
    });

    const plain = post.toObject();
    return NextResponse.json({ ...plain, _id: undefined, id: plain._id?.toString() });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Cloud sync failed" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
    try {
      await dbConnect();
      const body = await req.json();
      const { id, title, slug, excerpt, content, category, author, image, published, metaTitle, metaDesc, readTime } = body;
  
      const post = await PostModel.findByIdAndUpdate(
        id,
        {
          title,
          slug,
          excerpt,
          content,
          category,
          author,
          image,
          published,
          seriesId: body.seriesId || null,
          orderInSeries: body.orderInSeries || 0,
          metaTitle: metaTitle || title,
          metaDesc: metaDesc || excerpt,
          readTime: readTime || `${Math.ceil(content.split(" ").length / 200)} min read`,
        },
        { new: true }
      ).lean();
  
      return NextResponse.json({ ...post, _id: undefined, id: (post as any)._id?.toString() });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: "System update error" }, { status: 500 });
    }
}
