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
      <a
        className="hero-google-play"
        href="https://play.google.com/store/apps/details?id=com.mriplanapp.mriplan"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get MRI Plan on Google Play"
      >
        <Image
          src="/images/get-it-on-google-play.png"
          alt="Get it on Google Play"
          width={186}
          height={72}
        />
      </a>
    </>
  );
}
