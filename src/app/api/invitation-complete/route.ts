import { Resend } from "resend";

import { dinnerOptions, eventDetails } from "@/src/data/invitation";

const NOTIFICATION_EMAIL = "battungpaulo@gmail.com";
const MAX_PREFERENCE_LENGTH = 200;

type CompletionPayload = {
  dinner?: {
    optionId?: unknown;
    optionLabel?: unknown;
    preference?: unknown;
  };
  date?: unknown;
  location?: unknown;
  time?: unknown;
  movieTitle?: unknown;
  seats?: unknown;
  peopleCount?: unknown;
  ticketStatus?: unknown;
  idempotencyKey?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isValidString(value: unknown, expected: string): value is string {
  return value === expected;
}

function isValidSeats(value: unknown): value is string[] {
  return (
    Array.isArray(value) &&
    value.length === eventDetails.seats.length &&
    value.every((seat, index) => seat === eventDetails.seats[index])
  );
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !sender) {
    return Response.json({ error: "Email service is not configured." }, { status: 503 });
  }

  let payload: CompletionPayload;

  try {
    const body: unknown = await request.json();
    if (!isRecord(body)) {
      return Response.json({ error: "Invalid invitation payload." }, { status: 400 });
    }
    payload = body as CompletionPayload;
  } catch {
    return Response.json({ error: "Invalid invitation payload." }, { status: 400 });
  }

  const dinner = isRecord(payload.dinner) ? payload.dinner : null;
  const optionId = typeof dinner?.optionId === "string" ? dinner.optionId : null;
  const selectedOption = dinnerOptions.find((option) => option.id === optionId);
  const preference = typeof dinner?.preference === "string" ? dinner.preference.trim() : "";
  const optionLabel = typeof dinner?.optionLabel === "string" ? dinner.optionLabel : null;
  const idempotencyKey = typeof payload.idempotencyKey === "string" ? payload.idempotencyKey : undefined;

  if (
    !selectedOption ||
    optionLabel !== selectedOption.label ||
    (selectedOption.id === "other" && (preference.length === 0 || preference.length > MAX_PREFERENCE_LENGTH)) ||
    (selectedOption.id !== "other" && preference.length > 0) ||
    !isValidString(payload.date, eventDetails.date) ||
    !isValidString(payload.location, eventDetails.location) ||
    !isValidString(payload.time, eventDetails.time) ||
    !isValidString(payload.movieTitle, eventDetails.movieTitle) ||
    !isValidSeats(payload.seats) ||
    payload.peopleCount !== eventDetails.peopleCount ||
    !isValidString(payload.ticketStatus, eventDetails.ticketsStatus) ||
    (idempotencyKey !== undefined && (idempotencyKey.length === 0 || idempotencyKey.length > 256))
  ) {
    return Response.json({ error: "Invalid invitation payload." }, { status: 400 });
  }

  const dinnerLine = escapeHtml(selectedOption.label);
  const preferenceLine = selectedOption.id === "other" ? `\nPreference: ${escapeHtml(preference)}` : "";
  const text = [
    "Invitation completed.",
    "",
    `Date: ${eventDetails.date}`,
    `Location: ${eventDetails.location}`,
    `Time: ${eventDetails.time}`,
    `Movie: ${eventDetails.movieTitle}`,
    `Seats: ${eventDetails.seats.join(" · ")}`,
    `People: ${eventDetails.peopleCount}`,
    `Dinner: ${selectedOption.label}${selectedOption.id === "other" ? `\nPreference: ${preference}` : ""}`,
  ].join("\n");

  const html = [
    "<p>Invitation completed.</p>",
    `<p>Date: ${escapeHtml(eventDetails.date)}<br>Location: ${escapeHtml(eventDetails.location)}<br>Time: ${escapeHtml(eventDetails.time)}<br>Movie: ${escapeHtml(eventDetails.movieTitle)}<br>Seats: ${escapeHtml(eventDetails.seats.join(" · "))}<br>People: ${eventDetails.peopleCount}<br>Dinner: ${dinnerLine}${preferenceLine}</p>`,
  ].join("");

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: sender,
      to: [NOTIFICATION_EMAIL],
      subject: `Invitation Completed — ${eventDetails.date}`,
      text,
      html,
      ...(idempotencyKey ? { idempotencyKey } : {}),
    });

    if (error) {
      console.error("Invitation completion email failed", error);
      return Response.json({ error: "Email service failed to send the notification." }, { status: 502 });
    }

    return Response.json({ ok: true, id: data?.id });
  } catch (error) {
    console.error("Invitation completion email request failed", error);
    return Response.json({ error: "Email service is unavailable." }, { status: 502 });
  }
}
