// components/Portfolio.tsx
import dbConnect from "@/lib/mongodb";
import ProjectModel from "@/models/Project";
import PortfolioWrapper from "./PortfolioWrapper";
import PortfolioList, { type PortfolioListProject } from "./PortfolioList";
import { uniqueBySlugOrTitle } from "@/lib/seo";

export default async function Portfolio({ initialProjects }: { initialProjects?: any[] }) {
  let dbProjects: any[] = initialProjects || [];

  if (!initialProjects) {
    await dbConnect();
    dbProjects = await ProjectModel.find({ active: true }).sort({ order: 1 }).lean();
  }

  type RawEntry = PortfolioListProject & { _id?: { toString(): string }; id?: string };
  const raw = (dbProjects && dbProjects.length > 0 ? dbProjects : []) as RawEntry[];
  const projects: PortfolioListProject[] = uniqueBySlugOrTitle(
    JSON.parse(
      JSON.stringify(
        raw.map((p) => ({
          ...p,
          _id: undefined,
          id: p._id?.toString?.() ?? p.id,
        }))
      )
    )
  );

  if (projects.length === 0) return null;

  return (
    <PortfolioWrapper>
      <PortfolioList initialProjects={projects} />
    </PortfolioWrapper>
  );
}
