"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FaqItem } from "@/types/content";
import { motionConfig } from "@/lib/motion";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div className="accordion-item" key={item.question}>
            <button
              className="accordion-trigger"
              type="button"
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <span className="accordion-icon" aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  className="accordion-panel"
                  id={`faq-panel-${index}`}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: motionConfig.fast, ease: motionConfig.ease }}
                >
                  <p>{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
