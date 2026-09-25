import { itineraryRows } from "@/src/data/invitation";
import { Section } from "@/src/components/ui/Section";

interface ItineraryProps {
  onContinue?: () => void;
}

export function Itinerary({ onContinue }: ItineraryProps) {
  return (
    <Section id="the-plan" className="flex min-h-screen items-center bg-[#FCFBF8] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-[620px] border border-[#E6E1DC] bg-[#FFFDF9] p-2 shadow-[0_20px_48px_rgba(127,24,34,0.08)] sm:p-3">
        <div className="border border-[#E6E1DC] px-4 py-8 sm:px-7 sm:py-10">
          <div className="mb-7 text-center">
            <div className="mx-auto flex max-w-xs items-center justify-center gap-3 text-[9px] font-medium uppercase tracking-[0.28em] text-[#77736F]">
              <span className="h-px w-8 bg-[#E6E1DC]" />
              <span>THE PLAN</span>
              <span className="h-px w-8 bg-[#E6E1DC]" />
            </div>
            <p className="mt-3 text-xs italic text-[#77736F]">A very unnecessarily well-planned evening.</p>
          </div>

          <div className="border-y border-[#E6E1DC]">
            <div className="grid grid-cols-[minmax(92px,0.38fr)_1fr] gap-3 border-b border-[#E6E1DC] px-3 py-3 text-[9px] font-medium uppercase tracking-[0.2em] text-[#77736F] sm:grid-cols-[150px_1fr] sm:px-4">
              <span>TIME</span>
              <span>WHAT&apos;S HAPPENING</span>
            </div>

            {itineraryRows.map((row) => (
              <div
                key={`${row.time}-${row.activity}`}
                className={`grid grid-cols-[minmax(92px,0.38fr)_1fr] gap-3 border-b border-[#E6E1DC] px-3 py-4 last:border-b-0 sm:grid-cols-[150px_1fr] sm:px-4 ${
                  row.highlight ? "bg-[#F3E1E4] text-[#7F1822]" : "text-[#171717]"
                }`}
              >
                <span className="pr-1 text-[10px] font-medium tracking-[0.06em] sm:text-[11px]">{row.time}</span>
                <span className="text-sm leading-6 sm:text-[15px]">{row.activity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-center pt-8">
            <button
              type="button"
              onClick={onContinue}
              aria-label="Continue"
              className="group inline-flex items-center gap-3 border border-[#E6E1DC] bg-[#FFFDF9] px-5 py-3 text-[10px] font-medium uppercase tracking-[0.26em] text-[#1D4ED8] transition duration-200 hover:border-[#1D4ED8] hover:bg-[#EAF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D4ED8]/40 focus-visible:ring-offset-2"
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
