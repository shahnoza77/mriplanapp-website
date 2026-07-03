import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "MRI Plan's Terms of Service covering educational purpose, clinical responsibility, liability, and intellectual property.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="page-hero">
      <div className="container legal-content">
        <Breadcrumbs current="Terms of Service" />
        <h1>Terms of Service</h1>
        <p className="legal-meta">
          <strong>Last Updated:</strong> July 2026
        </p>

        <p>Welcome to MRI Plan.</p>
        <p>
          MRI Plan is an educational application designed to help MRI students and MRI technologists develop MRI planning
          skills through interactive learning and practice.
        </p>

        <h2>Educational purpose</h2>
        <p>
          MRI Plan is intended solely for educational and training purposes. The application teaches fundamental
          principles of MRI planning and does not replace formal education, clinical training, institutional protocols,
          manufacturer guidelines, or professional clinical judgment.
        </p>

        <h2>Clinical responsibility</h2>
        <p>
          MRI protocols, slice prescriptions, planning techniques, and examination requirements may vary between
          hospitals, imaging centers, MRI vendors, software versions, and individual clinical situations.
        </p>
        <p>
          Users are solely responsible for following the policies, protocols, supervision requirements, and clinical
          standards of their educational institution and workplace.
        </p>
        <p>MRI Plan should never be used as the sole basis for patient care, diagnosis, treatment, or clinical decision-making.</p>

        <h2>Disclaimer of liability</h2>
        <p>
          The developers of MRI Plan are not responsible for any clinical decisions, patient care, examination outcomes,
          or damages arising from the use or misuse of this application.
        </p>

        <h2>Intellectual property</h2>
        <p>
          All content within MRI Plan, including text, graphics, educational materials, images, software, application
          design, logos, and source code, is protected by applicable intellectual property and copyright laws.
        </p>

        <h2>Future updates</h2>
        <p>
          MRI Plan may be updated periodically with new educational content, features, or improvements. These Terms of
          Service may also be revised from time to time.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </section>
  );
}
