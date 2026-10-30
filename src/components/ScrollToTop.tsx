import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUp } from "lucide-react";
import { smoothScrollTo } from "@/lib/smoothScroll";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    smoothScrollTo(0);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-[rgba(255,255,255,0.14)] bg-[rgba(28,28,30,0.85)] text-[#a1a1a6] shadow-2xl backdrop-blur-2xl transition-all hover:scale-105 hover:border-[rgba(255,255,255,0.28)] hover:text-[#f5f5f7] active:scale-95 cursor-pointer"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
