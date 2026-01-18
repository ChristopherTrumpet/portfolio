export const prerender = false;

import type { APIRoute } from "astro";
import fs from "fs";

export const POST: APIRoute = async ({request}) => {
    if (request.headers.get("Content-Type") === "application/json") {
        const body = await request.json();
        console.log("Received bookmark:", body);

        const bookmarks = fs.readFileSync('./src/data/bookmarks.json', 'utf-8');
        const bookmarksJson = JSON.parse(bookmarks);
        bookmarksJson.push(body);

        fs.writeFileSync('./src/data/bookmarks.json', JSON.stringify(bookmarksJson), 'utf-8');

        return new Response(
            JSON.stringify({
                message: "Bookmark received",
            }),
            {
                status: 200,
            }
        )
    }

    return new Response(
        JSON.stringify({
            message: "Invalid content type",
        }),
        {status: 400}
    );
}