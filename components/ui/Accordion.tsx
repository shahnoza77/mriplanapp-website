"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
            <motion.div
              className="accordion-panel"
              id={`faq-panel-${index}`}
              initial={false}
              animate={{
                height: isOpen ? "auto" : 0,
                opacity: isOpen ? 1 : 0,
                paddingBottom: isOpen ? "1.25rem" : 0,
                visibility: "visible",
                transitionEnd: { visibility: isOpen ? "visible" : "hidden" },
              }}
              transition={{ duration: reduceMotion ? 0 : motionConfig.fast, ease: motionConfig.ease }}
            >
              <p>{item.answer}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
