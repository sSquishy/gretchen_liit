"use client";

import { useState } from "react";

import { eventDetails } from "@/src/data/invitation";
import { InvitationCopy } from "@/src/components/invitation/InvitationCopy";
import { Section } from "@/src/components/ui/Section";

export function BeforeYouGo() {
  const [isCopyVisible, setIsCopyVisible] = useState(false);

  return (
    <>
      <Section id="before-you-go" className="flex min-h-screen items-center bg-[#FCFBF8] py-16 sm:py-20">
        <div className="stationery-panel-enter mx-auto w-full max-w-[560px] border border-[#E6E1DC] bg-[#FFFDF9] p-2 shadow-[0_20px_48px_rgba(127,24,34,0.07)] sm:p-3">
          <div className="stationery-content-reveal border border-[#E6E1DC] px-5 py-10 text-center sm:px-9 sm:py-14">
            <div className="mb-8 flex items-center justify-center gap-3 text-[9px] font-medium uppercase tracking-[0.28em] text-[#77736F]">
              <span className="h-px w-8 bg-[#E6E1DC]" />
              <span>BEFORE YOU GO</span>
              <span className="h-px w-8 bg-[#E6E1DC]" />
            </div>

            <div className="space-y-2 text-lg leading-8 text-[#171717] sm:text-xl">
              {eventDetails.beforeYouGoMessage.split("\n\n").map((paragraph, index) => (
                <p key={`${paragraph}-${index}`} className={index === 2 ? "text-[#77736F]" : undefined}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mx-auto mt-8 max-w-sm border-y border-[#E6E1DC] py-5 text-[10px] font-medium uppercase tracking-[0.2em]">
              <p className="text-[#171717]">{eventDetails.date}</p>
              <p className="mt-3 text-[#171717]">{eventDetails.location}</p>
              <p className="mt-3 text-[#171717]">{eventDetails.time}</p>
              <p className="mt-5 text-[#7F1822]">{eventDetails.seats.join(" · ")}</p>
              <p className="mt-3 text-[#77736F]">{eventDetails.peopleCount} PEOPLE · 1 MOVIE · NO STRESS</p>
            </div>

            <button
              type="button"
              onClick={() => setIsCopyVisible(true)}
              aria-expanded={isCopyVisible}
              aria-controls="invitation-copy"
              className="group mt-9 inline-flex items-center gap-3 border border-[#E6E1DC] bg-[#FFFDF9] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.26em] text-[#1D4ED8] transition duration-200 hover:border-[#1D4ED8] hover:bg-[#EAF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]/40 focus-visible:ring-offset-2"
            >
              <span>CONTINUE</span>
              <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>
      </Section>

      {isCopyVisible ? <InvitationCopy /> : null}
    </>
  );
}
