export type Experience = {
  organization: string;
  role: string;
  period: string;
  summary: string;
  details?: string[];
  url?: string;
};

// Keep entries newest first. The first five show; the rest enter the archive.
// Change this to 4 if you prefer a shorter initial timeline.
export const experiencePreviewCount = 5;

// Add verified entries here. Dates and employment history are never invented.
// { organization: "Organization", role: "Your role", period: "2025 – Present",
//   summary: "A short description of your work.", details: ["One concrete contribution."],
//   url: "https://example.com" }
export const experience: Experience[] = [
  {
    organization: "Your company or project",
    role: "Your role",
    period: "Jan 2025 – Present",
    summary: "A short description of your work.",
    details: [
      "One meaningful contribution.",
      "Another responsibility or achievement.",
    ],
    url: "https://example.com",
  },
  {
    organization: "Your company or project",
    role: "Your role",
    period: "Jan 2025 – Present",
    summary: "A short description of your work.",
    details: [
      "One meaningful contribution.",
      "Another responsibility or achievement.",
    ],
    url: "https://example.com",
  },
  {
    organization: "Your company or project",
    role: "Your role",
    period: "Jan 2025 – Present",
    summary: "A short description of your work.",
    details: [
      "One meaningful contribution.",
      "Another responsibility or achievement.",
    ],
    url: "https://example.com",
  },
  {
    organization: "Your company or project",
    role: "Your role",
    period: "Jan 2025 – Present",
    summary: "A short description of your work.",
    details: [
      "One meaningful contribution.",
      "Another responsibility or achievement.",
    ],
    url: "https://example.com",
  },
  {
    organization: "Your company or project",
    role: "Your role",
    period: "Jan 2025 – Present",
    summary: "A short description of your work.",
    details: [
      "One meaningful contribution.",
      "Another responsibility or achievement.",
    ],
    url: "https://example.com",
  },
  {
    organization: "Your company or project",
    role: "Your role",
    period: "Jan 2025 – Present",
    summary: "A short description of your work.",
    details: [
      "One meaningful contribution.",
      "Another responsibility or achievement.",
    ],
    url: "https://example.com",
  },
  {
    organization: "Your company or project",
    role: "Your role",
    period: "Jan 2025 – Present",
    summary: "A short description of your work.",
    details: [
      "One meaningful contribution.",
      "Another responsibility or achievement.",
    ],
    url: "https://example.com",
  },
  {
    organization: "Your company or project",
    role: "Your role",
    period: "Jan 2025 – Present",
    summary: "A short description of your work.",
    details: [
      "One meaningful contribution.",
      "Another responsibility or achievement.",
    ],
    url: "https://example.com",
  },
];

export const stack = [
  { label: "Interfaces", tools: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { label: "Backend & data", tools: ["Node.js", "Hono", "Express", "PostgreSQL", "Drizzle"] },
  { label: "Practices", tools: ["Authentication", "Validation", "Testing", "Deployment"] },
];
