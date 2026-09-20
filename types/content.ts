export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export type Module = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  description: string;
  status: string;
  focus: string[];
  includes: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
  links?: { label: string; href: string }[];
};

export type ContactTopic = {
  value: string;
  label: string;
};
