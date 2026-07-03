"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer } from "@/lib/motion";

export function StaggerGroup({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
      {children}
    </motion.div>
  );
}
