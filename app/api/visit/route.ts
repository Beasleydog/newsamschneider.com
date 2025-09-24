import { NextResponse } from "next/server";

type VisitEvent =
  | {
      type: "start";
      visitId: string;
      referer?: string | null;
      userAgent?: string | null;
      ts: number;
    }
  | {
      type: "end";
      visitId: string;
      durationMs: number;
      ts: number;
    };

async function postToDiscord(content: string) {
  const webhook = process.env.DISCORD_WEBHOOK;
  if (!webhook) {
    return;
  }
  try {
    await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
      // Avoid Next cached fetch behavior for webhooks
      cache: "no-store",
    });
  } catch {
    // Silently ignore to avoid impacting user experience
  }
}

export async function POST(req: Request) {
  try {
    const evt = (await req.json()) as VisitEvent;

    if (evt.type === "start") {
      const message = [
        `👋 Visit start`,
        `visitId: ${evt.visitId}`,
        evt.referer ? `referer: ${evt.referer}` : "referer: (none)",
        evt.userAgent ? `ua: ${evt.userAgent}` : undefined,
      ]
        .filter(Boolean)
        .join(" | ");

      await postToDiscord(message);
    } else if (evt.type === "end") {
      const message = `👋 Visit end | visitId: ${
        evt.visitId
      } | duration: ${Math.round(evt.durationMs / 1000)}s`;
      await postToDiscord(message);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
