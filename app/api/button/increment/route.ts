import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const sql = neon(process.env.DATABASE_URL!);

  // Increment the count and return the new value
  const result = await sql`
    UPDATE bento_button 
    SET count = count + 1 
    RETURNING count
  `;

  return NextResponse.json(result[0].count, {
    headers: {
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
}
