import { site, isPublicLink } from "@/content/site";
import { competitions, education, experience, stack } from "@/content/experience";
import { projects, type Project } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

export function profileMarkdown() {
  return [
    `# ${site.name}`,
    `> ${site.description}`,
    `Website: ${absoluteUrl("/")}`,
    `Location: ${site.location}`,
    "## Experience",
    ...experience.map(entry => [
      `### ${entry.organization} — ${entry.role}`,
      [entry.period, entry.location].filter(Boolean).join(" · "),
      entry.summary,
      ...(entry.details ?? []).map(detail => `- ${detail}`),
    ].join("\n\n")),
    "## Hackathons and competitions",
    ...competitions.map(item => `- ${item.name}: ${item.result}. ${item.detail}.`),
    "## Education",
    ...education.map(item => `- ${item.institution}: ${item.qualification}${item.period ? ` (${item.period})` : ""}. ${item.location}.`),
    "## Technical skills",
    ...stack.map(group => `- ${group.label}: ${group.tools.join(", ")}.`),
    projectsMarkdown(),
    "## Links",
    `- [GitHub](${site.github})`,
    `- [LinkedIn](${site.linkedin})`,
    `- [Download Resume (PDF)](${absoluteUrl(site.resume)})`,
  ].join("\n\n");
}

export function projectsMarkdown() {
  return [
    "## Projects",
    ...projects.map(project => `- [${project.name}](${absoluteUrl(`/work/${project.slug}/index.md`)}): ${project.summary}`),
  ].join("\n\n");
}

export function projectMarkdown(project: Project) {
  return [
    `# ${project.name}`,
    `> ${project.summary}`,
    `Case study: ${absoluteUrl(`/work/${project.slug}`)}`,
    `Author: ${site.name}`,
    `Role: ${project.role}`,
    `Status: ${project.status}`,
    `Technologies: ${project.technologies.join(", ")}`,
    "## Problem", project.problem,
    "## Contribution", project.contribution,
    "## Approach", project.approach.map(item => `- ${item}`).join("\n"),
    "## Decision", project.decision,
    "## Tradeoff", project.tradeoff,
    "## Outcome", project.outcome,
    "## Lessons", project.lesson,
    "Interface illustrations on the case-study page explain the concept; they are not project screenshots.",
    ...(isPublicLink(project.repo) ? [`Source: ${project.repo}`] : []),
    ...(isPublicLink(project.demo) ? [`Demo: ${project.demo}`] : []),
  ].join("\n\n");
}

export function llmsGuide() {
  return [
    `# ${site.name} — Portfolio`,
    `> ${site.description}`,
    "This site presents Sushan’s projects, contributions, technical skills, education, and hackathon results. The Markdown pages below are generated from the same content as the public website.",
    "## Profile",
    `- [Profile, experience, education, and achievements](${absoluteUrl("/index.md")}): A readable overview of Sushan Dahal.`,
    `- [Project collection](${absoluteUrl("/projects/index.md")}): The portfolio’s project summaries.`,
    "## Project case studies",
    ...projects.map(project => `- [${project.name}](${absoluteUrl(`/work/${project.slug}/index.md`)}): ${project.summary}`),
    "## Optional",
    `- [Complete portfolio text](${absoluteUrl("/llms-full.txt")}): Profile and all case studies in one document.`,
    `- [Resume (PDF)](${absoluteUrl(site.resume)}): The supplied resume.`,
    `- [Website](${absoluteUrl("/")}): The visual portfolio, including a vertical story viewer.`,
    `- [GitHub](${site.github}): Sushan’s GitHub profile.`,
    `- [LinkedIn](${site.linkedin}): Sushan’s LinkedIn profile.`,
  ].join("\n\n");
}

export function textResponse(text: string, canonicalPath?: string, type = "text/plain") {
  const links = [`<${absoluteUrl("/llms.txt")}>; rel="describedby"; type="text/plain"`];
  if (canonicalPath) links.push(`<${absoluteUrl(canonicalPath)}>; rel="canonical"`);
  return new Response(`${text}\n`, {
    headers: {
      "Content-Type": `${type}; charset=utf-8`,
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=3600",
      "X-Content-Type-Options": "nosniff",
      "X-Robots-Tag": "noindex, follow",
      Link: links.join(", "),
    },
  });
}
