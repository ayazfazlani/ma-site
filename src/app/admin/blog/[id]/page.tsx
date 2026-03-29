// src/app/admin/blog/[id]/page.tsx
import dbConnect from "@/lib/mongodb";
import PostModel from "@/models/Post";
import BlogForm from "../_components/BlogForm";
import { notFound } from "next/navigation";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  await dbConnect();
  const rawPost = await PostModel.findById(params.id).lean();
  
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
