import { column, defineDb, defineTable } from 'astro:db';

const Bookmark = defineTable({
  columns: {
    id: column.number({ primaryKey: true}),
    title: column.text(),
    author: column.text(),
    url: column.text(),
    dateAdded: column.date(),
    comments: column.text()
  }
})

export default defineDb({
  tables: { Bookmark }
});
