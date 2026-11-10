import { useState, useCallback, useMemo } from "react";
import type { Skill } from "@/types";
import { getProficiencyTier } from "@/lib/skills";

const STORAGE_KEY = "portfolio_custom_skills";

function readCustomSkills(): Skill[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is Skill =>
          Boolean(item) &&
          typeof item.name === "string" &&
          typeof item.category === "string" &&
          typeof item.description === "string"
      )
      .map((item) => ({ ...item, isCustom: true }));
  } catch {
    return [];
  }
}

function writeCustomSkills(skills: Skill[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
  } catch {
    // Storage quota exceeded or unavailable; in-memory state still works
  }
}

/**
 * Manages built-in portfolio skills merged with user-added custom skills persisted in localStorage.
 */
export function useSkills(baseSkills: Skill[]) {
  const [customSkills, setCustomSkills] = useState<Skill[]>(() => readCustomSkills());

  const skills = useMemo(
    () => [...baseSkills, ...customSkills],
    [baseSkills, customSkills]
  );

  const addSkill = useCallback(
    (skill: Omit<Skill, "isCustom">): { ok: boolean; error?: string } => {
      const trimmedName = skill.name.trim();
      if (!trimmedName) {
        return { ok: false, error: "Please enter a skill name." };
      }

      const duplicate = [...baseSkills, ...customSkills].some(
        (existing) => existing.name.toLowerCase() === trimmedName.toLowerCase()
      );
      if (duplicate) {
        return { ok: false, error: `"${trimmedName}" already exists in your skills.` };
      }

      const level = Math.min(100, Math.max(10, skill.level ?? 75));
      const newEntry: Skill = {
        ...skill,
        name: trimmedName,
        description: skill.description.trim(),
        level,
        tier: skill.tier ?? getProficiencyTier(level),
        experience: skill.experience?.trim() || "Active",
        highlights:
          skill.highlights && skill.highlights.length > 0
            ? skill.highlights
            : ["Core Concepts", "Practical Projects"],
        isCustom: true,
      };

      setCustomSkills((prev) => {
        const next = [...prev, newEntry];
        writeCustomSkills(next);
        return next;
      });

      return { ok: true };
    },
    [baseSkills, customSkills]
  );

  const removeSkill = useCallback((name: string) => {
    setCustomSkills((prev) => {
      const next = prev.filter((s) => s.name.toLowerCase() !== name.toLowerCase());
      writeCustomSkills(next);
      return next;
    });
  }, []);

  const updateCustomSkill = useCallback(
    (originalName: string, updates: Partial<Skill>): { ok: boolean; error?: string } => {
      const nextName = updates.name?.trim();
      if (nextName !== undefined && !nextName) {
        return { ok: false, error: "Please enter a skill name." };
      }

      if (
        nextName &&
        nextName.toLowerCase() !== originalName.toLowerCase() &&
        [...baseSkills, ...customSkills].some(
          (s) => s.name.toLowerCase() === nextName.toLowerCase()
        )
      ) {
        return { ok: false, error: `"${nextName}" already exists in your skills.` };
      }

      setCustomSkills((prev) => {
        const next = prev.map((s) => {
          if (s.name.toLowerCase() !== originalName.toLowerCase()) return s;
          const level = Math.min(100, Math.max(10, updates.level ?? s.level ?? 75));
          return {
            ...s,
            ...updates,
            name: nextName ?? s.name,
            level,
            tier: updates.tier ?? getProficiencyTier(level),
            isCustom: true,
          };
        });
        writeCustomSkills(next);
        return next;
      });

      return { ok: true };
    },
    [baseSkills, customSkills]
  );

  return {
    skills,
    customCount: customSkills.length,
    addSkill,
    removeSkill,
    updateCustomSkill,
  };
}
