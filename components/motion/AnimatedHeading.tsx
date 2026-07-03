"use client";

import { motion, useReducedMotion } from "framer-motion";
import { motionConfig } from "@/lib/motion";

export function AnimatedHeading({
  children,
  as = "h2",
  className,
}: {
  children: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const Tag = motion[as];
  const words = children.split(" ");

  if (reduceMotion) {
    const StaticTag = as;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <Tag className={className} aria-label={children}>
      {words.map((word, index) => (
        <span className="word-mask" aria-hidden="true" key={`${word}-${index}`}>
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.78, ease: motionConfig.softEase, delay: 0.12 + index * 0.045 }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </Tag>
  );
}
