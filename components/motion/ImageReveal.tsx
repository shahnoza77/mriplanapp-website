"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { clipReveal } from "@/lib/motion";

export function ImageReveal({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={clipReveal} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.24 }}>
      {children}
    </motion.div>
  );
}
