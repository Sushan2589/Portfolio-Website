// Maximum projects shown in Selected Work. Choose candidates with featured: true below.
// Projects appear in array order; /projects always shows the entire collection.
export const selectedWorkCount = 2;

export type Project = {
  slug: string;
  featured: boolean;
  name: string;
  category: string;
  summary: string;
  role: string;
  status: string;
  statusConfirmed: boolean;
  challenge: string;
  technologies: string[];
  repo: string;
  demo: string;
  image?: { src: string; alt: string; width: number; height: number };
  problem: string;
  contribution: string;
  approach: string[];
  decision: string;
  tradeoff: string;
  outcome: string;
  lesson: string;
};

// Draft descriptions are based on the supplied brief. Confirm roles, status,
// project-specific decisions, outcomes and lessons before public publication.
export const projects: Project[] = [
  {
    slug: "password-manager", featured: true, name: "Password Manager", category: "SECURITY & SYSTEMS",
    summary: "A password vault with custom session authentication and client-side encryption. Built with Next.js, Hono, PostgreSQL, and Drizzle.",
    role: "Developer & product builder", status: "Status to be confirmed", statusConfirmed: false,
    challenge: "Keeping account authentication separate from vault encryption, with plaintext vault data staying on the client.",
    technologies: ["Next.js", "Hono", "PostgreSQL", "Drizzle"], repo: "#linkhere", demo: "#linkhere",
    problem: "A password vault needs a usable interface and clear boundaries around sensitive data. Signing into an account and decrypting a vault solve different problems; the architecture should make that distinction explicit.",
    contribution: "The project brings together a Next.js interface, a Hono API, PostgreSQL with Drizzle, custom session authentication, and client-side vault encryption. This overview focuses on how those parts relate.",
    approach: ["Use the Next.js frontend for the vault interface and client-side encryption.", "Use custom sessions to authenticate requests to the Hono API. Authentication controls access; it does not decrypt vault contents.", "Persist encrypted vault data in PostgreSQL through Drizzle. Plaintext vault contents stay in the client."],
    decision: "Separate session authentication from client-side vault encryption. The API authenticates a request before handling encrypted vault data, while encryption and decryption belong to the client.",
    tradeoff: "This boundary adds client-side complexity, especially around key handling and recovery. It also means account access alone cannot be treated as a substitute for the ability to decrypt a vault. The exact key derivation and recovery design still need documentation.",
    outcome: "The supplied project scope covers authentication, encrypted vault storage, and application architecture. Development status, test coverage, deployment details, and a security review have not been supplied; this is not a claim of production readiness.",
    lesson: "A useful design principle from this architecture: document the data boundary before polishing the interface. A future detailed case study should include the encryption scheme, threat model, recovery limitations, and validation evidence.",
    
  },
  {
    slug: "fund-my-vision", featured: true, name: "Fund My Vision", category: "MARKETPLACE & COLLABORATION",
    summary: "A hackathon project connecting ideators and investors through role-based workflows, KYC, and chat.",
    role: "Hackathon contributor · details to confirm", status: "Hackathon project", statusConfirmed: true,
    challenge: "Making roles, KYC workflows, and conversations understandable within one product experience.",
    technologies: ["Role-based workflows", "KYC", "Chat"], repo: "https://my-project.com", demo: "https://my-project.com",
    problem: "Ideators and investors need a shared place to discover opportunities and start a conversation. Their goals differ, so the product needs to clarify each person's role and the steps required to participate.",
    contribution: "Fund My Vision is a hackathon project connecting ideators and investors, with roles, KYC workflows, and chat. Individual contribution and team responsibilities still need to be confirmed.",
    approach: ["Frame the experience around the different needs of ideators and investors.", "Make KYC workflow states clear in the user journey, without representing workflow completion as a guarantee of trust.", "Bring conversations into the product so discovery can lead to a direct exchange."],
    decision: "A central design question is how role and verification state affect which actions someone can take. The supplied brief identifies both workflows; the implemented authorization rules still need documentation.",
    tradeoff: "More explicit states can help explain the process, but they add branching paths and edge cases. This case study needs implementation evidence before claiming a specific authorization or verification approach.",
    outcome: "A hackathon project with ideator and investor roles, KYC workflows, and chat. Deployment status, the technology stack, KYC handling, and ongoing maintenance have not been supplied.",
    lesson: "The product raises a practical question worth exploring: how much process helps people connect, and when does it create friction? Add the team's actual observations and lessons here after confirming them."
  },
  {
    slug: "vidya", featured: false, name: "Vidya", category: "EDUCATION & COMMUNITY",
    summary: "An Olympiad awareness website giving students in Nepal a starting point for exploring competitions.",
    role: "Website builder · details to confirm", status: "Status to be confirmed", statusConfirmed: false,
    challenge: "Turning unfamiliar Olympiad information into a clear starting point for students.",
    technologies: ["Web development", "Content design"], repo: "#linkhere", demo: "#linkhere",
    problem: "Students in Nepal may not know where to begin with Olympiads. An awareness website can give them a more approachable introduction to the opportunities and the questions to ask next.",
    contribution: "Vidya is an Olympiad awareness website for Nepal. This overview presents its purpose; the exact scope of my contribution, technology stack, and content sources still need confirmation.",
    approach: ["Introduce the purpose of Olympiads in language students can understand.", "Organize awareness content around subjects and a clear path to learning more.", "Prioritize readable, accessible presentation across phones and larger screens."],
    decision: "An important implementation consideration is separating lasting introductory content from information that changes, such as eligibility and dates. The current content model and publishing workflow have not been supplied.",
    tradeoff: "A simple content website can be easier to maintain, but time-sensitive information still requires an owner and regular review. Link and date verification should be part of any future publishing process.",
    outcome: "The supplied scope is an Olympiad awareness website for Nepal. Current publication status, screenshots, visitor feedback, and maintenance details have not been supplied.",
    lesson: "This project invites a useful content-design principle: make the first step clear. Replace this draft reflection with actual student feedback and project lessons when available."
  }
  
];
