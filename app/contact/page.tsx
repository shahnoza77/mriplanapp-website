import type { Metadata } from "next";
import { ContactForm } from "@/components/ui/ContactForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { site } from "@/data/content";
import { Reveal } from "@/components/motion/Reveal";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact MRI Plan with questions, feedback, support requests, or launch notification interest.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Breadcrumbs current="Contact" />
          <Reveal>
            <h1>Get in touch</h1>
            <p>Questions about MRI Plan, feedback on the concept, or want to be first in line when it launches? Send a message.</p>
          </Reveal>
        </div>
      </section>
      <section className="section">
        <div className="container split-layout">
          <Reveal className="card">
            <h2>Send a message</h2>
            <ContactForm />
          </Reveal>
          <StaggerGroup className="insight-list">
            <article>
              <h3>Email</h3>
              <p>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>
            </article>
            <article>
              <h3>Response time</h3>
              <p>MRI Plan is currently a small, early-stage project. Expect a personal reply, typically within a few business days.</p>
            </article>
            <article>
              <h3>Form integration</h3>
              <p>Online form delivery is prepared through NEXT_PUBLIC_CONTACT_FORM_ENDPOINT. Until connected, visitors are directed to email.</p>
            </article>
          </StaggerGroup>
        </div>
      </section>
    </>
  );
}
