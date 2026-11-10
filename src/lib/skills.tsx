import type { ReactNode } from "react";
import {
  Code2,
  Palette,
  FileCode2,
  Atom,
  ShieldCheck,
  Wind,
  GitBranch,
  Smartphone,
  Eye,
  Zap,
  Database,
  Server,
  Terminal,
  Layers,
  Cpu,
  Globe,
} from "lucide-react";
import type { Project, Skill, SkillCategory, SkillProficiencyTier } from "@/types";

export interface SkillIconOption {
  id: string;
  label: string;
  render: (size?: number) => ReactNode;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  "Frontend",
  "Languages",
  "Backend",
  "Tools",
  "Practices",
];

export const SKILL_ICON_OPTIONS: SkillIconOption[] = [
  { id: "code-2", label: "Code", render: (s = 22) => <Code2 size={s} /> },
  { id: "atom", label: "Framework", render: (s = 22) => <Atom size={s} /> },
  { id: "file-code-2", label: "Script", render: (s = 22) => <FileCode2 size={s} /> },
  { id: "shield-check", label: "Typed", render: (s = 22) => <ShieldCheck size={s} /> },
  { id: "palette", label: "Design", render: (s = 22) => <Palette size={s} /> },
  { id: "wind", label: "Styling", render: (s = 22) => <Wind size={s} /> },
  { id: "database", label: "Database", render: (s = 22) => <Database size={s} /> },
  { id: "server", label: "Server", render: (s = 22) => <Server size={s} /> },
  { id: "terminal", label: "CLI", render: (s = 22) => <Terminal size={s} /> },
  { id: "layers", label: "Stack", render: (s = 22) => <Layers size={s} /> },
  { id: "cpu", label: "Systems", render: (s = 22) => <Cpu size={s} /> },
  { id: "globe", label: "Web", render: (s = 22) => <Globe size={s} /> },
  { id: "git-branch", label: "Git", render: (s = 22) => <GitBranch size={s} /> },
  { id: "smartphone", label: "Mobile", render: (s = 22) => <Smartphone size={s} /> },
  { id: "eye", label: "A11y", render: (s = 22) => <Eye size={s} /> },
  { id: "zap", label: "Speed", render: (s = 22) => <Zap size={s} /> },
];

export const SKILL_PRESETS: Omit<Skill, "isCustom">[] = [
  {
    name: "Next.js",
    icon: "layers",
    category: "Frontend",
    description: "Full-stack React framework with App Router and SSR",
    level: 78,
    tier: "Proficient",
    experience: "6+ months",
    highlights: ["App Router", "Server Components", "Dynamic Routing", "API Handlers"],
    usageNote: "Used for SEO-ready React apps with fast initial server rendering.",
  },
  {
    name: "Node.js",
    icon: "server",
    category: "Backend",
    description: "JavaScript runtime for scalable REST APIs and tooling",
    level: 75,
    tier: "Proficient",
    experience: "6+ months",
    highlights: ["REST Endpoints", "Express Middleware", "Async File I/O", "NPM Tooling"],
    usageNote: "Powers backend API services, build scripts, and local development tooling.",
  },
  {
    name: "MongoDB",
    icon: "database",
    category: "Backend",
    description: "Document-oriented NoSQL database for flexible schemas",
    level: 72,
    tier: "Growing",
    experience: "6+ months",
    highlights: ["Schema Modeling", "CRUD Queries", "Aggregation Basics", "Atlas Cloud"],
    usageNote: "Stores structured JSON-like application documents cleanly.",
  },
  {
    name: "Docker",
    icon: "cpu",
    category: "Tools",
    description: "Containerized environments for predictable deployments",
    level: 70,
    tier: "Growing",
    experience: "Exploring",
    highlights: ["Dockerfiles", "Multi-stage Builds", "Compose Stacks", "Image Optimization"],
    usageNote: "Keeps local development and deployment runtimes consistent.",
  },
  {
    name: "Python",
    icon: "terminal",
    category: "Languages",
    description: "Clean general-purpose scripting, automation, and APIs",
    level: 76,
    tier: "Proficient",
    experience: "1+ year",
    highlights: ["Automation Scripts", "Data Parsing", "FastAPI Basics", "Clean Syntax"],
    usageNote: "Ideal for quick utilities, backend prototypes, and problem solving.",
  },
];

/**
 * Returns the Lucide icon node matching a skill icon identifier.
 */
export function getSkillIcon(iconId: string, size = 22): ReactNode {
  const match = SKILL_ICON_OPTIONS.find((opt) => opt.id === iconId);
  return match ? match.render(size) : <Code2 size={size} />;
}

/**
 * Maps a numeric proficiency percentage (0-100) to a descriptive tier label.
 */
export function getProficiencyTier(level: number): SkillProficiencyTier {
  if (level >= 90) return "Core";
  if (level >= 85) return "Advanced";
  if (level >= 75) return "Proficient";
  return "Growing";
}

/**
 * Finds portfolio projects whose technology tags match the given skill name.
 */
export function getRelatedProjects(skill: Skill, projects: Project[]): Project[] {
  const normalizedSkill = skill.name.toLowerCase();
  const tokens = normalizedSkill
    .split(/[\s&/]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);

  return projects.filter((project) =>
    project.technologies.some((tech) => {
      const normalizedTech = tech.toLowerCase();
      return (
        normalizedTech === normalizedSkill ||
        normalizedTech.includes(normalizedSkill) ||
        normalizedSkill.includes(normalizedTech) ||
        tokens.some((token) => normalizedTech.includes(token))
      );
    })
  );
}

