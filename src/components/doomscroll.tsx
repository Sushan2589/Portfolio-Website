"use client";

import { useEffect, useRef, useState } from "react";
import { NavigationLink as Link } from "@/components/navigation-link";
import { ArrowDown, ArrowDownLeft, ArrowRight, ArrowUp, ArrowUpRight, Braces, MapPin, Pause, Play, RotateCcw, Sparkles, X } from "lucide-react";
import { projects } from "@/content/projects";
import { reelStories } from "@/content/reels";
import { site, isPublicLink } from "@/content/site";
import { ProjectMedia } from "@/components/project-media";
import styles from "./doomscroll.module.css";

export function Doomscroll() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const feed = useRef<HTMLDivElement>(null);
  const reelProjects = projects.filter(project => reelStories[project.slug]);
  const titles = ["Meet Sushan", ...reelProjects.map(project => project.name), "How I think", "Your next move"];
  const total = titles.length;

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function goTo(index: number) {
    const container = feed.current;
    if (!container) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "paused" || paused;
    const target = container.children[Math.max(0, Math.min(index, total - 1))] as HTMLElement;
    container.scrollTo({ top: target.offsetTop, behavior: reduceMotion ? "instant" : "smooth" });
  }

  function visitSection(id: string) {
    // Restore dialog focus before scrolling to the requested section.
    dialog.current?.close();
    setOpen(false);
    document.getElementById(id)?.scrollIntoView();
  }

  return <>
    <button className={styles.launcher} onClick={() => { setActive(0); setOpen(true); }} aria-haspopup="dialog">
      <span className={styles.preview} aria-hidden="true"><span>sd.</span><Play size={10} fill="currentColor" /></span>
      <span className={styles.launchCopy}><span className={styles.launchEyebrow}>A DIFFERENT WAY TO MEET ME</span><strong>Doomscroll my portfolio <Sparkles size={14} /></strong><span>Little stories. A few projects. One more scroll.</span></span>
      <span className={styles.launchArrow}><ArrowUpRight size={19} /></span>
    </button>
    <noscript><p>Explore the project stories in <Link href="/projects">all projects</Link>.</p></noscript>
    <dialog ref={dialog} className={styles.dialog} aria-label="Doomscroll my portfolio" onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={event => { if (event.target === dialog.current) setOpen(false); }} onKeyDown={event => {
      if (event.key === "ArrowDown" || event.key === "PageDown") { event.preventDefault(); goTo(active + 1); }
      if (event.key === "ArrowUp" || event.key === "PageUp") { event.preventDefault(); goTo(active - 1); }
      if (event.key === "Home") { event.preventDefault(); goTo(0); }
      if (event.key === "End") { event.preventDefault(); goTo(total - 1); }
    }}>
      {open && <div className={styles.viewer} data-paused={paused}>
        <header className={styles.viewerHeader}>
          <div className={styles.progress} aria-label="Portfolio stories">{titles.map((title, index) => <button key={title} aria-label={`Go to ${title}`} aria-current={active === index ? "step" : undefined} data-seen={index <= active} onClick={() => goTo(index)} />)}</div>
          <div className={styles.viewerToolbar}><span className={styles.identity}><span>sd.</span> Sushan, in a few scrolls</span><div><button aria-label={paused ? "Play story animations" : "Pause story animations"} aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? <Play size={16} /> : <Pause size={16} />}</button><button aria-label="Close portfolio stories" onClick={() => setOpen(false)}><X size={19} /></button></div></div>
        </header>
        <div ref={feed} className={styles.feed} aria-label="Vertical portfolio feed" onScroll={event => {
          const container = event.currentTarget;
          const midpoint = container.scrollTop + container.clientHeight / 2;
          const index = Array.from(container.children).findIndex(child => {
            const article = child as HTMLElement;
            return article.offsetTop + article.offsetHeight > midpoint;
          });
          setActive(index === -1 ? total - 1 : index);
        }}>
          <article className={`${styles.reel} ${styles.intro}`} data-active={active === 0} inert={active !== 0} aria-label="Meet Sushan">
            <span className={styles.eyebrow}>01 / THE PERSON BEHIND THE PIXELS</span>
            <h2>Oh, you&apos;re<br />a <em>scroller.</em></h2>
            <p>Same curiosity. Different format.<br />Here&apos;s a little of what I build, and why.</p>
            <div className={styles.introArt} aria-hidden="true"><div className={styles.orbit} /><span className={styles.monogram}>sd<span>.</span></span><span className={`${styles.floatTag} ${styles.tagOne}`}><Braces size={14} /> thoughtful interfaces</span><span className={`${styles.floatTag} ${styles.tagTwo}`}>solid backends <ArrowUpRight size={14} /></span><span className={styles.artNote}>ideas → things you can use</span></div>
            <div className={styles.introFooter}><span><MapPin size={13} /> Kathmandu, Nepal</span><strong>Hey, I&apos;m Sushan.</strong><p>Software developer. Product builder.<br />Always asking how things work.</p></div>
            <button className={styles.scrollHint} onClick={() => goTo(1)}>Scroll to get to know me <ArrowDown size={15} /></button>
          </article>
          {reelProjects.map((project, index) => {
            const story = reelStories[project.slug];
            return <article key={project.slug} className={`${styles.reel} ${styles.project}`} data-active={active === index + 1} data-project={project.slug} inert={active !== index + 1} aria-label={project.name}>
              <span className={styles.eyebrow}>{String(index + 2).padStart(2, "0")} / {project.category}</span>
              <h2>{story.hook}</h2>
              <div className={styles.projectArt}><ProjectMedia project={project} /><span className={styles.artCorner} aria-hidden="true"><ArrowDownLeft size={23} /> a little look inside</span></div>
              <div className={styles.projectCaption}><h3>{project.name}</h3><p>{story.takeaway}</p><div className={styles.tags}>{project.technologies.map(technology => <span key={technology}>{technology}</span>)}</div></div>
              <p className={styles.note}>{story.note}</p>
              <Link className={styles.storyLink} href={`/work/${project.slug}`}>The story behind the build <ArrowUpRight size={16} /></Link>
            </article>;
          })}
          <article className={`${styles.reel} ${styles.thinking}`} data-active={active === total - 2} inert={active !== total - 2} aria-label="How I think">
            <span className={styles.eyebrow}>{String(total - 1).padStart(2, "0")} / THE THREAD BETWEEN THE PROJECTS</span>
            <h2>Before the code,<br />there&apos;s a <em>why.</em></h2>
            <p>I like the space between a useful idea and the technical work that makes it real.</p>
            <div className={styles.thoughts}>{[{ title: "Find the useful problem.", detail: "What is someone actually trying to do?" }, { title: "Understand the underneath.", detail: "The interface, the API, the boundaries." }, { title: "Make. Learn. Make it better.", detail: "Small experiments. Better questions." }].map((thought, index) => <div key={thought.title}><span>0{index + 1}</span><div><h3>{thought.title}</h3><p>{thought.detail}</p></div></div>)}</div>
            <span className={styles.handwritten}>Still curious. Still building. <Sparkles size={21} /></span>
            <button className={styles.storyLink} onClick={() => visitSection("about")}>A little more about me <ArrowUpRight size={16} /></button>
          </article>
          <article className={`${styles.reel} ${styles.outro}`} data-active={active === total - 1} inert={active !== total - 1} aria-label="Your next move">
            <span className={styles.eyebrow}>{String(total).padStart(2, "0")} / YOU MADE IT</span>
            <Sparkles className={styles.endArt} size={94} strokeWidth={.8} aria-hidden="true" />
            <h2>A good scroll.<br />A better<br /><em>conversation?</em></h2>
            <p>If something sparked an idea, I&apos;d like to hear it.</p>
            <button className={styles.endButton} onClick={() => visitSection("contact")}>Let&apos;s connect <ArrowUpRight size={17} /></button>
            {isPublicLink(site.github) && <a className={styles.githubLink} href={site.github} target="_blank" rel="noreferrer">Or see what I&apos;m building on GitHub <ArrowUpRight size={13} /></a>}
            <button className={styles.replay} onClick={() => goTo(0)}><RotateCcw size={13} /> One more scroll?</button>
          </article>
        </div>
        <footer className={styles.viewerFooter}><span aria-live="polite" aria-atomic="true">{String(active + 1).padStart(2, "0")} <span>/ {String(total).padStart(2, "0")} · {titles[active]}</span></span><div><button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous story"><ArrowUp size={17} /></button><button onClick={() => goTo(active + 1)} disabled={active === total - 1} aria-label="Next story"><ArrowDown size={17} /></button></div></footer>
        <span className={styles.desktopHint}>SCROLL A LITTLE. STAY A WHILE. <ArrowRight size={12} /></span>
      </div>}
    </dialog>
  </>;
}
