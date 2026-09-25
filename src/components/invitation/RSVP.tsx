"use client";

import { type FormEvent, useMemo, useState } from "react";

import { afterDinnerOptions, dinnerOptions, eventDetails } from "@/src/data/invitation";
import { Button } from "@/src/components/ui/Button";
import { Section } from "@/src/components/ui/Section";

const initialForm = {
  name: "",
  email: "",
  dinnerChoice: "",
  afterDinnerChoices: [] as string[],
  notes: "",
};

export function RSVP() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const dinnerSelection = useMemo(
    () => dinnerOptions.find((option) => option.id === form.dinnerChoice)?.label ?? "Not selected",
    [form.dinnerChoice],
  );

  const afterDinnerSelection = useMemo(
    () =>
      form.afterDinnerChoices
        .map((choiceId) => afterDinnerOptions.find((option) => option.id === choiceId)?.label)
        .filter(Boolean)
        .join(", ") || "None selected",
    [form.afterDinnerChoices],
  );

  const handleChange = (field: "name" | "email" | "dinnerChoice" | "notes", value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const toggleAfterDinnerChoice = (choiceId: string) => {
    setForm((current) => {
      const next = current.afterDinnerChoices.includes(choiceId)
        ? current.afterDinnerChoices.filter((id) => id !== choiceId)
        : [...current.afterDinnerChoices, choiceId];

      return { ...current, afterDinnerChoices: next };
    });
  };

  const validateForm = () => {
    const nextErrors: { [key: string]: string } = {};

    if (!form.name.trim()) nextErrors.name = "Please add your name.";
    if (!form.email.trim()) nextErrors.email = "Please add your email.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = "Please enter a valid email.";
    if (!form.dinnerChoice) nextErrors.dinnerChoice = "Pick a dinner plan.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Section className="py-16 sm:py-20">
        <div className="fade-up rounded-[2rem] border border-[#E5E5E5] bg-[#FFFFFF] p-6 sm:p-8 lg:p-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#737373]">ALL SET.</p>
          <div className="mt-6 space-y-4 border-t border-[#E5E5E5] pt-6 text-[#171717]">
            <p className="text-3xl font-semibold tracking-[-0.06em] sm:text-4xl">September 26, 2026</p>
            <p className="text-lg text-[#737373]">SM Megamall</p>
            <p className="text-lg text-[#737373]">9:30 PM</p>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#737373]">Food</p>
                <p className="mt-2 text-base text-[#171717]">{dinnerSelection}</p>
              </div>
              <div className="rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#737373]">After dinner</p>
                <p className="mt-2 text-base text-[#171717]">{afterDinnerSelection}</p>
              </div>
              <div className="rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#737373]">Movie</p>
                <p className="mt-2 text-base text-[#171717]">✓</p>
              </div>
              <div className="rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] p-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#737373]">Seats</p>
                <p className="mt-2 text-base text-[#171717]">{eventDetails.seats.join(" · ")}</p>
              </div>
            </div>

            <p className="pt-4 text-xl font-medium text-[#171717]">See you September 26. 🎬🍿</p>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section className="py-16 sm:py-20">
      <div className="fade-up rounded-[2rem] border border-[#E5E5E5] bg-[#FFFFFF] p-6 sm:p-8 lg:p-10">
        <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#737373]">Name</span>
                <input
                  value={form.name}
                  onChange={(event) => handleChange("name", event.target.value)}
                  className="w-full rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] px-4 py-3 text-base text-[#171717] outline-none transition focus:border-[#D72638]"
                  placeholder="Your name"
                />
                {errors.name ? <span className="text-sm text-[#D72638]">{errors.name}</span> : null}
              </label>

              <label className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#737373]">Email</span>
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                  className="w-full rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] px-4 py-3 text-base text-[#171717] outline-none transition focus:border-[#D72638]"
                  placeholder="you@example.com"
                />
                {errors.email ? <span className="text-sm text-[#D72638]">{errors.email}</span> : null}
              </label>
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#737373]">Dinner choice</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {dinnerOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleChange("dinnerChoice", option.id)}
                    className={`rounded-2xl border p-3 text-left transition ${
                      form.dinnerChoice === option.id
                        ? "border-[#D72638] bg-[#FFF7F7]"
                        : "border-[#E5E5E5] bg-[#FAFAF8]"
                    }`}
                  >
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#171717]">{option.label}</p>
                    {option.description ? <p className="mt-2 text-sm text-[#737373]">{option.description}</p> : null}
                  </button>
                ))}
              </div>
              {errors.dinnerChoice ? <span className="text-sm text-[#D72638]">{errors.dinnerChoice}</span> : null}
            </div>

            <div className="space-y-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#737373]">After-dinner choice(s)</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {afterDinnerOptions.map((option) => {
                  const selected = form.afterDinnerChoices.includes(option.id);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleAfterDinnerChoice(option.id)}
                      className={`flex items-center justify-between rounded-2xl border p-3 text-left transition ${
                        selected ? "border-[#D72638] bg-[#FFF7F7]" : "border-[#E5E5E5] bg-[#FAFAF8]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span>{option.emoji}</span>
                        <span className="text-sm font-medium text-[#171717]">{option.label}</span>
                      </span>
                      {selected ? <span className="text-[#D72638]">✓</span> : null}
                    </button>
                  );
                })}
              </div>
            </div>

            <label className="space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#737373]">Anything else you&apos;d like to add</span>
              <textarea
                value={form.notes}
                onChange={(event) => handleChange("notes", event.target.value)}
                rows={4}
                className="w-full rounded-2xl border border-[#E5E5E5] bg-[#FAFAF8] px-4 py-3 text-base text-[#171717] outline-none transition focus:border-[#D72638]"
                placeholder="Optional note"
              />
            </label>

            <div className="flex justify-end pt-2">
              <Button type="submit" className="h-12 px-6 text-sm uppercase tracking-[0.18em]">
                Submit
              </Button>
            </div>
        </form>
      </div>
    </Section>
  );
}
