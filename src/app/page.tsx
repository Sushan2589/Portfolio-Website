import { NavigationLink as Link } from "@/components/navigation-link";
import { ArrowRight, Code2, MapPin, MoveUpRight } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { ProjectCard } from "@/components/project-card";
import { SocialLinks } from "@/components/social-links";
import { ContactPanel } from "@/components/contact-panel";
import { Signature } from "@/components/signature";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { BehindTheScenes } from "@/components/behind-the-scenes";
import { projects, selectedWorkCount } from "@/content/projects";
import { EmailButton } from "@/components/email-button";
import { ResumeDownload } from "@/components/resume-download";
import { Doomscroll } from "@/components/doomscroll";
const principles = [
  {
    number: "01",
    title: "Start with a useful problem",
    summary: "Product thinking before the technology choices.",
    detail:
      "I’m interested in SaaS, marketplaces, and useful tools. I like to understand what someone is trying to do before deciding what to build.",
  },
  {
    number: "02",
    title: "Understand what’s underneath",
    summary: "Interfaces, APIs, and the boundaries between them.",
    detail:
      "Backend development is a big part of my curiosity. I enjoy working through authentication, validation, data models, and the decisions that make an application understandable.",
  },
  {
    number: "03",
    title: "Learn by making things",
    summary: "Practical experiments with room to improve.",
    detail:
      "Building helps me ask better questions. I’m especially interested in the opportunities for useful technology in Nepal, and what small, focused products can make possible.",
  },
];
export default function Home() {
  return (
    <main id="main" className="page-width">
      <section className="intro" aria-labelledby="intro-title">
        <div className="intro-heading">
          <div>
            <h1 id="intro-title">
              hey, Sushan here<span className="hello-dot">.</span>
            </h1>
            <p className="intro-location">
              <MapPin size={11} /> building things from Kathmandu, Nepal
            </p>
          </div>
          <Avatar />
        </div>
        <p className="intro-bio">
          <mark>Software developer</mark> and product builder who enjoys turning
          useful ideas into web applications. I care about thoughtful
          interfaces, solid backends, and understanding how things work beneath
          the surface.
        </p>
        <div className="intro-facts">
          <div>
            <span className="fact-icon">
              <MapPin size={13} />
            </span>
            <strong>Kathmandu, Nepal</strong>
            <span>where I’m based</span>
          </div>
          <div>
            <span className="fact-icon">
              <Code2 size={13} />
            </span>
            <strong>Web apps & backend</strong>
            <span>what I build</span>
          </div>
          <div>
            <span className="fact-icon">
              <MoveUpRight size={13} />
            </span>
            <strong>Ideas into products</strong>
            <span>what keeps me curious</span>
          </div>
        </div>
        <div className="intro-actions">
          <EmailButton />
          <ResumeDownload />
        </div>
        <SocialLinks />
      </section>
      <Doomscroll />
      <section id="work" className="home-section" aria-labelledby="work-title">
        <div className="section-header">
          <div>
            <span className="section-eyebrow">PORTFOLIO</span>
            <h2 id="work-title" className="marked-heading">
              Selected Work
            </h2>
          </div>
          <Link href="/projects" className="view-projects-button">
            View all projects <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <div className="project-grid">
          {projects
            .filter((project) => project.featured)
            .slice(0, Math.max(0, Math.floor(selectedWorkCount)))
            .map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
        </div>
      </section>
      <section
        id="about"
        className="home-section"
        aria-labelledby="about-title"
      >
        <div className="section-header">
          <div>
            <span className="section-eyebrow">A LITTLE CONTEXT</span>
            <h2 id="about-title" className="marked-heading">
              The person behind the code
            </h2>
          </div>
        </div>
        <div className="about-text">
          <p>
            I’m Sushan Dahal, a developer and product builder based in
            Kathmandu. I enjoy the space between a product idea and the
            technical work that makes it useful.
          </p>
          <p>
            My experience includes building application features for VIDYA,
            co-building the National SXC Science Fest website, and supporting
            technical events with the Computer Club at St. Xavier’s College.
            I’ve also contributed to websites and community outreach through
            NIAC and ICMB.
          </p>
        </div>
        <div className="principles" aria-label="How I approach building">
          {principles.map((item) => (
            <details className="principle" key={item.number}>
              <summary>
                <span className="principle-number">{item.number}</span>
                <span className="principle-text">
                  <strong>{item.title}</strong>
                  <span>{item.summary}</span>
                </span>
                <span className="expand-symbol" aria-hidden="true" />
              </summary>
              <p>{item.detail}</p>
            </details>
          ))}
        </div>
        <Signature />
      </section>
      <ExperienceTimeline />
      <BehindTheScenes />
      <ContactPanel />
    </main>
  );
}
