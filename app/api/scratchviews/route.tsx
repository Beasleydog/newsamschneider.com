import { NextResponse } from "next/server";
export async function GET(request: Request) {
  let totalViews = 0;
  let offset = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://api.scratch.mit.edu/users/beasleydog/projects?offset=${offset}&limit=20`
    );
    const projects = await response.json();

    if (projects.length < 20) {
      hasMore = false;
    }

    totalViews += projects.reduce((sum: number, project: any) => {
      return sum + project.stats.views;
    }, 0);

    offset += 20;
  }

  return NextResponse.json({ views: totalViews });
}
