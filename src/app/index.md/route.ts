import { profileMarkdown, textResponse } from "@/lib/machine-readable";

export const dynamic = "force-static";
export function GET() {
  return textResponse(profileMarkdown(), "/", "text/markdown");
}
