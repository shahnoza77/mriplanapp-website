import Image from "next/image";
import Link from "next/link";
import styles from "./LearningWithoutBorders.module.css";

export function LearningWithoutBorders() {
  return (
    <section className="section" aria-labelledby="learning-without-borders">
      <div className="container">
        <div className={styles.banner}>
          <div className={styles.illustration}>
            <Image
              src="/images/learning-without-borders.png"
              alt="Five international MRI students in blue scrubs holding tablets and notebooks in front of a connected globe."
              width={1254}
              height={1254}
              sizes="(max-width: 760px) 90vw, (max-width: 1180px) 42vw, 480px"
            />
          </div>
          <div className={styles.content}>
            <p className={styles.label}><span aria-hidden="true">🌐</span> MRI Plan</p>
            <h2 id="learning-without-borders">
              Learning <span>Without Borders</span>
            </h2>
            <p className={styles.description}>
              We believe every future MRI technologist deserves access to quality education, regardless of where they live.
            </p>
            <div className={styles.discount}>
              <h3>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                  <path d="m2 8 10-5 10 5-10 5L2 8Zm4 2v7c4 3 8 3 12 0v-7M22 8v8" strokeLinejoin="round" strokeLinecap="round" />
                </svg>
                International Student Discounts
              </h3>
              <p>
                If the regular subscription price is difficult for you to afford, please contact us. We&apos;d love to help make MRI planning education more accessible.
              </p>
            </div>
            <Link href="/contact" className={styles.contact}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="3" />
                <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Contact Us for Available Discounts <span aria-hidden="true">→</span></span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
