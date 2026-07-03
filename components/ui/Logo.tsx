import Image from "next/image";
import Link from "next/link";

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link className={`logo${dark ? " logo-dark" : ""}`} href="/" aria-label="MRI Plan home">
      <Image src="/images/mri-plan-logo-512.png" alt="" width={40} height={40} priority />
      <span>
        MRI <strong>Plan</strong>
      </span>
    </Link>
  );
}
