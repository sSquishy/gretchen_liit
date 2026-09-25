"use client";

import { useState } from "react";

import { Section } from "@/src/components/ui/Section";

export function InvitationCopy() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "invalid" | "requested">("idle");

  const requestCopy = () => {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setStatus("invalid");
      return;
    }

    setStatus("requested");
  };

  return (
    <Section id="invitation-copy" className="bg-[#FCFBF8] pb-16 pt-2 sm:pb-20">
      <div className="mx-auto w-full max-w-[560px] border-t border-[#E6E1DC] pt-8 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#77736F]">KEEP A COPY?</p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#77736F]">
          If you&apos;d like, you can keep this invitation for later.
        </p>

        <div className="mx-auto mt-5 flex max-w-md flex-col gap-2 sm:flex-row">
          <label className="flex-1">
            <span className="sr-only">Your email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              placeholder="Your email"
              className="w-full border border-[#E6E1DC] bg-[#FFFDF9] px-4 py-3 text-sm text-[#171717] outline-none transition placeholder:text-[#77736F]/70 focus:border-[#B4232F] focus:ring-1 focus:ring-[#B4232F]/20"
            />
          </label>
          <button
            type="button"
            onClick={requestCopy}
            className="inline-flex items-center justify-center border border-[#E6E1DC] bg-[#FFFDF9] px-4 py-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#1D4ED8] transition hover:border-[#1D4ED8] hover:bg-[#EAF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]/40 focus-visible:ring-offset-2"
          >
            SEND ME A COPY →
          </button>
        </div>

        <div className="min-h-10 pt-3 text-xs text-[#77736F]" aria-live="polite">
          {status === "invalid" ? <p className="text-[#B4232F]">Please enter a valid email.</p> : null}
          {status === "requested" ? (
            <p>
              <span className="font-medium uppercase tracking-[0.16em] text-[#7F1822]">EMAIL DELIVERY NOT CONNECTED YET</span>
            </p>
          ) : null}
        </div>

        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Download is not connected yet"
          className="mt-2 cursor-not-allowed text-[10px] font-medium uppercase tracking-[0.2em] text-[#77736F] opacity-60"
        >
          DOWNLOAD A COPY ↓
        </button>
      </div>
    </Section>
  );
}
