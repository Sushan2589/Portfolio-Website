import { site, isPublicLink } from "@/content/site";
import { competitions, stack } from "@/content/experience";
import { projects, type Project } from "@/content/projects";
import { absoluteUrl } from "@/lib/seo";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: site.name,
        url: absoluteUrl("/"),
        jobTitle: "Software developer and product builder",
        description: site.description,
        sameAs: [site.github, site.linkedin].filter(isPublicLink),
        knowsAbout: [...new Set(stack.flatMap(group => group.tools))],
        award: competitions.filter(item => item.result !== "Selected").map(item => `${item.result}, ${item.name} (${item.detail})`),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: `${site.name} — Portfolio`,
        description: site.description,
        inLanguage: "en",
        publisher: { "@id": absoluteUrl("/#person") },
      },
    ],
  };
}

export function profileSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": absoluteUrl("/#profile"),
    url: absoluteUrl("/"),
    name: `${site.name} — Software developer and product builder`,
    description: site.description,
    inLanguage: "en",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: { "@id": absoluteUrl("/#person") },
  };
}

export function projectsSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    url: absoluteUrl("/projects"),
    name: "Projects by Sushan Dahal",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((project, index) => ({
        "@type": "ListItem", position: index + 1, name: project.name,
        url: absoluteUrl(`/work/${project.slug}`),
      })),
    },
  };
}

export function projectSchema(project: Project) {
  const url = absoluteUrl(`/work/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    name: `${project.name} — Case study`,
    description: project.summary,
    inLanguage: "en",
    isPartOf: { "@id": absoluteUrl("/#website") },
    mainEntity: {
      "@type": "CreativeWork", "@id": `${url}#project`,
      name: project.name, description: project.summary, url,
      author: { "@id": absoluteUrl("/#person") },
      keywords: project.technologies.join(", "),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
        { "@type": "ListItem", position: 3, name: project.name, item: url },
      ],
    },
  };
}
