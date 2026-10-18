import { projects } from "@/content/projects";
import { profileMarkdown, projectMarkdown, textResponse } from "@/lib/machine-readable";

export const dynamic = "force-static";
export function GET() {
  return textResponse([profileMarkdown(), ...projects.map(projectMarkdown)].join("\n\n---\n\n"));
}
