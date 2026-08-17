import Image from "next/image";

type PhoneVisualProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
};

export function PhoneVisual({ src, alt, priority = false, className = "" }: PhoneVisualProps) {
  return (
    <div className={`phone-visual${className ? ` ${className}` : ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className="phone-visual__image"
        sizes="(max-width: 620px) 68vw, (max-width: 900px) 300px, 340px"
        priority={priority}
      />
    </div>
  );
}
