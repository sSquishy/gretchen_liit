"use client";

import { useEffect, useRef, useState } from "react";

type OpeningState = "closed" | "opening" | "opened";

interface OpeningScreenProps {
  onContinue?: () => void;
}

export function OpeningScreen({ onContinue }: OpeningScreenProps) {
  const [openingState, setOpeningState] = useState<OpeningState>("closed");
  const [isLeaving, setIsLeaving] = useState(false);
  const [noOffset, setNoOffset] = useState({ x: 0, y: 0 });
  const openingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const continueTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const confirmationAreaRef = useRef<HTMLDivElement | null>(null);
  const noButtonRef = useRef<HTMLButtonElement | null>(null);
  const lastPushTime = useRef(0);

  useEffect(() => {
    return () => {
      if (openingTimer.current) {
        clearTimeout(openingTimer.current);
      }
      if (continueTimer.current) {
        clearTimeout(continueTimer.current);
      }
    };
  }, []);

  const openInvitation = () => {
    if (openingState !== "closed") {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOpeningState("opened");
      return;
    }

    setOpeningState("opening");
    openingTimer.current = setTimeout(() => setOpeningState("opened"), 1400);
  };

  const continueToNextStep = () => {
    if (isLeaving || openingState !== "opened" || !onContinue) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onContinue();
      return;
    }

    setIsLeaving(true);
    continueTimer.current = setTimeout(onContinue, 780);
  };

  const confirmAttendance = () => {
    continueToNextStep();
  };

  const pushNoButton = (clientX: number, clientY: number) => {
    if (isLeaving || !confirmationAreaRef.current || !noButtonRef.current) {
      return;
    }

    const now = Date.now();
    if (now - lastPushTime.current < 180) {
      return;
    }

    const areaRect = confirmationAreaRef.current.getBoundingClientRect();
    const buttonRect = noButtonRef.current.getBoundingClientRect();
    const proximity = 68;
    const nearestX = Math.max(buttonRect.left, Math.min(clientX, buttonRect.right));
    const nearestY = Math.max(buttonRect.top, Math.min(clientY, buttonRect.bottom));
    const distance = Math.hypot(clientX - nearestX, clientY - nearestY);

    if (distance > proximity) {
      return;
    }

    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;
    const directionX = centerX - clientX;
    const directionY = centerY - clientY;
    const directionLength = Math.hypot(directionX, directionY) || 1;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pushDistance = prefersReducedMotion ? 14 : 62;
    const baseLeft = buttonRect.left - noOffset.x;
    const baseTop = buttonRect.top - noOffset.y;
    const minX = areaRect.left + 8 - baseLeft;
    const maxX = areaRect.right - 8 - buttonRect.width - baseLeft;
    const minY = areaRect.top + 8 - baseTop;
    const maxY = areaRect.bottom - 8 - buttonRect.height - baseTop;
    const nextX = Math.max(minX, Math.min(maxX, noOffset.x + (directionX / directionLength) * pushDistance));
    const nextY = Math.max(minY, Math.min(maxY, noOffset.y + (directionY / directionLength) * pushDistance));

    if (nextX === noOffset.x && nextY === noOffset.y) {
      return;
    }

    lastPushTime.current = now;
    setNoOffset({ x: nextX, y: nextY });
  };

  const isOpening = openingState === "opening";
  const isOpened = openingState === "opened";

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FCFBF8] px-5 py-8 sm:px-8">
      <div className="absolute left-5 top-6 text-[10px] font-medium uppercase tracking-[0.28em] text-[#77736F] sm:left-8 sm:top-8">
        MOVIE NIGHT / 01
      </div>
      <div className="absolute right-5 top-6 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.28em] text-[#77736F] sm:right-8 sm:top-8">
        <span className="h-1.5 w-1.5 rounded-full bg-[#B4232F]" />
        <span>26.09.26</span>
      </div>

      <div className={`relative w-full max-w-[620px] transition-all duration-700 ${isOpened ? "pt-8 sm:pt-12" : ""}`}>
        {isOpened ? (
          <InvitationCard
            confirmationAreaRef={confirmationAreaRef}
            isLeaving={isLeaving}
            noButtonRef={noButtonRef}
            noOffset={noOffset}
            onConfirm={confirmAttendance}
            onPointerMove={pushNoButton}
          />
        ) : (
          <div className="fade-up flex flex-col items-center">
            <div className={`envelope-scene ${isOpening ? "is-opening" : ""}`}>
              <div className="invitation-paper invitation-paper-emerging" aria-hidden="true">
                <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-[#77736F]">You are invited</p>
                <p className="mt-5 text-2xl font-semibold tracking-[-0.06em] text-[#171717] sm:text-3xl">
                  to a very unnecessarily
                  <br />
                  well-planned evening
                </p>
              </div>

              <button
                type="button"
                aria-label="Open invitation"
                aria-expanded={isOpening}
                aria-busy={isOpening}
                disabled={isOpening}
                onClick={openInvitation}
                className="envelope-shell group relative aspect-[1.5/1] w-full max-w-[520px] border border-transparent bg-transparent shadow-[0_24px_60px_rgba(127,24,34,0.13)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(127,24,34,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B4232F]/40 focus-visible:ring-offset-4 disabled:pointer-events-none"
              >
                <span className="envelope-back absolute inset-0 z-0 border border-[#E6E1DC] bg-[#F6EDE5]" />
                <span className="envelope-front absolute inset-x-0 bottom-0 z-20 h-[58%] border-t border-[#E6E1DC] bg-[#F3E7DC] [clip-path:polygon(0_0,50%_42%,100%_0,100%_100%,0_100%)]" />
                <span className="envelope-flap absolute inset-x-0 top-0 z-30 h-[58%]">
                  <span className="envelope-flap-face absolute inset-0 border-b border-[#E6E1DC] bg-[#F3E7DC] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
                  <span className="envelope-seal absolute left-1/2 top-[42%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#7F1822] text-[10px] font-medium tracking-[0.18em] text-[#FFFFFF] shadow-[0_8px_18px_rgba(127,24,34,0.28)] transition-transform duration-300 group-hover:scale-105">
                    MN
                  </span>
                </span>
              </button>
            </div>
            <p className="mt-8 text-[10px] font-medium uppercase tracking-[0.38em] text-[#77736F]">
              {isOpening ? "Opening the invitation" : "Open the invitation"}
            </p>
            <span className="mt-3 text-sm text-[#B4232F]">↓</span>
          </div>
        )}
      </div>
    </section>
  );
}

interface InvitationCardProps {
  confirmationAreaRef: React.RefObject<HTMLDivElement | null>;
  isLeaving: boolean;
  noButtonRef: React.RefObject<HTMLButtonElement | null>;
  noOffset: { x: number; y: number };
  onConfirm: () => void;
  onPointerMove: (clientX: number, clientY: number) => void;
}

function InvitationCard({
  confirmationAreaRef,
  isLeaving,
  noButtonRef,
  noOffset,
  onConfirm,
  onPointerMove,
}: InvitationCardProps) {
  return (
    <div className={`invitation-card ${isLeaving ? "is-leaving" : "fade-up"}`}>
      <div className="border border-[#E6E1DC] px-4 py-8 text-center sm:px-7 sm:py-10">
        <div className="mx-auto mb-6 flex max-w-xs items-center justify-center gap-2 text-[9px] font-medium uppercase tracking-[0.25em] text-[#77736F]">
          <span className="h-px w-6 bg-[#E6E1DC]" />
          <span>HELLOO PO GRETCHEN</span>
          <span className="h-px w-6 bg-[#E6E1DC]" />
        </div>

        <h1 className="select-none text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[0.86] tracking-[-0.08em] text-[#B4232F]">
          <span className="block text-[#171717]">You are</span>
          <span className="block">invited</span>
        </h1>

        <p className="mx-auto mt-5 max-w-sm text-xs font-light tracking-[-0.02em] text-[#77736F] sm:text-sm">
          to a very unnecessarily well-planned evening
        </p>

        <div className="mx-auto mt-6 max-w-sm border-t border-[#E6E1DC] pt-5">
          <div className="grid gap-2 text-[9px] font-medium uppercase tracking-[0.18em] text-[#171717] sm:grid-cols-3 sm:gap-3">
            <p>SEPTEMBER 26, 2026</p>
            <p>SM MEGAMALL</p>
            <p>9:30 PM</p>
          </div>
        </div>

        <div
          ref={confirmationAreaRef}
          className="mx-auto mt-8 max-w-md overflow-visible px-2 pb-2 pt-1"
          onPointerMove={(event) => onPointerMove(event.clientX, event.clientY)}
        >
            <p className="text-sm font-medium text-[#171717] sm:text-base">Are you coming?</p>
            <div className="relative mt-5 flex min-h-12 items-center justify-center gap-3">
              <button
                type="button"
                onClick={onConfirm}
                disabled={isLeaving}
                className="group inline-flex shrink-0 items-center gap-2 border border-[#1D4ED8] bg-[#1D4ED8] px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.2em] text-white transition duration-200 hover:bg-[#1E3A8A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]/40 focus-visible:ring-offset-2 disabled:opacity-60"
              >
                <span>YES, I&apos;M COMING</span>
                <span className="text-sm leading-none transition-transform duration-200 group-hover:translate-x-1">→</span>
              </button>
              <button
                ref={noButtonRef}
                type="button"
                disabled={isLeaving}
                onPointerMove={(event) => onPointerMove(event.clientX, event.clientY)}
                onPointerDown={(event) => onPointerMove(event.clientX, event.clientY)}
                style={{ transform: `translate(${noOffset.x}px, ${noOffset.y}px)` }}
                className="shrink-0 border border-[#E6E1DC] bg-[#FFFDF9] px-4 py-2.5 text-[9px] font-medium uppercase tracking-[0.2em] text-[#1D4ED8] transition-[transform,background-color,border-color] duration-300 ease-out hover:border-[#1D4ED8] hover:bg-[#EAF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]/40 focus-visible:ring-offset-2 disabled:opacity-60"
              >
                NO
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}
