# Mahesh Kumar Mahato — Developer Portfolio

A production-quality personal portfolio website inspired by Apple's premium design language, product storytelling, smooth scrolling, cinematic animations, and minimalist aesthetic.

Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, **Motion for React**, and **Vite**.

---

## 🌟 Highlights & Key Features

- **Apple-Inspired Aesthetic**: Deep black and graphite dark mode, subtle ambient glows, glassmorphism frosted glass, large bold typography, and generous whitespace.
- **Cinematic Full-Screen Hero**: 3D-inspired multi-layered floating orb with ambient light bloom, word-by-word gradient styling, dynamic availability beacon, and parallax scrolling.
- **Smooth Navigation**: Sticky glass header with spring-animated active section pill (`layoutId`), theme switcher (Dark/Light with persistent `localStorage`), and an accessible mobile drawer menu with Escape key dismissal and body-scroll locking.
- **Story-Driven About Section**: Professional bio, interactive focus areas (micro-interactions, performance, modular architecture, a11y), real statistics, and a milestone journey timeline.
- **Interactive Skills Grid**: Categorized toolkit with live category filtering, hover glows, touch support, and WCAG-compliant color contrast.
- **Apple Product-Style Project Showcase**:
  - Live category filtering (All, Web App, Frontend, Full Stack).
  - Custom Apple-grade UI mockup fallback graphics for projects without screenshots.
  - Interactive project detail modal with focus trapping, Escape dismissal, and deep-dive metadata.
  - Clean handling of pending URLs with honest "Links coming soon" states (no dead buttons).
- **Functional Contact Section**:
  - Full client-side form validation (required checks, email regex, minimum message length).
  - One-click copy email button with visual clipboard confirmation.
  - Transparent dual-mode submission: direct backend/Formspree integration when configured, or verified pre-filled `mailto:` client fallback.
  - Direct social links for GitHub and LinkedIn.
- **Accessibility & Performance**:
  - Semantic HTML landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
  - Native reduced-motion support (`prefers-reduced-motion: reduce`) across all animations.
  - Fast Vite bundle build in under 800ms.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **Motion & Animation** | Motion for React (`motion/react`) |
| **Icons** | Lucide React |
| **Fonts** | Inter (Google Fonts) |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) installed.

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173` to preview the site with instant Hot Module Replacement (HMR).

### 3. Production Build

To run type checking and create an optimized production bundle:

```bash
npm run build
```

The output will be generated in the `dist/` directory.

### 4. Preview the Production Build Locally

```bash
npm run preview
```

---

## ⚙️ Customization Guide

All portfolio content is centralized in a single configuration file:
👉 **`src/data/portfolio.ts`**

### Personal Information & Social Links
Open `src/data/portfolio.ts` to update:
- `name`: Your full name.
- `tagline`: Your title (e.g. "Frontend Engineer", "Web Developer").
- `email`: Your real email address.
- `social`: URLs for your GitHub and LinkedIn profiles.

### Adding Your Resume
1. Save your resume PDF as `resume.pdf` inside the `public/` directory:
   ```
   public/resume.pdf
   ```
2. In `src/data/portfolio.ts`, uncomment or set:
   ```ts
   resumeUrl: "/resume.pdf",
   ```
The "Download Curriculum Vitae" button in the contact section will automatically activate.

### Enabling Direct Contact Form Submissions (Formspree / Endpoint)
By default, the form validates inputs and prepares a pre-filled email in the user's mail client. To receive submissions directly to your inbox:
1. Create a free form at [Formspree](https://formspree.io/) or your preferred API provider.
2. In `src/data/portfolio.ts`, set `formServiceUrl`:
   ```ts
   formServiceUrl: "https://formspree.io/f/YOUR_FORM_ID",
   ```

### Adding Real Projects
In `src/data/portfolio.ts`, update the `projects` array:
```ts
{
  id: "my-real-project",
  title: "My Production App",
  description: "A concise overview of what it does.",
  longDescription: "Detailed case study explaining your architectural choices...",
  category: "Web App", // "Web App" | "Frontend" | "Full Stack"
  technologies: ["React", "TypeScript", "Tailwind CSS"],
  imageUrl: "/images/project-preview.jpg", // optional: place image in public/images/
  demoUrl: "https://your-demo-url.com",    // live preview link
  repoUrl: "https://github.com/...",       // repository link
  featured: true,
  isSample: false,
}
```

---

## 🚢 Deployment

### Deploying to Vercel
1. Push your repository to GitHub.
2. Import the repository in [Vercel](https://vercel.com).
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**.

### Deploying to Netlify
1. Push your repository to GitHub.
2. Create a new site from Git in [Netlify](https://netlify.com).
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. Click **Deploy site**.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

