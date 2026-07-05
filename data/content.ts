import type { ContactTopic, FaqItem, Module, NavItem } from "@/types/content";

export const site = {
  name: "MRI Plan",
  url: "https://mriplanapp.com",
  email: "contact@mriplanapp.com",
  description:
    "An interactive MRI slice-planning simulator built to help students and new technologists practice with confidence before scanning real patients.",
  shortDescription: "Interactive MRI slice-planning simulator for MRI students and technologists.",
  copyrightYear: 2026,
};

export const navigation: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Features",
    href: "/features",
    description: "Slice planning, anatomy references, instant feedback, and education-first modules.",
  },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const modules: Module[] = [
  {
    slug: "brain-planning",
    title: "Brain Planning",
    eyebrow: "Core module",
    status: "In development",
    summary: "Practice foundational brain slice positioning with repeatable, feedback-led planning exercises.",
    description:
      "Brain planning is being built as one of MRI Plan's first modules because it teaches the spatial decisions students repeatedly meet at the console: plane selection, center position, angulation, and coverage.",
    focus: ["Axial, sagittal, and coronal planning views", "Angle and center-position judgment", "Coverage and field-of-view decisions"],
    includes: ["Interactive prescription controls", "Anatomy-based reference views", "Immediate feedback on planning choices"],
  },
  {
    slug: "spine-planning",
    title: "Spine Planning",
    eyebrow: "Core module",
    status: "In development",
    summary: "Build confidence with spine planning decisions before working under clinical time pressure.",
    description:
      "The spine module is planned for students and early-career technologists who need more low-stakes repetition with slice angulation and coverage across common spine scenarios.",
    focus: ["Plane alignment", "Coverage consistency", "Low-pressure repetition"],
    includes: ["Guided planning scenarios", "Slice positioning practice", "Clear adjustment feedback"],
  },
  {
    slug: "msk-planning",
    title: "MSK Planning",
    eyebrow: "Core module",
    status: "In development",
    summary: "Practice musculoskeletal planning fundamentals with anatomy-led reference views.",
    description:
      "MSK planning is part of the first development group so learners can practice body-region planning beyond brain and spine workflows while staying inside an educational, privacy-first simulator.",
    focus: ["Musculoskeletal positioning", "Field-of-view decisions", "Repeatable learning sessions"],
    includes: ["Education-first anatomy references", "Touch-friendly slice controls", "Feedback for planning refinement"],
  },
];

export const features = [
  {
    title: "Interactive slice planning",
    text: "Position and angle slices across axial, sagittal, and coronal views with direct manipulation controls that mirror the mental model used at the console.",
  },
  {
    title: "Realistic anatomy references",
    text: "Practice with anatomy-based views created for education rather than real patient imaging.",
  },
  {
    title: "Instant feedback",
    text: "Interactive planning hints and notes. Review angle, coverage, center position, and field-of-view guidance immediately after planning.",
  },
  {
    title: "Built for learning",
    text: "Designed for MRI students, new technologists, and training programs as a supplement to formal instruction.",
  },
  {
    title: "Unlimited repetition",
    text: "Repeat planning decisions without scan-room pressure, patient time, or the stress of getting it perfect on the first try.",
  },
  {
    title: "Privacy-first by design",
    text: "MRI Plan does not collect, store, process, or transmit patient information or Protected Health Information.",
  },
];

export const processSteps = [
  {
    title: "Choose an exam",
    text: "Open "How to Use a Planner" (?) and follow the step-by-step planning instructions provided throughout the exam/protocol.",
  },
  {
    title: "Plan the slices",
    text: "Set position, angle, center, and coverage using touch-friendly planning controls.",
  },
  {
    title: "Review feedback",
    text: "Compare your prescription against the target planning decisions and adjust with purpose.",
  },
  {
    title: "Repeat with confidence",
    text: "Run the scenario again until the spatial relationships start to feel natural.",
  },
];

export const trustMetrics = [
  { value: "17", label: "Core planning modules in development" },
  { value: "0", label: "Patient records or PHI collected" },
  { value: "iOS", label: "First platform in development" },
  { value: "7", label: "Languages supported" },
];

export const faqItems: FaqItem[] = [
  {
    question: "Who is MRI Plan for?",
    answer:
      "MRI Plan is designed for MRI students, new technologists, and training programs who want to practice slice-planning fundamentals outside the scan room.",
  },
  {
    question: "Does MRI Plan replace clinical training?",
    answer:
      "No. MRI Plan is an educational supplement. It does not replace formal coursework, clinical supervision, institutional protocols, manufacturer guidelines, or professional clinical judgment.",
  },
  {
    question: "Is any real patient data used in the app?",
    answer:
      "No. MRI Plan does not collect, store, process, or transmit patient information or Protected Health Information. The simulator is intended for education, not clinical use.",
  },
  {
    question: "What planning modules are included?",
    answer:
      "Development is starting with brain planning, spine planning, and MSK planning. Additional modules may be added after launch based on feedback from students and instructors.",
  },
  {
    question: "When will MRI Plan be available?",
    answer:
      "MRI Plan is currently in development and not yet available on the App Store. You can leave your email through the contact page to be notified when it launches.",
  },
  {
    question: "Which platforms will MRI Plan support?",
    answer:
      "MRI Plan is being built for iOS first, with Android support planned. Exact platform availability at launch will be confirmed closer to release.",
  },
  {
    question: "Will MRI Plan be free?",
    answer:
      "Pricing has not been finalized yet. Details on free access, one-time pricing, or a subscription model will be announced ahead of launch.",
  },
  {
    question: "Who built MRI Plan?",
    answer:
      "MRI Plan is created by a practicing MRI technologist to give students and new technologists a realistic way to practice planning decisions before working with real patients.",
  },
  {
    question: "How do I get support or report a problem?",
    answer: "Reach out any time at contact@mriplanapp.com or through the contact page.",
  },
];

export const contactTopics: ContactTopic[] = [
  { value: "launch-notify", label: "Notify me at launch" },
  { value: "general-question", label: "General question" },
  { value: "feedback", label: "Feedback or suggestion" },
  { value: "press", label: "Press or partnership" },
  { value: "support", label: "Support or bug report" },
];
