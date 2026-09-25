"use client";

import { eventDetails } from "@/src/data/invitation";

interface MovieTicketProps {
  dinnerSelection?: { optionId: string; preference: string } | null;
  onContinue?: () => void;
}

export function MovieTicket({ onContinue }: MovieTicketProps) {
  void onContinue;

  return (
    <section className="flex min-h-screen items-center bg-[#FCFBF8] px-4 py-16 sm:px-6 sm:py-20">
      <div className="ticket-reveal mx-auto w-full max-w-[760px]">
        <div className="vintage-ticket relative grid grid-cols-[minmax(0,1fr)_128px] bg-[#FFFDF9] shadow-[0_20px_48px_rgba(127,24,34,0.1)] sm:grid-cols-[minmax(0,1fr)_156px]">
          <div className="vintage-ticket-main relative p-5 sm:p-8">
            <div className="vintage-ticket-inner flex h-full flex-col border border-[#E6E1DC] px-4 py-6 sm:px-7 sm:py-8">
              <div className="flex items-start justify-between gap-4 border-b border-[#E6E1DC] pb-4">
                <div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-[#77736F]">SM CINEMA</p>
                  <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.3em] text-[#77736F]">MEGAMALL</p>
                </div>
                <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-[#B4232F]">01</span>
              </div>

              <div className="py-8 text-center sm:py-10">
                <p className="text-2xl font-semibold uppercase tracking-[0.02em] text-[#171717] sm:text-3xl">{eventDetails.movieTitle}</p>
                <div className="mx-auto mt-6 space-y-2 text-[10px] font-medium uppercase tracking-[0.2em] text-[#77736F]">
                  <p>{eventDetails.date}</p>
                  <p>{eventDetails.location}</p>
                  <p>{eventDetails.time}</p>
                </div>
              </div>

              <div className="border-y border-[#E6E1DC] py-5 text-center">
                <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#77736F]">SEATS</p>
                <p className="mt-2 text-lg font-semibold tracking-[0.08em] text-[#7F1822] sm:text-xl">{eventDetails.seats.join(" · ")}</p>
              </div>

              <p className="mt-auto pt-8 text-center text-[10px] font-medium uppercase leading-5 tracking-[0.18em] text-[#7F1822]">
                A VERY UNNECESSARILY
                <br />
                WELL-PLANNED EVENING
              </p>
            </div>
          </div>

          <aside className="vintage-ticket-stub flex flex-col items-center justify-between px-3 py-6 text-center sm:px-5 sm:py-8">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#77736F]">ADMIT</p>
              <p className="mt-3 text-xl font-semibold uppercase tracking-[0.08em] text-[#B4232F] sm:text-2xl">
                {eventDetails.peopleCount === 3 ? "THREE" : eventDetails.peopleCount}
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 text-[8px] font-medium uppercase tracking-[0.14em] text-[#77736F] [writing-mode:vertical-rl] [transform:rotate(180deg)]">
              <p>You don&apos;t really need to prepare anything.</p>
              <p>Just show up.</p>
              <p>I&apos;ll handle the rest.</p>
            </div>

            <div>
              <p className="text-[8px] font-medium uppercase tracking-[0.18em] text-[#77736F]">{eventDetails.ticketsStatus}</p>
            </div>
          </aside>
        </div>

      </div>
    </section>
  );
}
