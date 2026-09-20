"use client";

import Link from "next/link";
import { type ReactNode, useState } from "react";
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
              <p>{renderAnswer(item)}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

function renderAnswer(item: FaqItem): ReactNode[] {
  let parts: ReactNode[] = [item.answer];
  for (const link of item.links ?? []) {
    parts = parts.flatMap<ReactNode>((part, partIndex) =>
      typeof part === "string"
        ? part.split(link.label).flatMap((text, index) =>
            index === 0
              ? [text]
              : [<Link key={`${link.href}-${partIndex}-${index}`} href={link.href}>{link.label}</Link>, text],
          )
        : [part],
    );
  }
  return parts;
}
