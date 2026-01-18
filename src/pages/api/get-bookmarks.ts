import type { APIRoute } from "astro";
import fs from "fs";

export const GET: APIRoute = async ({params, request}) => {
    const bookmarks = fs.readFileSync('./src/data/bookmarks.json', 'utf-8');
    return new Response(
        JSON.stringify({
            bookmarks: JSON.parse(bookmarks),
        })
    )
}