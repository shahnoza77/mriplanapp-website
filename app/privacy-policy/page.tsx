import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { site } from "@/data/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "MRI Plan's Privacy Policy, including information collection, patient data, third-party services, and contact details.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="page-hero">
      <div className="container legal-content">
        <Breadcrumbs current="Privacy Policy" />
        <h1>Privacy Policy</h1>
        <p className="legal-meta">
          <strong>Last Updated:</strong> July 2026
        </p>

        <h2>Information we may collect</h2>
        <p>MRI Plan may collect or store information necessary to provide and improve the app, including:</p>
        <ul>
          <li>Account information if you choose to create an account</li>
          <li>Application preferences and settings</li>
          <li>Learning progress and completed exercises</li>
          <li>Subscription status managed through the Apple App Store or Google Play</li>
        </ul>

        <h2>Medical and patient information</h2>
        <p>
          MRI Plan is an educational application and does not collect, store, process, or transmit patient information,
          medical records, or Protected Health Information.
        </p>

        <h2>How information is used</h2>
        <p>
          Any information collected is used solely to provide and maintain MRI Plan, improve the user experience, save
          learning progress and preferences, and support app features and future improvements.
        </p>
        <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>

        <h2>Third-party services</h2>
        <p>
          If you purchase MRI Plan, payments are securely processed by the Apple App Store or Google Play. MRI Plan does
          not collect, process, or store payment information.
        </p>

        <h2>Children privacy</h2>
        <p>MRI Plan is not intended for children under the age of 18. We do not knowingly collect personal information from children.</p>

        <h2>Educational use</h2>
        <p>
          MRI Plan is intended solely for educational and training purposes. It is not intended to provide medical advice,
          diagnose medical conditions, or replace professional clinical judgment.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </section>
  );
}
