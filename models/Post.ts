import mongoose, { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
    },
    slug: {
      type: String,
      required: [true, "Post slug is required"],
      unique: true,
    },
    excerpt: String,
    content: {
      type: String,
      required: [true, "Post content is required"],
    },
    category: String,
    author: String,
    date: {
      type: Date,
      default: Date.now,
    },
    readTime: String,
    image: String,
    published: {
      type: Boolean,
      default: false,
    },
    metaTitle: String,
    metaDesc: String,
  },
  {
    timestamps: true,
  }
);

const Post = models.Post || model("Post", PostSchema);
export default Post;
