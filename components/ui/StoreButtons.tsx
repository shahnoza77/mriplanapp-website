import Image from "next/image";

export function StoreButtons() {
  return (
    <>
      <a
        className="hero-app-store"
        href="https://apps.apple.com/app/id6787633208"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download MRI Plan on the App Store"
      >
        <Image
          src="/images/download-on-the-app-store.svg"
          alt="Download on the App Store"
          width={144}
          height={48}
        />
      </a>
      <button className="hero-google-play" type="button" disabled aria-disabled="true">
        <svg width="24" height="26" viewBox="0 0 24 26" fill="currentColor" aria-hidden="true">
          <path d="M2 1.5v23L22 13 2 1.5Z" />
        </svg>
        <span>Google Play — Coming Soon</span>
      </button>
    </>
  );
}
