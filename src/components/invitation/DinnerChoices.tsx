"use client";

import { useState } from "react";

import { dinnerOptions } from "@/src/data/invitation";
import { Section } from "@/src/components/ui/Section";
import type { DinnerChoiceId, DinnerSelection } from "@/src/types/invitation";

interface DinnerChoicesProps {
  onContinue?: (selection: DinnerSelection) => void;
}

export function DinnerChoices({ onContinue }: DinnerChoicesProps) {
  const [selectedId, setSelectedId] = useState<DinnerChoiceId | null>(null);
  const [preference, setPreference] = useState("");

  const selectDinner = (id: string) => {
    setSelectedId(id as DinnerChoiceId);
    if (id !== "other") {
      setPreference("");
    }
  };

  const continueToNextStep = () => {
    if (!selectedId) {
      return;
    }

    onContinue?.({
      optionId: selectedId,
      preference: selectedId === "other" ? preference.trim() : "",
    });
  };

  return (
    <Section id="your-picks" className="flex min-h-screen items-center bg-[#FCFBF8] py-16 sm:py-20">
      <div className="stationery-panel-enter mx-auto w-full max-w-[620px] border border-[#E6E1DC] bg-[#FFFDF9] p-2 shadow-[0_20px_48px_rgba(127,24,34,0.08)] sm:p-3">
        <div className="stationery-content-reveal border border-[#E6E1DC] px-4 py-8 sm:px-7 sm:py-10">
          <div className="mb-7 text-center">
            <div className="mx-auto flex max-w-xs items-center justify-center gap-3 text-[9px] font-medium uppercase tracking-[0.28em] text-[#77736F]">
              <span className="h-px w-8 bg-[#E6E1DC]" />
              <span>YOUR PICKS</span>
              <span className="h-px w-8 bg-[#E6E1DC]" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold tracking-[-0.05em] text-[#171717] sm:text-3xl">
              Dinner first, obviously.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#77736F]">
              I have a couple of ideas, but if you have a preference, you can choose that too.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {dinnerOptions.map((option) => {
              const isSelected = selectedId === option.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectDinner(option.id)}
                  className={`group flex min-h-[92px] items-center justify-between gap-4 border p-4 text-left transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]/40 focus-visible:ring-offset-2 ${
                    isSelected
                      ? "border-[#1D4ED8] bg-[#EAF2FF] shadow-[0_0_0_1px_rgba(29,78,216,0.08)]"
                      : "border-[#E6E1DC] bg-[#FFFDF9] hover:-translate-y-0.5 hover:border-[#1D4ED8]/60 hover:bg-[#F4F8FF]"
                  }`}
                >
                  <span>
                    <span className="block text-base font-medium tracking-[-0.02em] text-[#171717]">{option.label}</span>
                    <span className={`mt-2 block text-[9px] font-medium uppercase tracking-[0.2em] ${isSelected ? "text-[#1D4ED8]" : "text-[#77736F]"}`}>
                      {option.badge}
                    </span>
                  </span>
                  <span className={`flex h-5 w-5 shrink-0 items-center justify-center border text-xs transition ${isSelected ? "border-[#1D4ED8] bg-[#1D4ED8] text-white" : "border-[#E6E1DC] text-transparent"}`}>
                    ✓
                  </span>
                </button>
              );
            })}
          </div>

          {selectedId === "other" ? (
            <label className="mt-5 block text-left">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#77736F]">What are you craving?</span>
              <input
                type="text"
                value={preference}
                onChange={(event) => setPreference(event.target.value)}
                placeholder="Tell me what sounds good"
                autoFocus
                className="mt-2 w-full border border-[#E6E1DC] bg-[#FCFBF8] px-3 py-3 text-sm text-[#171717] outline-none transition placeholder:text-[#77736F]/70 focus:border-[#1D4ED8] focus:ring-1 focus:ring-[#1D4ED8]/20"
              />
            </label>
          ) : null}

          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={continueToNextStep}
              disabled={!selectedId}
              aria-label="Continue"
              className="group inline-flex items-center gap-3 border border-[#E6E1DC] bg-[#FFFDF9] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.26em] text-[#1D4ED8] transition duration-200 hover:border-[#1D4ED8] hover:bg-[#EAF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>CONTINUE</span>
              <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </div>
    </Section>
  );
}
