import { db, Bookmark } from 'astro:db';

export default async function seed() {
  await db.insert(Bookmark).values([
    {
      title: "I Tried Rendering Millions Of Particles", 
      author: "Acerola", 
      url: "https://www.youtube.com/watch?v=1L-x_DH3Uvg", 
      dateAdded: new Date(), 
      comments: "Interesting dive into a common computer graphics topic."
    },
  ]);
}