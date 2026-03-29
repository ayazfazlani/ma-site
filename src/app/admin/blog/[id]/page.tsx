// src/app/admin/blog/[id]/page.tsx
import dbConnect from "@/lib/mongodb";
import PostModel from "@/models/Post";
import BlogForm from "../_components/BlogForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await dbConnect();
  const rawPost = await PostModel.findById(id).lean();
  
  if (!rawPost) {
    return notFound();
  }

  const post = { ...rawPost, _id: undefined, id: (rawPost as any)._id?.toString() };

  return (
    <div className="max-w-[1400px] mx-auto">
      <BlogForm initialData={post} />
    </div>
  );
}
