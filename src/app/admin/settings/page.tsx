// src/app/admin/settings/page.tsx
import dbConnect from "@/lib/mongodb";
import SiteSettingsModel from "@/models/SiteSettings";
import SettingsForm from "./_components/SettingsForm";

export default async function SettingsPage() {
  await dbConnect();
  const rawSettings = await SiteSettingsModel.findById("settings").lean();
  const settings = rawSettings ? { ...rawSettings, _id: undefined, id: (rawSettings as any)._id?.toString() } : null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-2">Platform Settings</h2>
        <p className="text-gray-500 dark:text-neutral-400 font-medium font-heading tracking-wide uppercase text-xs">Configure your brand identity and SEO defaults.</p>
      </div>

      <SettingsForm initialData={settings} />
    </div>
  );
}
