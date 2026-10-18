import { projectsMarkdown, textResponse } from "@/lib/machine-readable";

export const dynamic = "force-static";
export function GET() {
  return textResponse(`# Projects by Sushan Dahal\n\n${projectsMarkdown()}`, "/projects", "text/markdown");
}
