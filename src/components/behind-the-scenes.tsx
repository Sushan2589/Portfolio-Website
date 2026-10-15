import { ArrowUpRight, Code2 } from "lucide-react";
import { stack } from "@/content/experience";
import { GitHubActivity } from "@/components/github-activity";
export function BehindTheScenes() {
  return <section className="home-section behind-section" aria-labelledby="behind-title"><div className="section-header"><div><span className="section-eyebrow">A LOOK UNDER THE SURFACE</span><h2 id="behind-title" className="marked-heading">Behind the Scenes</h2></div><Code2 size={16} className="section-icon" /></div><div className="stack-row"><span className="stack-label">Stack</span><div className="stack-groups">{stack.map(group => <div key={group.label}><span className="stack-group-label">{group.label}</span><div className="stack-tags">{group.tools.map(tool => <span key={tool}>{tool}</span>)}</div></div>)}</div></div><div className="exploring-row"><span className="stack-label">Exploring</span><div>{["SaaS", "Marketplaces", "Useful tools", "Technology in Nepal"].map(interest => <span className="interest-chip" key={interest}>{interest}</span>)}<span className="exploring-note">Useful ideas, waiting to be built.<ArrowUpRight size={11} /></span></div></div><GitHubActivity /></section>;
}
