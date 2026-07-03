import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Launch Updates",
  description: "Get notified when MRI Plan launches and share early feedback with the project team.",
  alternates: { canonical: "/launch" },
};

export default function LaunchPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs current="Launch Updates" />
          <h1>Be first to know when MRI Plan launches</h1>
          <p>Leave your email and choose Notify me at launch so we can reach you when MRI Plan is available.</p>
        </div>
      </section>
      <section className="section">
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="card">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
