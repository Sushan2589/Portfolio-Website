import type { CSSProperties } from "react";
import { appearance } from "@/content/appearance";
const technologies = [
  { label: "HTML", symbol: "</>", side: "left", top: "24%", tilt: "-12deg", delay: "-2s" },
  { label: "CSS", symbol: "{ }", side: "right", top: "37%", tilt: "10deg", delay: "-7s" },
  { label: "JavaScript", symbol: "JS", side: "left", top: "51%", tilt: "-7deg", delay: "-4s" },
  { label: "React", symbol: "\u269b", side: "right", top: "65%", tilt: "12deg", delay: "-10s" },
  { label: "CSS", symbol: "{ }", side: "left", top: "80%", tilt: "8deg", delay: "-12s" },
  { label: "HTML", symbol: "</>", side: "right", top: "91%", tilt: "-9deg", delay: "-6s" },
];
const drops = [36, 109, 187, 258, 341, 420, 508, 581, 662, 744, 821, 904, 982, 1061, 1138, 1218, 1301, 1380];
export function Atmosphere() {
  const speed = Number.isFinite(appearance.rainSpeed) && appearance.rainSpeed > 0 ? appearance.rainSpeed : 1;
  const style = { "--rain-duration": `${7 / speed}s`, "--rain-back-duration": `${10 / speed}s`, "--rain-back-delay": `${-4 / speed}s` } as CSSProperties;
  return <div className="site-atmosphere" aria-hidden="true" style={style}>
    <div className="atmosphere-grid" />
    {technologies.map((tech, index) => <div key={index} className={`floating-tech floating-tech-${tech.side} decorative-motion`} style={{ top: tech.top, "--tech-tilt": tech.tilt, animationDelay: tech.delay } as CSSProperties}><span className="floating-tech-symbol">{tech.symbol}</span><span>{tech.label}</span></div>)}
    <svg className="rain-field" viewBox="0 0 1440 330" preserveAspectRatio="xMidYMin slice">
      <defs><linearGradient id="atmosphere-rain-tail" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="var(--weather-ink)" stopOpacity="0" /><stop offset=".35" stopColor="var(--weather-ink)" stopOpacity=".45" /><stop offset="1" stopColor="var(--weather-ink)" /></linearGradient></defs>
      <g className="rain-layer decorative-motion">{drops.map((x, i) => {
        const y = (i * 53) % 250 - 80;
        return <g key={x}><path className="rain-streak" d={`M${x} ${y}l23 33`} />{(i === 2 || i === 14) && <path className="rain-spark" d={`M${x + 23} ${y + 29}l1 3 3 1-3 1-1 3-1-3-3-1 3-1Z`} />}</g>;
      })}</g>
      <g className="rain-layer rain-layer-back decorative-motion">{drops.filter((_, i) => i % 2 === 0).map((x, i) => <path key={x} className="rain-streak" d={`M${x + 48} ${(i * 77) % 260 - 60}l17 24`} />)}</g>
    </svg>
    <svg className="weather-cloud cloud-left decorative-motion" viewBox="0 0 200 110"><path d="M17 88C5 74 13 52 31 48C24 14 75 2 91 31C115 14 145 34 143 54C177 40 204 62 183 88Z" /></svg>
    <svg className="weather-cloud cloud-right decorative-motion" viewBox="0 0 200 110"><path d="M17 88C5 74 13 52 31 48C24 14 75 2 91 31C115 14 145 34 143 54C177 40 204 62 183 88Z" /></svg>
    <svg className="weather-sun" viewBox="0 0 100 100"><circle cx="50" cy="50" r="15" /><g>{Array.from({ length: 8 }, (_, i) => <path key={i} d="M50 19v-7" transform={`rotate(${i * 45} 50 50)`} />)}</g></svg>
    <svg className="margin-plane decorative-motion" viewBox="0 0 130 110"><path d="m21 49 83-29-28 74-19-26Z" /><path d="m57 68 47-48-61 38m14 10-1 18 14-9" /><path className="plane-trail" d="M36 94c-27 14-33-19-10-22" /></svg>
  </div>;
}
