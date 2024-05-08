import postgres from "postgres";

async function init(filename: string = "schema.sql") {
  if (!process.env.DATABASE_URI) {
    console.error("Please set the DATABASE_URI environment variable");
    return;
  }
  const sql = postgres(process.env.DATABASE_URI);
  const file = await sql.file(`../migrations/${filename}`);
}

init();
