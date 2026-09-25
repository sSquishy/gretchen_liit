import { eventDetails } from "@/src/data/invitation";
import { Section } from "@/src/components/ui/Section";

interface EventDetailsProps {
  onContinue?: () => void;
}

export function EventDetails({ onContinue }: EventDetailsProps) {
  return (
    <Section id="the-evening" className="flex min-h-screen items-center bg-[#FCFBF8] py-16 sm:py-20">
      <div className="stationery-panel-enter mx-auto w-full max-w-[560px] border border-[#E6E1DC] bg-[#FFFDF9] p-2 shadow-[0_20px_48px_rgba(127,24,34,0.1)] sm:p-3">
        <div className="stationery-content-reveal border border-[#E6E1DC] px-5 py-10 text-center sm:px-10 sm:py-14">
          <div className="mx-auto mb-8 flex max-w-xs items-center justify-center gap-3 text-[9px] font-medium uppercase tracking-[0.28em] text-[#77736F]">
            <span className="h-px w-8 bg-[#E6E1DC]" />
            <span>THE EVENING</span>
            <span className="h-px w-8 bg-[#E6E1DC]" />
          </div>

          <div className="space-y-4 text-[#171717]">
            <p className="text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">{eventDetails.date}</p>
            <p className="text-xl font-medium tracking-[-0.03em] text-[#B4232F] sm:text-2xl">{eventDetails.location}</p>
            <p className="text-lg font-medium text-[#171717] sm:text-xl">{eventDetails.time}</p>
          </div>

          <div className="mx-auto my-8 h-px max-w-xs bg-[#E6E1DC]" />

          <div className="space-y-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[#77736F] sm:text-[11px]">
            <p>{eventDetails.peopleCount} PEOPLE · 1 MOVIE</p>
            <p>{eventDetails.seats.join(" · ")}</p>
          </div>

          <button
            type="button"
            onClick={onContinue}
            aria-label="Continue"
            className="group mt-10 inline-flex items-center gap-3 border border-[#E6E1DC] bg-[#FFFDF9] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.26em] text-[#1D4ED8] transition duration-200 hover:border-[#1D4ED8] hover:bg-[#EAF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]/40 focus-visible:ring-offset-2"
          >
            <span>CONTINUE</span>
            <span className="text-base leading-none transition-transform duration-200 group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </Section>
  );
}
