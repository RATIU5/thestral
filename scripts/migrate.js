import postgres from "postgres";
import dotnev from "dotenv";
import path from "path";
import { existsSync } from "fs";

dotnev.config();

async function init(file = "schema.sql") {
  if (!process.env.DATABASE_URI) {
    console.error("Please set the DATABASE_URI environment variable");
    return;
  }
  try {
    const filePath = path.join(process.cwd(), "migrations", file);
    if (!existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }
    const sql = postgres(process.env.DATABASE_URI);
    const result = await sql.file(filePath);
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}

init(process.argv[2]);
