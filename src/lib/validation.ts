import { z } from "astro:schema";

export const BookmarkSchema = z.object({
  title: z.string().min(1).max(255),
  author: z.string().min(1),
  url: z.string().url(),
  dateAdded: z.coerce.date().default(() => new Date()),
  comments: z.string().optional(),
});
