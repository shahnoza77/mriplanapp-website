import Link from "next/link";
import { modules, navigation, site } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cta glass">
          <div>
            <span className="eyebrow">Launch updates</span>
            <h2>Be first to know when MRI Plan is available.</h2>
            <p>Leave a note and we will notify you when the app is ready for students, instructors, and early supporters.</p>
          </div>
          <Button href="/launch">Get Notified</Button>
        </div>

        <div className="footer-grid">
          <div>
            <Logo dark />
            <p>{site.description}</p>
          </div>
          <div>
            <h3>Navigate</h3>
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Modules</h3>
            <ul>
              {modules.map((module) => (
                <li key={module.slug}>
                  <Link href={`/modules/${module.slug}`}>{module.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {site.copyrightYear} MRI Plan. All rights reserved.</p>
          <p>Educational simulator only. Not for clinical decision-making.</p>
        </div>
      </div>
    </footer>
  );
}
