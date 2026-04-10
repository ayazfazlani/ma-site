// src/app/admin/categories/page.tsx
import CategoriesManager from "./_components/CategoriesManager";

export const dynamic = "force-dynamic";

export default function AdminCategoriesPage() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <CategoriesManager />
    </div>
  );
}
