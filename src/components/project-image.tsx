"use client";
import Image from "next/image";
import { useState } from "react";
import { ProjectIllustration } from "@/components/project-illustration";
import type { Project } from "@/content/projects";
export function ProjectImage({ project }: { project: Pick<Project, "slug" | "image"> }) {
  const [failed, setFailed] = useState(false);
  if (!project.image || failed) return <ProjectIllustration slug={project.slug} />;
  return <div className="project-visual real-visual"><Image src={project.image.src} alt={project.image.alt} width={project.image.width} height={project.image.height} sizes="(max-width: 600px) 90vw, 400px" onError={() => setFailed(true)} /><span className="illustration-label">PROJECT SCREENSHOT</span></div>;
}
