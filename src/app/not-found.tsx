import Link from "next/link";
export default function NotFound() {
  return <main id="main" className="page-width not-found"><span className="section-eyebrow">404 / A SMALL DETOUR</span><h1>This page isn’t here.</h1><p>There’s still plenty to explore.</p><Link className="primary-pill" href="/#work">Back to the projects</Link></main>;
}
