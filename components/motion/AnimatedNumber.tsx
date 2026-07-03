"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({ value }: { value: string }) {
  const numeric = Number.parseInt(value, 10);
  const isNumber = Number.isFinite(numeric) && String(numeric) === value;
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isNumber || reduceMotion || !inView) return;
    let frame = 0;
    const total = 28;
    const tick = () => {
      frame += 1;
      setCount(Math.round((numeric * frame) / total));
      if (frame < total) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, isNumber, numeric, reduceMotion]);

  if (!isNumber || reduceMotion) return <span ref={ref}>{value}</span>;

  return (
    <motion.span ref={ref} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : { opacity: 0 }}>
      {count}
    </motion.span>
  );
}
