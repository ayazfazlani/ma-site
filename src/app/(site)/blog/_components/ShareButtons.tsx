"use client";

import { Share2, Bookmark, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const url = `https://masofts.com/blog/${slug}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
        toast.success("Shared successfully!");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          toast.error("Error sharing post");
        }
      }
    } else {
      // Fallback to copy link
      try {
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        toast.success("Link copied to clipboard!");
        setTimeout(() => setIsCopied(false), 2000);
      } catch (error) {
        toast.error("Failed to copy link");
      }
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast.success(!isBookmarked ? "Post saved for later!" : "Removed from bookmarks");
  };

  return (
    <div className="flex items-center gap-3">
      <button 
        onClick={handleBookmark}
        className={`p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-dark-900 border border-gray-100 dark:border-white/[0.05] shadow-sm transition-all group ${
          isBookmarked ? "text-primary-600 dark:text-primary-400 border-primary-500/20" : "text-gray-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500/20"
        }`} 
        title="Save for later"
      >
        <Bookmark className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110 ${isBookmarked ? "fill-current" : ""}`} />
      </button>
      <button 
        onClick={handleShare}
        className="p-3 sm:p-3.5 rounded-2xl bg-primary-600 text-white shadow-lg shadow-primary-600/20 flex items-center gap-2 sm:gap-3 font-bold text-sm px-4 sm:px-6 hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] transition-all" 
        title="Share Article"
      >
        {isCopied ? <Check className="w-4 h-4 sm:w-5 sm:h-5" /> : <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />}
        <span className="hidden sm:inline">{isCopied ? "Link Copied" : "Share Now"}</span>
      </button>
    </div>
  );
}
