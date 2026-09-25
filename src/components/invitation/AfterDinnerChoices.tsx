"use client";

import { Section } from "@/src/components/ui/Section";

interface AfterDinnerChoicesProps {
  onContinue?: () => void;
}

const spontaneousPossibilities = [
  { icon: "🎮", label: "Games" },
  { icon: "🍰", label: "Dessert" },
  { icon: "🚶", label: "Walk" },
];

export function AfterDinnerChoices({ onContinue }: AfterDinnerChoicesProps) {
  return (
  <Section id="after-dinner" className="flex min-h-screen items-center bg-[#FCFBF8] py-16 sm:py-20">
        <div className="stationery-panel-enter mx-auto w-full max-w-[560px] border border-[#E6E1DC] bg-[#FFFDF9] p-2 shadow-[0_20px_48px_rgba(127,24,34,0.08)] sm:p-3">
          <div className="stationery-content-reveal border border-[#E6E1DC] px-5 py-10 text-center sm:px-10 sm:py-14">
            <div className="mx-auto mb-8 flex max-w-xs items-center justify-center gap-3 text-[9px] font-medium uppercase tracking-[0.28em] text-[#77736F]">
              <span className="h-px w-8 bg-[#E6E1DC]" />
              <span>AFTER DINNER</span>
              <span className="h-px w-8 bg-[#E6E1DC]" />
            </div>

            <h2 className="text-3xl font-semibold tracking-[-0.06em] text-[#171717] sm:text-4xl">No plan yet.</h2>
            <p className="mt-4 text-sm text-[#77736F] sm:text-base">We&apos;ll figure it out when we&apos;re there.</p>

            <div className="mx-auto mt-9 grid max-w-sm grid-cols-3 gap-3 border-y border-[#E6E1DC] py-5">
              {spontaneousPossibilities.map((possibility) => (
                <div key={possibility.label} className="flex min-h-[86px] flex-col items-center justify-center gap-3 border border-[#E6E1DC] bg-[#FCFBF8] px-2 py-3">
                  <span className="text-xl" aria-hidden="true">{possibility.icon}</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#171717]">{possibility.label}</span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-xs italic text-[#77736F]">Maybe one. Maybe all three. We&apos;ll see.</p>

            <button
              type="button"
              onClick={onContinue}
              aria-label="Continue to movie ticket"
              className="group mt-9 inline-flex items-center gap-3 border border-[#E6E1DC] bg-[#FFFDF9] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.26em] text-[#1D4ED8] transition duration-200 hover:border-[#1D4ED8] hover:bg-[#EAF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]/40 focus-visible:ring-offset-2"
            >
              <span>CONTINUE</span>
              <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
    </Section>
  );
}
