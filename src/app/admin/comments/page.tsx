// src/app/admin/comments/page.tsx
import CommentsManager from "./_components/CommentsManager";

export const dynamic = "force-dynamic";

export default function AdminCommentsPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <CommentsManager />
    </div>
  );
}
