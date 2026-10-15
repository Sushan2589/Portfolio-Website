import Link from "next/link";
import { ArrowUpRight, Code2, Github, Globe } from "lucide-react";
import { ProjectMedia } from "@/components/project-media";
import { isPublicLink } from "@/content/site";
import type { Project } from "@/content/projects";
export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card"><Link href={`/work/${project.slug}`} className="project-cover" aria-label={`Read ${project.name} case study`}><ProjectMedia project={project} /></Link><div className="project-card-body"><div className="project-title-row"><h3><Link href={`/work/${project.slug}`}>{project.name}</Link></h3><ArrowUpRight size={14} /></div><span className="project-status">{project.status}</span><p>{project.summary}</p><div className="project-tags">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div><div className="project-actions"><Link className="small-button" href={`/work/${project.slug}`}><Code2 size={11} /> Read case study</Link>{isPublicLink(project.demo) && <a className="small-button" href={project.demo} target="_blank" rel="noopener noreferrer"><Globe size={11} aria-hidden="true" /> Live demo</a>}{isPublicLink(project.repo) && <a className="small-button secondary" href={project.repo} target="_blank" rel="noopener noreferrer"><Github size={11} aria-hidden="true" /> Source</a>}</div></div></article>;
}
