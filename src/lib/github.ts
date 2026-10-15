export type ContributionDay = { date: string; level: number; label: string };
export type ContributionData = { days: ContributionDay[]; total: number | null };

export function githubUsername(url: string): string | null {
  const match = url.match(/^https:\/\/(?:www\.)?github\.com\/([a-z\d](?:[a-z\d-]{0,38}))(?:\/?|[?#].*)$/i);
  return match?.[1] ?? null;
}

// Read the public calendar's date, level, tooltip, and total. No HTML is rendered.
// Missing or changed GitHub markup fails closed rather than inventing activity.
export function parseContributions(html: string): ContributionData | null {
  const labels = new Map<string, string>();
  for (const match of html.matchAll(/<tool-tip\b([^>]*)>([\s\S]*?)<\/tool-tip>/g)) {
    const id = match[1].match(/\bfor="([^"]+)"/)?.[1];
    if (id) labels.set(id, match[2].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim());
  }
  const days: ContributionDay[] = [];
  for (const match of html.matchAll(/<td\b[^>]*\bdata-date="\d{4}-\d{2}-\d{2}"[^>]*>/g)) {
    const tag = match[0];
    const date = tag.match(/data-date="([^"]+)"/)?.[1];
    const rawLevel = tag.match(/data-level="([0-4])"/)?.[1];
    const id = tag.match(/\bid="([^"]+)"/)?.[1];
    if (date && rawLevel !== undefined) days.push({ date, level: Number(rawLevel), label: (id && labels.get(id)) || `${date}: activity level ${rawLevel} of 4` });
  }
  if (!days.length) return null;
  const heading = html.match(/<h2\b[^>]*id="js-contribution-activity-description"[^>]*>([\s\S]*?)<\/h2>/)?.[1];
  const totalText = heading?.replace(/<[^>]+>/g, "").match(/([\d,]+)\s+contributions?/i)?.[1];
  return { days: days.sort((a, b) => a.date.localeCompare(b.date)), total: totalText ? Number(totalText.replace(/,/g, "")) : null };
}

export async function getContributions(username: string): Promise<ContributionData | null> {
  try {
    const response = await fetch(`https://github.com/users/${encodeURIComponent(username)}/contributions`, { next: { revalidate: 21600 }, signal: AbortSignal.timeout(8000), headers: { Accept: "text/html" } });
    return response.ok ? parseContributions(await response.text()) : null;
  } catch { return null; }
}
