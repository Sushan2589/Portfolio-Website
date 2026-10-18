import { llmsGuide, textResponse } from "@/lib/machine-readable";

export const dynamic = "force-static";
export function GET() {
  return textResponse(llmsGuide());
}
