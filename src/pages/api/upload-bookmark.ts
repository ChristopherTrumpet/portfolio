export const prerender = false;

import type { APIRoute } from "astro";
import { Bookmark, db } from "astro:db";

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();
    const bodyArray = Array.isArray(body) ? body : [body];

    const bookmarksToInsert = bodyArray.map((item: any) => ({
      ...item,
      dateAdded: new Date(),
    }));

    await db.insert(Bookmark).values(bookmarksToInsert);
    return new Response(
      JSON.stringify({
        message: "Bookmark received",
      }),
      {
        status: 200,
      },
    );
  }

  return new Response(
    JSON.stringify({
      message: "Invalid content type",
    }),
    { status: 400 },
  );
};
