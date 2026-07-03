import type { Variants } from "framer-motion";

export const motionConfig = {
  ease: [0.22, 1, 0.36, 1] as const,
  softEase: [0.16, 1, 0.3, 1] as const,
  duration: 0.72,
  fast: 0.28,
  stagger: 0.08,
  spring: {
    type: "spring" as const,
    stiffness: 160,
    damping: 24,
    mass: 0.8,
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionConfig.duration, ease: motionConfig.ease },
  },
};

export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: "inset(14% 12% 14% 12% round 28px)", scale: 1.04 },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0% round 28px)",
    scale: 1,
    transition: { duration: 0.9, ease: motionConfig.softEase },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: motionConfig.stagger,
      delayChildren: 0.08,
    },
  },
};
