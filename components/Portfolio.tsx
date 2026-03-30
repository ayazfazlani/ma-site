// components/Portfolio.tsx
import dbConnect from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import PortfolioWrapper from "./PortfolioWrapper";
import PortfolioList, { type PortfolioListProject } from "./PortfolioList";

export default async function Portfolio() {
  await dbConnect();
  const dbProjects = await ProjectModel.find({ active: true }).sort({ order: 1 }).lean();

  // Simplified static projects as backup if DB is empty
  const staticProjects = [
    {
      id: "1",
      title: "AI-Powered ERP Solution",
      category: "Business Software",
      description: "Custom enterprise resource planning system with AI-driven inventory forecasting and real-time analytics.",
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: "2",
      title: "Fintech SaaS Dashboard",
      category: "Web Application",
      description: "High-performance financial monitoring dashboard for a European startup, built with Next.js and Chart.js.",
      color: "from-amber-500 to-orange-400",
    }
  ];

  type RawEntry = PortfolioListProject & { _id?: { toString(): string }; id?: string };
  const raw = (dbProjects.length > 0 ? dbProjects : staticProjects) as RawEntry[];
  const projects: PortfolioListProject[] = JSON.parse(
    JSON.stringify(
      raw.map((p) => ({
        ...p,
        _id: undefined,
        id: p._id?.toString?.() ?? p.id,
      }))
    )
  );

  return (
    <PortfolioWrapper>
      <PortfolioList initialProjects={projects} />
    </PortfolioWrapper>
  );
}
