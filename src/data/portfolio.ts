import type { PortfolioConfig } from "@/types";

/**
 * ─── PORTFOLIO CONFIGURATION ───
 *
 * Edit this file to customize all content displayed on your portfolio.
 * All personal information, projects, skills, and social links are
 * centralized here for easy maintenance.
 */

const portfolio: PortfolioConfig = {
  // ─── Personal Info ───
  name: "Mahesh Kumar Mahato",
  tagline: "Web Developer",
  headline: "I build digital experiences that feel effortless.",
  introduction:
    "A passionate web developer crafting clean, interactive, and performant user interfaces with HTML, CSS, JavaScript, React, and modern web technologies.",
  email: "maheshkumarmahato789@gmail.com",

  // ─── Resume ───
  // Place your resume PDF at public/resume.pdf and uncomment:
  // resumeUrl: "/resume.pdf",
  resumeUrl: undefined,

  // ─── Contact Form Service ───
  // To enable form submissions, configure one of:
  //   - Formspree: "https://formspree.io/f/YOUR_FORM_ID"
  //   - EmailJS: handled in Contact component (see instructions there)
  //   - Custom API endpoint
  // Leave undefined for mailto: fallback
  formServiceUrl: undefined,

  // ─── Social Links ───
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/maheshkumarmahato105-png",
      icon: "github",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/", // ← Replace with your LinkedIn URL
      icon: "linkedin",
    },
  ],

  // ─── Navigation ───
  navLinks: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ],

  // ─── About Section Stats ───
  stats: [
    { label: "Technologies", value: "10", suffix: "+" },
    { label: "Projects Built", value: "5", suffix: "+" },
    { label: "Cups of Coffee", value: "∞" },
  ],

  // ─── About Paragraphs ───
  aboutParagraphs: [
    "I'm a web developer who loves turning ideas into clean, interactive digital experiences. My focus is on building responsive, performant websites using modern frontend technologies.",
    "I enjoy working with React, TypeScript, and Tailwind CSS to create user interfaces that are not only functional but feel polished and intuitive. I'm always exploring new tools and techniques to level up my craft.",
  ],

  // ─── Timeline / Journey ───
  timeline: [
    {
      year: "2024",
      title: "Started Learning Web Development",
      description:
        "Began the journey with HTML, CSS, and JavaScript fundamentals.",
    },
    {
      year: "2024",
      title: "Built First Projects",
      description:
        "Created responsive websites and interactive web applications.",
    },
    {
      year: "2025",
      title: "Explored React & Modern Tooling",
      description:
        "Adopted React, TypeScript, Tailwind CSS, and modern development workflows.",
    },
    {
      year: "Present",
      title: "Building & Growing",
      description:
        "Actively developing projects and expanding skills in frontend and full-stack development.",
    },
  ],

  // ─── Skills ───
  skills: [
    {
      name: "HTML5",
      icon: "code-2",
      category: "Frontend",
      description: "Semantic markup and modern HTML features",
    },
    {
      name: "CSS3",
      icon: "palette",
      category: "Frontend",
      description: "Responsive layouts, animations, and modern CSS",
    },
    {
      name: "JavaScript",
      icon: "file-code-2",
      category: "Languages",
      description: "ES6+ features, DOM manipulation, and async patterns",
    },
    {
      name: "React",
      icon: "atom",
      category: "Frontend",
      description: "Component-based UIs with hooks and state management",
    },
    {
      name: "TypeScript",
      icon: "shield-check",
      category: "Languages",
      description: "Type-safe JavaScript for scalable applications",
    },
    {
      name: "Tailwind CSS",
      icon: "wind",
      category: "Frontend",
      description: "Utility-first CSS for rapid UI development",
    },
    {
      name: "Git & GitHub",
      icon: "git-branch",
      category: "Tools",
      description: "Version control and collaborative development",
    },
    {
      name: "Responsive Design",
      icon: "smartphone",
      category: "Practices",
      description: "Mobile-first layouts for all screen sizes",
    },
    {
      name: "Web Accessibility",
      icon: "eye",
      category: "Practices",
      description: "Inclusive design following WCAG guidelines",
    },
    {
      name: "Performance",
      icon: "zap",
      category: "Practices",
      description: "Optimizing load times and runtime performance",
    },
  ],

  // ─── Projects ───
  // These are sample projects. Replace with your real work.
  // Set isSample: false (or remove the flag) for real projects.
  // Leave demoUrl/repoUrl undefined if not available — the buttons will be hidden.
  projects: [
    {
      id: "project-1",
      title: "Weather Dashboard",
      description:
        "A clean, responsive weather application with real-time data, location search, and animated weather visualizations.",
      longDescription:
        "Built a weather dashboard that fetches real-time weather data and displays it with smooth animations. Features include city search, 5-day forecast, and responsive design that works across all devices.",
      category: "Web App",
      technologies: ["React", "TypeScript", "Tailwind CSS", "API Integration"],
      demoUrl: undefined, // ← Add your live demo URL
      repoUrl: undefined, // ← Add your GitHub repo URL
      featured: true,
      isSample: true,
    },
    {
      id: "project-2",
      title: "Task Manager",
      description:
        "A minimalist task management app with drag-and-drop, categories, and local storage persistence.",
      longDescription:
        "Designed and developed a task management application with an intuitive UI. Features include task creation, categorization, drag-and-drop reordering, due dates, and persistent storage using the browser's localStorage API.",
      category: "Frontend",
      technologies: ["React", "JavaScript", "CSS3", "HTML5"],
      demoUrl: undefined,
      repoUrl: undefined,
      featured: true,
      isSample: true,
    },
    {
      id: "project-3",
      title: "Portfolio Website",
      description:
        "A modern, high-performance personal portfolio built with React, TypeScript, and fluid 3D motion systems.",
      longDescription:
        "This portfolio website features smooth scroll-linked animations, a dark theme with glassmorphism accents, interactive 3D skill cards, project filtering, and a fluid, responsive layout with rich micro-interactions.",
      category: "Frontend",
      technologies: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Motion",
      ],
      demoUrl: undefined,
      repoUrl: undefined,
      featured: true,
      isSample: true,
    },
  ],
};

export default portfolio;
