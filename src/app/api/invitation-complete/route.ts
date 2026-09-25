import { createClient } from "@supabase/supabase-js";

import { dinnerOptions } from "@/src/data/invitation";

const MAX_PREFERENCE_LENGTH = 200;

type CompletionPayload = {
    dinner?: {
        optionId?: unknown;
        preference?: unknown;
    };
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabasePublishableKey) {
        console.error("Supabase configuration is missing", {
            hasSupabaseUrl: Boolean(supabaseUrl),
            hasSupabasePublishableKey: Boolean(supabasePublishableKey),
        });
        return Response.json({ error: "Database is not configured." }, { status: 503 });
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
    const preference = typeof dinner?.preference === "string" ? dinner.preference.trim() : "";
    const selectedOption = dinnerOptions.find((option) => option.id === optionId);

    if (
        !selectedOption ||
        (selectedOption.id === "other" && (preference.length === 0 || preference.length > MAX_PREFERENCE_LENGTH)) ||
        (selectedOption.id !== "other" && preference.length > 0)
    ) {
        return Response.json({ error: "Invalid dinner selection." }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabasePublishableKey, {
        auth: {
            autoRefreshToken: false,
            detectSessionInUrl: false,
            persistSession: false,
        },
    });

    const { error } = await supabase.from("invitation_responses").insert({
        dinner_option: selectedOption.id,
        dinner_label: selectedOption.label,
        custom_preference: selectedOption.id === "other" ? preference : "",
    });

    if (error) {
        console.error("Invitation response insert failed", {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
        });
        return Response.json({ error: "Could not save the invitation response." }, { status: 500 });
    }

    return Response.json({ ok: true });
}
