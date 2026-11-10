// ─── Portfolio Type Definitions ───

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Stat {
  label: string;
  value: string;
  suffix?: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Skill {
  name: string;
  icon: string;
  category: SkillCategory;
  description: string;
  level?: number;
  tier?: SkillProficiencyTier;
  experience?: string;
  highlights?: string[];
  usageNote?: string;
  isCustom?: boolean;
}

export type SkillCategory =
  | "Frontend"
  | "Languages"
  | "Backend"
  | "Tools"
  | "Practices";

export type SkillProficiencyTier =
  | "Core"
  | "Advanced"
  | "Proficient"
  | "Growing";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  isSample?: boolean;
}

export type ProjectCategory = "Web App" | "Frontend" | "Full Stack" | "All";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface PortfolioConfig {
  name: string;
  tagline: string;
  headline: string;
  introduction: string;
  email: string;
  resumeUrl?: string;
  social: SocialLink[];
  navLinks: NavLink[];
  stats: Stat[];
  timeline: TimelineItem[];
  skills: Skill[];
  projects: Project[];
  aboutParagraphs: string[];
  formServiceUrl?: string;
}
