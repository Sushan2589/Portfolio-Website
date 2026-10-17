export type Experience = {
  organization: string;
  role: string;
  period?: string;
  location?: string;
  summary: string;
  details?: string[];
  url?: string;
};

// Show the five resume roles in their supplied order. Add dates when available.
export const experiencePreviewCount = 5;

export const experience: Experience[] = [
  {
    organization: "VIDYA",
    role: "App Developer",
    location: "Nepal",
    summary: "Built application features using Bun, Next.js, and SQLite.",
  },
  {
    organization: "National SXC Science Fest",
    role: "App Developer",
    location: "St. Xavier’s College",
    summary: "Co-built the official registration and information website for the science fest.",
  },
  {
    organization: "Computer Club",
    role: "Executive",
    location: "St. Xavier’s College",
    summary: "Contributed to organizing and running technical events for the college’s Computer Club.",
  },
  {
    organization: "Nepal International ADR Center (NIAC)",
    role: "Technical Support",
    location: "Nepal",
    summary: "Supported website improvements, event design, and email marketing campaigns.",
    details: [
      "Worked on polishing and refining NIAC’s website.",
      "Assisted with event banner design and email marketing campaigns.",
    ],
  },
  {
    organization: "ICMB",
    role: "Co-editor & Technical Support",
    location: "Nepal",
    summary: "Helped build and maintain the website and supported community outreach.",
    details: [
      "Helped build and maintain the ICMB website.",
      "Supported the technical aspects of outreach, including teaching children and running tech-awareness events.",
    ],
  },
];

export const competitions = [
  { name: "PCPS Hack4Impact", result: "Winner", detail: "Fund My Vision" },
  { name: "BNKS National Hackathon", result: "Runner-up", detail: "GameEDU" },
  { name: "ACEM Arambha Hackathon", result: "Selected", detail: "The only +2-level team selected" },
];

export const education = [
  { institution: "St. Xavier’s College, Maitighar", qualification: "NEB, Grades 11–12", period: "2024–2026", location: "Kathmandu, Nepal" },
  { institution: "VS Niketan H.S. School", qualification: "Through Grade 10", location: "Tinkune, Nepal" },
];

export const stack = [
  { label: "Interfaces", tools: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS", "Tailwind CSS"] },
  { label: "Backend & data", tools: ["Node.js", "Express.js", "Bun", "PHP", "MongoDB", "SQLite", "Hono", "PostgreSQL", "Drizzle"] },
  { label: "Tools & integrations", tools: ["Git", "GitHub", "REST APIs", "Khalti Payment Integration"] },
];
