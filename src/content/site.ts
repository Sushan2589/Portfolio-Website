export const site = {
  name: "Sushan Dahal",
  location: "Kathmandu, Nepal",
  description: "Software developer and product builder in Kathmandu, Nepal. Thoughtful web applications, practical experiments, and the thinking behind them.",
  // Replace these values if your public contact or profile details change.
  url: "https://sushandahal.com.np",
  email: "sushandahal06@gmail.com",
  github: "https://github.com/Sushan2589",
  linkedin: "https://www.linkedin.com/in/sushan-dahal",
  // Replace public/resume.pdf to update the downloadable resume.
  resume: "/resume.pdf",
  availability: "",
} as const;

export function isPublicLink(value?: string): value is string {
  return Boolean(value && (/^https?:\/\//.test(value) || /^\/(?!\/)/.test(value)));
}
export function isEmail(value?: string): value is string {
  return Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
}
