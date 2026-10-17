import { BriefcaseBusiness, ChevronDown, GraduationCap, Trophy } from "lucide-react";
import { competitions, education, experience, experiencePreviewCount, type Experience } from "@/content/experience";

function ExperienceEntry({ entry }: { entry: Experience }) {
  const overview = <>
    <span className="timeline-point" aria-hidden="true" />
    <span className="experience-period">{entry.period ?? entry.location}</span>
    <div>
      <h3>{entry.organization}</h3>
      <span className="experience-role">{entry.role}</span>
      <p>{entry.summary}</p>
    </div>
  </>;
  return entry.details?.length ? <details className="experience-entry">
    <summary className="experience-summary">{overview}</summary>
    <ul className="experience-details">{entry.details.map((detail, index) => <li key={`${detail}-${index}`}>{detail}</li>)}</ul>
  </details> : <article className="experience-entry"><div className="experience-summary">{overview}</div></article>;
}

export function ExperienceTimeline() {
  const count = Math.max(1, Math.floor(experiencePreviewCount));
  const recent = experience.slice(0, count);
  const earlier = experience.slice(count);
  return <section className="home-section experience-section" id="experience" aria-labelledby="experience-title">
    <div className="section-header"><div><span className="section-eyebrow">THE JOURNEY</span><h2 className="marked-heading" id="experience-title">Experience</h2></div><BriefcaseBusiness size={15} className="section-icon" /></div>
    <div className="experience-timeline" data-motion-scene="timeline">
      <span className="timeline-line" aria-hidden="true" />
      {recent.length ? recent.map((entry, index) => <ExperienceEntry entry={entry} key={`recent-${index}`} />) : <div className="experience-entry experience-pending"><span className="timeline-point" aria-hidden="true" /><span className="experience-period">A story in progress</span><div><h3>More of the journey, soon.</h3><p>Experience details are being added here.</p></div></div>}
      {earlier.length > 0 && <details className="earlier-experience">
        <summary><span className="archive-closed-label">Show earlier experience <span className="archive-count">{earlier.length}</span></span><span className="archive-open-label">Hide earlier experience</span><ChevronDown size={13} aria-hidden="true" /></summary>
        <div className="experience-archive">{earlier.map((entry, index) => <ExperienceEntry entry={entry} key={`earlier-${index}`} />)}</div>
      </details>}
    </div>
    <div className="journey-extras">
      <section className="journey-panel" aria-labelledby="competitions-title">
        <h3 id="competitions-title"><Trophy size={15} aria-hidden="true" /> Hackathons & competitions</h3>
        <ul className="competition-list">{competitions.map(competition => <li key={competition.name}>
          <span className="competition-result">{competition.result}</span>
          <strong>{competition.name}</strong>
          <span>{competition.detail}</span>
        </li>)}</ul>
      </section>
      <section className="journey-panel" aria-labelledby="education-title">
        <h3 id="education-title"><GraduationCap size={16} aria-hidden="true" /> Education</h3>
        <ul className="education-list">{education.map(entry => <li key={entry.institution}>
          <strong>{entry.institution}</strong>
          <span>{entry.qualification}{entry.period ? ` · ${entry.period}` : ""}</span>
          <span>{entry.location}</span>
        </li>)}</ul>
      </section>
    </div>
  </section>;
}
