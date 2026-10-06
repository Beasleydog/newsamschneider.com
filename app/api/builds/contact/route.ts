import { NextResponse } from "next/server";

// Placeholder endpoint: validates submissions without storing or sending them.
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Please send a valid JSON inquiry." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Please complete the inquiry form." }, { status: 400 });
  }
  const { name, email, service, message } = body as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim() || name.length > 100 ||
      typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof service !== "string" || !["website", "application", "automation", "other"].includes(service) ||
      typeof message !== "string" || message.trim().length < 10 || message.length > 5000) {
    return NextResponse.json({ error: "Please include your name, a valid email, a project type, and at least 10 characters about your project." }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
