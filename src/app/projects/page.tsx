import { NavigationLink as Link } from "@/components/navigation-link";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/project-card";
import { ContactPanel } from "@/components/contact-panel";
import { projects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { StructuredData } from "@/components/structured-data";
import { projectsSchema } from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Projects",
  description: "Web applications, experiments, and useful ideas built by Sushan Dahal.",
  path: "/projects",
});

export default function Projects() {
  return (
    <main id="main" className="page-width projects-page">
      <StructuredData data={projectsSchema()} />
      <Link href="/" className="back-link"><ArrowLeft size={12} /> Back home</Link>
      <header className="projects-heading">
        <span className="section-eyebrow">IDEAS INTO PRODUCTS</span>
        <h1 className="marked-heading">All projects</h1>
        <p>A collection of web applications, experiments, and useful problems I’ve been working on.</p>
        <span className="projects-count">{String(projects.length).padStart(2, "0")} projects & counting</span>
      </header>
      <section className="project-grid" aria-label="All projects">
        {projects.map(project => <ProjectCard key={project.slug} project={project} />)}
      </section>
      <ContactPanel />
    </main>
  );
}
