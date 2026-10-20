// Maximum projects shown in Selected Work. Choose candidates with featured: true below.
// Projects appear in array order; /projects always shows the entire collection.
export const selectedWorkCount = 4;

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
  slug: "fund-my-vision",
  featured: true,
  name: "Fund My Vision",
  category: "STARTUP MARKETPLACE",
  summary:
    "An award-winning hackathon project connecting entrepreneurs with potential investors through opportunity discovery, role-based access, KYC verification, and real-time messaging.",

  role: "Backend Developer",
  status: "1st Place — PCPS Hack4Impact",
  statusConfirmed: true,

  challenge:
    "Building a functional two-sided investment marketplace within a hackathon deadline, while managing different user permissions, investor verification, and real-time communication.",

  technologies: [
    "Node.js",
    "Express.js",
    "React",
    "SQLite",
    "JavaScript"
  ],

  repo: "https://github.com/Sushan2589/FundMyVision",
  demo: "",

  problem:
    "Early-stage entrepreneurs often struggle to reach potential investors, while investors lack a centralized way to discover promising ideas and connect directly with their creators. Fund My Vision aimed to bridge this gap through a platform designed around both sides of the investment process.",

  contribution:
    "Led backend development for the hackathon project, building the Express.js server, database models, session-based authentication, role-based authorization, investor KYC workflows, and real-time messaging infrastructure. Worked as part of a team to integrate the backend with the React frontend.",

  approach: [
    "Designed separate workflows for ideators, investors, and administrators, with role-specific permissions and dashboard access.",
    "Implemented session-based authentication and middleware to protect routes and enforce user permissions.",
    "Built an investor KYC submission and administrative review workflow, including approval and rejection states.",
    "Structured SQLite tables for users, profiles, business ideas, investor interests, conversations, and messages.",
    "Integrated Socket.IO for real-time communication between investors and ideators, with messages persisted in the database.",
    "Connected opportunity discovery and investor-interest workflows to direct conversations between users.",
    "Prioritized end-to-end functionality and backend integration to deliver a working hackathon prototype."
  ],

  decision:
    "Used Express.js with SQLite to minimize infrastructure complexity and accelerate development within the hackathon timeframe. Centralized authentication and authorization through middleware, while using Socket.IO to support real-time conversations without repeatedly polling the server.",

  tradeoff:
    "Prioritized a working end-to-end marketplace over production-scale infrastructure. SQLite and session-based authentication provided a straightforward foundation for the prototype, but a production release would require stronger verification controls, security reviews, and scalability planning.",

  outcome:
    "Won 1st place at PCPS Hack4Impact with Team Aparichit. Delivered a working marketplace prototype featuring separate user roles, investor KYC review, business idea discovery, and real-time messaging. The source code is publicly available on GitHub, although the application is not currently hosted.",

  lesson:
    "Learned how to design and integrate interconnected backend systems under tight deadlines. The experience strengthened my understanding of authentication, authorization, relational data modeling, real-time communication, and coordinating technical priorities within a team."
},

  {
    slug: "judge-tunes",
    featured: false,
    name: "Judge Tunes",
    category: "Social Music Platform",

    summary:
      "A group-based music recommendation platform where friends can create communities, share songs, and discover music together.",

    role: "Solo Developer",
    status: "Prototype",
    statusConfirmed: true,

    challenge:
      "Building a simple, collaborative way for friends to exchange music recommendations without losing shared songs in scattered conversations.",

    technologies: [
      "Next.js",
      "JavaScript",
      "React",
      "Clerk",
      "MongoDB",
      "Mongoose",
      "Tailwind CSS",
      "Vercel",
    ],

    repo: "https://github.com/Sushan2589/JudgeTunes",
    demo: "https://judge-tunes.vercel.app/",

    problem:
      "Sharing music with friends often means sending individual links through messaging apps, where recommendations become difficult to revisit. Judge Tunes was created to give groups a dedicated space to collect and share songs, particularly for shared experiences like road trips.",

    contribution:
      "Independently conceptualized, designed, developed, and deployed Judge Tunes as one of my earliest web development projects. Implemented the core group-based recommendation experience, integrated Clerk for authentication, and used MongoDB for application data.",

    approach: [
      "Built the application using Next.js and JavaScript.",
      "Integrated Clerk to handle user authentication.",
      "Used MongoDB and Mongoose for data persistence.",
      "Developed group creation and joining functionality.",
      "Implemented song-link sharing within groups.",
      "Designed the interface using Tailwind CSS.",
      "Deployed the prototype on Vercel.",
    ],

    decision:
      "Chose to focus on music recommendations within private communities rather than developing a full music streaming platform. Used Clerk for authentication to concentrate development effort on the application's core features.",

    tradeoff:
      "Kept the project intentionally lightweight, prioritizing group creation and song sharing over advanced functionality such as streaming, recommendation algorithms, and music service integrations.",

    outcome:
      "Built and deployed a functional early-stage prototype that demonstrates group-based music sharing. The project represents an early milestone in my journey from experimenting with web technologies to developing complete applications.",

    lesson:
      "Gained foundational experience in full-stack development, authentication, database integration, and deployment. More importantly, learned how to turn a simple idea into a usable product by prioritizing essential features and keeping the initial scope manageable.",
  },

  {
  slug: "canteen-management-system",
  featured: false,
  name: "Canteen Management System",
  category: "FULL-STACK WEB APPLICATION",

  summary:
    "A PHP-based canteen management application built as a Grade 12 project, featuring food ordering, prepaid balances, administrative controls, and receipt generation.",

  role: "Developer",
  status: "Grade 12 Academic Project",
  statusConfirmed: true,

  challenge:
    "Bringing customer ordering, account balances, menu administration, and transaction records together into a single web application using PHP and SQL.",

  technologies: [
    "PHP",
    "MySQL",
    "JavaScript",
    "HTML",
    "CSS"
  ],

  repo: "https://github.com/Sushan2589/Canteen-Management-System",
  demo: "http://smartbhansa.rf.gd/",

  problem:
    "Traditional school canteens can depend on manual ordering, cash handling, and disconnected records. This project explored how a simple web application could organize food purchases, maintain customer balances, and give administrators better control over daily operations.",

  contribution:
    "Developed a full-stack canteen management application using PHP, MySQL, HTML, CSS, and JavaScript. Implemented customer-facing ordering functionality, session-based login flows, administrative features for managing menus and accounts, balance top-ups, checkout processing, and order receipts.",

  approach: [
    "Built separate customer and administrator interfaces for different operational needs.",
    "Used PHP sessions to manage authenticated access to customer and administrative functionality.",
    "Connected the application to a MySQL database for storing users, account balances, orders, and order items.",
    "Implemented menu management functionality for administrators.",
    "Developed a cart checkout workflow that calculates order totals and checks available customer balances.",
    "Implemented a prepaid account system with administrator-managed balance top-ups.",
    "Stored purchase records and individual order items for receipt generation."
  ],

  decision:
    "Chose a traditional PHP and MySQL architecture to build a complete server-rendered application without introducing a separate frontend framework or API service. Used prepaid account balances to simplify the ordering workflow for a school canteen environment.",

  tradeoff:
    "The straightforward PHP architecture made the application approachable for an academic project, but the checkout and balance-management logic would need stronger input validation, parameterized queries, and database transactions before production use.",

  outcome:
    "Completed a Grade 12 academic project demonstrating customer ordering, administrative management, prepaid balances, and order processing. Published the source code on GitHub, with a deployment URL listed in the repository.",

  lesson:
    "Gained practical experience connecting frontend interfaces with server-side PHP logic and relational databases. The project helped build an understanding of sessions, CRUD operations, order processing, and the importance of data consistency and security in applications that manage account balances."
},
{
  slug: "get-me-a-chiya",
  featured: false,
  name: "Get Me A Chiya",
  category: "FINTECH & PAYMENT INTEGRATION",

  summary:
    "A Nepal-focused digital tipping experiment built to explore eSewa wallet integration, payment workflows, and transaction handling in a full-stack web application.",

  role: "Solo Developer",
  status: "Learning Project",
  statusConfirmed: true,

  challenge:
    "Understanding how an external payment gateway integrates with a web application, from initiating a transaction to handling payment responses and maintaining reliable transaction records.",

  technologies: [
    "Next.js",
    "JavaScript",
    "React",
    "eSewa",
    "MongoDB",
    "Mongoose",
    "Clerk",
    "Tailwind CSS"
  ],

  repo: "https://github.com/Sushan2589/GetMeAChiya",
  demo: "",

  problem:
    "Integrating digital payments involves more than redirecting users to a wallet. Applications need to manage transaction identifiers, payment states, gateway responses, and the relationship between a payment and the user who initiated it. This project explores those challenges through a simple digital tipping concept.",

  contribution:
    "Independently developed a Next.js application to experiment with integrating Nepal's eSewa payment gateway. Explored authenticated user flows, database-backed application state, and the technical requirements of connecting an external wallet service to a web application.",

  approach: [
    "Built the application using Next.js and JavaScript.",
    "Used Clerk for user authentication.",
    "Structured database access using MongoDB and Mongoose.",
    "Explored eSewa payment initiation and gateway integration.",
    "Studied transaction identifiers, payment responses, and verification requirements.",
    "Developed a lightweight tipping concept to provide a practical use case for payment integration."
  ],

  decision:
    "Chose eSewa as the payment provider to gain hands-on experience with a widely used Nepali digital wallet. Used a simple tipping application to keep the product scope small and concentrate on understanding the payment integration process.",

  tradeoff:
    "Prioritized learning the integration workflow over building a production-ready financial application. The project was not intended to provide commercial-grade payment processing, fraud prevention, reconciliation, or operational monitoring.",

  outcome:
    "Created a full-stack learning project centered on eSewa wallet integration. The repository documents an early exploration of payment workflows using Next.js, authentication, and database-backed application architecture.",

  lesson:
    "Developed a stronger understanding of third-party API integration and the complexities of payment processing. Learned why payment status must be verified through trusted server-side mechanisms rather than relying solely on client-side redirects or success messages."
},
{
  slug: "get-me-a-coffee-cli",
  featured: false,
  name: "GetMeACoffee CLI",
  category: "CLI TOOLS & FINTECH",

  summary:
    "A terminal-based creator tipping tool that integrates Khalti payments, allowing users to send virtual coffees, attach messages, and track contributions directly from the command line.",

  role: "Solo Developer",
  status: "Learning Project",
  statusConfirmed: true,

  challenge:
    "Integrating a browser-based payment gateway into a command-line experience while ensuring that contributions are recorded only after payment verification.",

  technologies: [
    "Node.js",
    "JavaScript",
    "Express.js",
    "SQLite",
    "Khalti ePayment API",
    "Node.js Readline"
  ],

  repo: "https://github.com/Sushan2589/GetMeACoffee-CLI",
  demo: "",

  problem:
    "Most creator-support platforms rely on graphical web interfaces. This project explores whether developers can support creators directly from their terminals while still using a conventional payment gateway. The main technical challenge is bridging CLI interactions with external payment flows and maintaining trustworthy transaction records.",

  contribution:
    "Independently developed a command-line tipping application with a Node.js CLI, Express backend, and SQLite database. Integrated Khalti's ePayment API for payment initiation and verification, implemented username-based creator registration, contribution tracking, and backend rate limiting.",

  approach: [
    "Built an interactive command-line interface using Node.js and readline/promises.",
    "Implemented username-based creator registration and lookup.",
    "Developed Express API endpoints for registration, contributions, payment verification, and contribution history.",
    "Integrated Khalti ePayment API v2 to initiate payments and generate payment links.",
    "Used Khalti's payment lookup API to verify transaction status before marking contributions as completed.",
    "Stored creator information and contribution records in SQLite without an ORM.",
    "Supported anonymous contributions with optional sender names and messages.",
    "Added rate limiting to sensitive endpoints and documented a sandbox testing workflow."
  ],

  decision:
    "Separated the terminal interface from payment processing by using an Express backend. Chose SQLite for lightweight persistence and Khalti's hosted payment flow to avoid collecting sensitive payment credentials directly in the CLI.",

  tradeoff:
    "Using a hosted payment gateway means users must leave the terminal to complete payment in a browser. The architecture also requires a running backend service, rather than operating as a completely standalone CLI. These compromises kept payment processing outside the terminal and made the integration easier to reason about.",

  outcome:
    "Built a functional CLI prototype supporting creator registration, username-based tipping, payment initiation, transaction verification, and contribution history. Published the source code with a demonstration GIF and Khalti sandbox setup instructions.",

  lesson:
    "Learned how to design interactive command-line applications and connect them to external services. Gained practical experience with payment initiation, server-side transaction verification, API design, lightweight persistence, and protecting financial workflows from untrusted client responses."
},

{
  slug: "localify",
  featured: true,
  name: "Localify",
  category: "AUTOMATION & DEVELOPER TOOLS",

  summary:
    "A Python-powered CLI that turns public Spotify playlists into local MP3 collections using browser automation, YouTube search, and intelligent track matching — no Spotify API key or Premium subscription required.",

  role: "Solo Developer",
  status: "Open Source — Local Utility",
  statusConfirmed: true,

  challenge:
    "Extracting complete track lists from Spotify's dynamically loaded web interface and reliably matching songs to YouTube audio without using Spotify's official API.",

  technologies: [
    "Python",
    "Playwright",
    "yt-dlp",
    "FFmpeg",
    "Chromium",
    "Deno"
  ],

  repo: "https://github.com/Sushan2589/Localify",
  demo: "",

  problem:
    "Spotify playlists are convenient for organizing music, but accessing those collections as local audio files is not straightforward. Localify explores an automated workflow for extracting public playlist metadata and finding corresponding audio on YouTube, without requiring Spotify API credentials.",

  contribution:
    "Developed a Python-based command-line utility that automates playlist extraction, track matching, and local audio downloads. Implemented headless browser scraping, lazy-loaded content handling, duration-based matching, MP3 conversion, and error-tolerant batch processing.",

  approach: [
    "Used Playwright with headless Chromium to navigate public Spotify playlist pages.",
    "Implemented automated scrolling to extract tracks from dynamically loaded playlists.",
    "Collected track titles, artists, albums, and durations without using the Spotify API.",
    "Integrated yt-dlp to search YouTube for corresponding audio.",
    "Compared Spotify and YouTube track durations to improve match accuracy.",
    "Used FFmpeg to extract and convert matched audio into MP3 files.",
    "Organized downloaded files using playlist position, artist, and song title.",
    "Added error handling to skip unmatched tracks and continue processing when individual downloads fail.",
    "Introduced randomized delays between downloads to reduce request frequency."
  ],

  decision:
    "Chose browser automation instead of Spotify's official API to experiment with extracting publicly available metadata directly from dynamic web pages. Used duration-based matching as a lightweight heuristic rather than introducing complex audio fingerprinting or external recognition services.",

  tradeoff:
    "Scraping depends on Spotify's page structure and may break when the interface changes. Duration-based matching is efficient but cannot always distinguish original recordings from remixes, covers, or live performances. YouTube availability, rate limits, and external tooling also affect reliability.",

  outcome:
    "Built a locally runnable CLI that accepts a public Spotify playlist URL, extracts its tracks, searches for matching YouTube audio, and saves successful downloads as organized MP3 files. Published the source code and setup instructions on GitHub for local experimentation.",

  lesson:
    "Learned how to automate dynamic websites, handle lazy-loaded content, integrate command-line tools, and build resilient multi-stage data pipelines. The project reinforced the importance of validating scraped data, handling partial failures, and understanding the limitations of heuristic matching."
},

{
  slug: "vidya-nepal",
  featured: true,
  name: "Vidya Nepal",
  category: "EDTECH & EDUCATION",

  summary:
    "The official website for Vidya, a Nepal-based initiative dedicated to spreading Olympiad awareness and helping students discover opportunities beyond traditional classroom learning.",

  role: "Web Developer — Team Project",
  status: "Live — Organization Website",
  statusConfirmed: true,

  challenge:
    "Translating an educational organization's mission into an accessible, engaging, and credible digital presence that encourages students to explore academic Olympiads.",

  technologies: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Aceternity UI",
    "EmailJS",
    "Node.js",
    "Vercel"
  ],

  repo: "https://github.com/Sushan2589/Vidya",
  demo: "https://www.vidyanepal.tech/",

  problem:
    "Many students in Nepal have limited exposure to academic Olympiads and international competitive learning opportunities. Information about these competitions can be fragmented, making it difficult for interested students to discover opportunities and understand how to get involved. Vidya aims to help bridge this awareness gap.",

  contribution:
    "Collaborated with the Vidya team to develop the organization's website using Next.js and React. Worked on the frontend experience, responsive layouts, reusable components, visual presentation, and contact functionality to establish a professional online presence for the initiative.",

  approach: [
    "Built the website using Next.js and a component-based React architecture.",
    "Developed responsive layouts to support desktop and mobile visitors.",
    "Created an engaging landing page communicating Vidya's educational mission.",
    "Implemented informational sections introducing the organization and its objectives.",
    "Developed an interactive timeline to present the organization's story.",
    "Integrated EmailJS for contact form functionality.",
    "Used Tailwind CSS and customized UI components to create a consistent visual experience.",
    "Collaborated with team members on website development and iterative improvements.",
    "Deployed the website under Vidya's custom domain."
  ],

  decision:
    "Chose Next.js for its component-based architecture, routing, and suitability for a public-facing organizational website. Focused on clear information hierarchy and reusable UI components rather than unnecessary application complexity.",

  tradeoff:
    "Prioritized a polished, accessible public website and essential communication features over building a complex educational platform. This allowed the team to establish Vidya's digital presence while leaving room for future content and community features.",

  outcome:
    "Developed and launched Vidya's organizational website at vidyanepal.tech. The project provides a dedicated digital presence for an initiative focused on improving Olympiad awareness among students in Nepal and represents practical experience building software collaboratively for a real organization.",

  lesson:
    "Learned how to translate an organization's mission into a functional digital product, collaborate within a development team, and balance visual design with maintainable frontend architecture. Gained experience working on a real-world website where communication, usability, and credibility matter as much as technical implementation."
},

{
  slug: "best-password-manager",
  featured: true,
  name: "Best Password Manager",
  category: "CYBERSECURITY & FULL-STACK ENGINEERING",

  summary:
    "An open-source password manager built around client-side AES-256-GCM encryption, Argon2id key derivation, custom session authentication, and a TypeScript monorepo with a Next.js frontend and Hono API.",

  role: "Solo Developer & System Architect",
  status: "Actively Building",
  statusConfirmed: true,

  challenge:
    "Designing a password manager that separates authentication from vault encryption, keeps sensitive credentials encrypted before reaching the backend, and maintains a practical user experience across a web application and planned browser extension.",

  technologies: [
    "TypeScript",
    "Next.js",
    "React",
    "Hono",
    "Node.js",
    "PostgreSQL",
    "Neon",
    "Drizzle ORM",
    "Argon2id",
    "AES-256-GCM",
    "Zod",
    "Tailwind CSS",
    "Vitest",
    "Playwright"
  ],

  repo: "https://github.com/Sushan2589/Best-Password-Manager-LEARNING",
  demo: "",

  problem:
    "Password reuse and insecure credential storage expose users to unnecessary security risks. Building a trustworthy password manager requires more than storing passwords behind a login: it requires careful key management, encryption boundaries, secure authentication, and protection against unauthorized access. This project explores those engineering challenges through a self-built password management system.",

  contribution:
    "Independently designed and developed a full-stack password manager using Next.js, Hono, TypeScript, PostgreSQL, and Drizzle ORM. Implemented custom session-based authentication, Argon2id password hashing, client-side vault encryption using AES-256-GCM, master-password-derived vault keys, protected API routes, and encrypted credential CRUD operations. Developed the vault interface, account management workflows, and authentication screens, while expanding the project toward browser extension integration.",

  approach: [
    "Structured the application as an npm-workspaces monorepo with separate Next.js frontend and Hono backend applications.",
    "Designed PostgreSQL schemas using Drizzle ORM for users, sessions, and encrypted vault records.",
    "Implemented registration and login using Argon2id password hashing and Zod input validation.",
    "Built custom session authentication using cryptographically random tokens, SHA-256 token hashes, and HttpOnly cookies.",
    "Separated account authentication from vault unlocking, deriving encryption keys from a dedicated master password using Argon2id.",
    "Implemented client-side AES-256-GCM encryption so credential contents are encrypted before being sent to the backend.",
    "Kept the vault encryption key in memory rather than persisting the plaintext key in browser storage.",
    "Developed authenticated Hono API endpoints for managing user accounts and encrypted vault entries.",
    "Built credential creation, editing, deletion, search, and visibility controls within the Next.js vault interface.",
    "Added account management and authentication-related UI states.",
    "Planned browser extension functionality for credential detection, saving, and autofill.",
    "Introduced Vitest and Playwright into the development stack for automated testing."
  ],

  decision:
    "Separated login authentication from vault encryption so an authenticated session alone does not unlock stored credentials. Chose client-side AES-256-GCM encryption with Argon2id-derived keys, storing encrypted vault data on the server while keeping the decryption key in browser memory. Used Hono and Drizzle ORM to maintain explicit control over backend behavior, database access, and security-sensitive application logic.",

  tradeoff:
    "Client-side encryption introduces additional complexity around key derivation, vault unlocking, session management, and recovery. Keeping the vault key exclusively in memory requires users to unlock the vault again after a refresh or new session. A custom authentication and cryptography architecture also increases the responsibility for testing, threat modeling, and security review compared with relying entirely on established managed services.",

  outcome:
    "Developed a working full-stack foundation with user registration, login, session management, encrypted vault operations, and account management. The project remains under active development, with browser extension support, password generation, automatic locking, deployment, and further security hardening forming part of the ongoing roadmap. It is an educational security-engineering project, not an independently audited password manager.",

  lesson:
    "Gained hands-on experience with applied cryptography, authentication design, secure session handling, relational database architecture, and full-stack TypeScript development. Learned that security depends on the interaction of many systems, including key lifecycle management, encryption boundaries, authorization, browser behavior, and operational safeguards—not simply choosing strong cryptographic algorithms."
},

];
