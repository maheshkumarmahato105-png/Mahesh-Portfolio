import { useTheme } from "@/hooks/useTheme";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useSkills } from "@/hooks/useSkills";
import portfolio from "@/data/portfolio";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StoriesBar from "@/components/StoriesBar";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const sectionIds = ["home", "about", "skills", "projects", "contact"];

export default function App() {
  const { theme, toggleTheme, isDark } = useTheme();
  const { activeSection, setActiveSection } = useActiveSection(sectionIds);
  const { skills, addSkill, removeSkill, updateCustomSkill } = useSkills(
    portfolio.skills
  );

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-[#f5f5f7] selection:bg-[#2997ff] selection:text-white transition-colors duration-500 overflow-x-clip w-full relative ${isDark ? "dark" : "light"}`}>
      <Navbar
        links={portfolio.navLinks}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <main>
        <Hero data={portfolio} skillsCount={skills.length} />
        <StoriesBar />
        <About data={portfolio} skillsCount={skills.length} />
        <Skills
          skills={skills}
          projects={portfolio.projects}
          onAddSkill={addSkill}
          onUpdateSkill={updateCustomSkill}
          onRemoveSkill={removeSkill}
        />
        <Projects projects={portfolio.projects} />
        <Contact data={portfolio} />
      </main>
      <Footer data={portfolio} />
      <ScrollToTop />
    </div>
  );
}
