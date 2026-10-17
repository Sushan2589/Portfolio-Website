import { NavigationLink as Link } from "@/components/navigation-link";
import { NotFoundRedirect } from "@/components/not-found-redirect";

export default function NotFound() {
  return (
    <main id="main" className="page-width not-found">
      <span className="section-eyebrow">404 / LET’S GET YOU HOME</span>
      <h1>Looks like this page took a wrong turn.</h1>
      <p>The page you’re looking for doesn’t exist. My work is still right where you left it.</p>
      <NotFoundRedirect />
      <Link className="primary-pill" href="/" replace>Back home</Link>
    </main>
  );
}
