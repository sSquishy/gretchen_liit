"use client";

import { useEffect, useRef, useState } from "react";

import { AfterDinnerChoices } from "@/src/components/invitation/AfterDinnerChoices";
import { DinnerChoices } from "@/src/components/invitation/DinnerChoices";
import { Itinerary } from "@/src/components/invitation/Itinerary";
import { MovieTicket } from "@/src/components/invitation/MovieTicket";
import { OpeningScreen } from "@/src/components/invitation/OpeningScreen";
import { dinnerOptions, eventDetails } from "@/src/data/invitation";
import type { DinnerSelection } from "@/src/types/invitation";

type InvitationStep =
  | "opening"
  | "itinerary"
  | "dinner-choices"
  | "after-dinner"
  | "movie-ticket";

export default function Home() {
  const [step, setStep] = useState<InvitationStep>("opening");
  const [dinnerSelection, setDinnerSelection] = useState<DinnerSelection | null>(null);
  const notificationRequestRef = useRef<string | null>(null);

  useEffect(() => {
    if (step !== "movie-ticket" || !dinnerSelection || notificationRequestRef.current) {
      return;
    }

    const selectedOption = dinnerOptions.find((option) => option.id === dinnerSelection.optionId);
    if (!selectedOption) {
      return;
    }

    const idempotencyKey = crypto.randomUUID();
    notificationRequestRef.current = idempotencyKey;

    void fetch("/api/invitation-complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dinner: {
          optionId: dinnerSelection.optionId,
          optionLabel: selectedOption.label,
          preference: dinnerSelection.preference,
        },
        date: eventDetails.date,
        location: eventDetails.location,
        time: eventDetails.time,
        movieTitle: eventDetails.movieTitle,
        seats: eventDetails.seats,
        peopleCount: eventDetails.peopleCount,
        ticketStatus: eventDetails.ticketsStatus,
        idempotencyKey,
      }),
    }).catch((error: unknown) => {
      console.error("Invitation completion notification request failed", error);
    });
  }, [dinnerSelection, step]);

  return (
    <main className="bg-[#FAFAF8] text-[#171717]">
      {step === "opening" ? (
        <OpeningScreen onContinue={() => setStep("itinerary")} />
      ) : step === "itinerary" ? (
        <Itinerary onContinue={() => setStep("dinner-choices")} />
      ) : step === "dinner-choices" ? (
        <DinnerChoices
          onContinue={(selection) => {
            setDinnerSelection(selection);
            setStep("after-dinner");
          }}
        />
      ) : step === "after-dinner" ? (
        <AfterDinnerChoices onContinue={() => setStep("movie-ticket")} />
      ) : step === "movie-ticket" ? (
        <MovieTicket dinnerSelection={dinnerSelection} />
      ) : null}
    </main>
  );
}
