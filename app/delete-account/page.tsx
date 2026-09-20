import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { site } from "@/data/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata(
  "/delete-account",
  "Delete Your MRI Plan Account",
  "Learn how to delete your MRI Plan account in the app or request deletion by email, which data is deleted, and how subscriptions are handled.",
);

export default function DeleteAccountPage() {
  return (
    <section className="page-hero">
      <div className="container legal-content account-deletion-content">
        <Breadcrumbs path="/delete-account" current="Delete Account" />
        <h1>Delete Your MRI Plan Account</h1>
        <p>MRI Plan users can permanently delete their account and associated app data at any time.</p>

        <h2>Delete your account in the app</h2>
        <ol>
          <li>Open MRI Plan and sign in.</li>
          <li>Go to Profile.</li>
          <li>Open Account Settings.</li>
          <li>Select Delete Account.</li>
          <li>Follow the confirmation steps.</li>
        </ol>
        <p>Deleting the MRI Plan app from your device does not delete your account.</p>

        <h2>Request deletion by email</h2>
        <p>
          If you cannot access the app, email <a href={`mailto:${site.email}`}>{site.email}</a> from the email
          address associated with your MRI Plan account.
        </p>
        <p>Use the subject line: “Delete My MRI Plan Account.”</p>
        <p>We may ask you to verify that you own the account. Never send your password.</p>

        <h2>Data deleted with your account</h2>
        <p>
          When account deletion is completed, MRI Plan deletes the following account information and app data
          associated with that account:
        </p>
        <ul>
          <li>Account and profile information</li>
          <li>Saved learning progress and completed exercises</li>
          <li>App preferences and settings associated with the account</li>
          <li>Registered device records</li>
          <li>Stored profile images, feedback attachments, and user exports associated with the account</li>
        </ul>
        <p>Device-wide settings are preserved.</p>

        <h2>Information that may remain</h2>
        <p>
          Subscription and transaction records are processed by the Apple App Store or Google Play and may be
          retained by those services according to their policies.
        </p>
        <p>
          <strong>Deleting an MRI Plan account does not automatically cancel an active subscription.</strong>{" "}
          Users must manage or cancel their subscription separately through the Apple App Store or Google Play.
        </p>
        <p>
          Feedback text may remain after its account ID, email address, and screenshot link are removed.
          Audit records may also remain with their account reference removed.
        </p>
        <p>
          MRI Plan retains a record of account deletion and may retain protected identity verification records
          to verify ownership when restoring subscription access. Related subscription customer records may
          remain with RevenueCat, the subscription service used by MRI Plan, for this purpose.
        </p>

        <h2>Medical information</h2>
        <p>
          MRI Plan is an educational simulator. It does not collect, store, or process patient records,
          medical records, or Protected Health Information.
        </p>

        <h2>Need help?</h2>
        <p>Contact <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      </div>
    </section>
  );
}
