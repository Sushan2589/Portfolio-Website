import { ProjectIllustration } from "@/components/project-illustration";
import { ProjectImage } from "@/components/project-image";
import type { Project } from "@/content/projects";
export function ProjectMedia({ project }: { project: Pick<Project, "slug" | "image"> }) {
  return project.image ? <ProjectImage project={{ slug: project.slug, image: project.image }} /> : <ProjectIllustration slug={project.slug} />;
}
