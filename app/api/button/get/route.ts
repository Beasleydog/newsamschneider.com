import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const sql = neon(process.env.DATABASE_URL!);

  // Get the current count
  const result = await sql`
    SELECT count FROM bento_button LIMIT 1
  `;

  return NextResponse.json(result[0].count, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
