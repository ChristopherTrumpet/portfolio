export const prerender = false;

import type { APIRoute } from "astro";
import { db, Bookmark } from "astro:db";
import { BookmarkSchema } from "../../lib/validation";

export const POST: APIRoute = async ({ request }) => {
  try {
    const authHeader = request.headers.get("Authorization");

    if (authHeader !== `Bearer ${import.meta.env.API_SECRET_KEY}`) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await request.json();
    const result = BookmarkSchema.safeParse(body);

    if (!result.success) {
      return new Response(
        JSON.stringify({
          error: "Validation failed",
          details: result.error.issues,
        }),
        { status: 400 },
      );
    }

    const { title, author, url, dateAdded, comments } = result.data;

    const insertedBookmark = await db
      .insert(Bookmark)
      .values({
        title,
        author,
        url,
        dateAdded,
        comments: comments ?? "",
      })
      .returning();

    return new Response(
      JSON.stringify({ message: "Success", data: insertedBookmark }),
      { status: 201 },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
};
