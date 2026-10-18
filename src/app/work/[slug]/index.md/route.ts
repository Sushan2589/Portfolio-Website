import { projects } from "@/content/projects";
import { projectMarkdown, textResponse } from "@/lib/machine-readable";

export const dynamic = "force-static";
export function generateStaticParams() {
  return projects.map(project => ({ slug: project.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) return new Response("Project not found\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" } });
  return textResponse(projectMarkdown(project), `/work/${project.slug}`, "text/markdown");
}
