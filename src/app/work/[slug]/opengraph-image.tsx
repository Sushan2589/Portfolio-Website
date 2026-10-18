import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";

export const alt = "A project case study by Sushan Dahal, software developer and product builder.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();

  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", background: "#fff", color: "#191919", padding: "65px 80px", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "#68686d" }}><span>Sushan Dahal / Selected work</span><span>sd.</span></div>
      <span style={{ fontSize: 17, letterSpacing: 3, marginTop: 65, color: "#68686d" }}>{project.category}</span>
      <span style={{ fontSize: 78, fontWeight: 700, letterSpacing: -3, marginTop: 18 }}>{project.name}</span>
      <span style={{ fontSize: 25, lineHeight: 1.5, marginTop: 22, color: "#68686d" }}>{project.summary}</span>
      <div style={{ display: "flex", gap: 15, marginTop: "auto", fontSize: 20 }}>
        {project.technologies.map(technology => <span key={technology} style={{ background: "#ffe599", padding: "5px 10px" }}>{technology}</span>)}
      </div>
    </div>, size,
  );
}
