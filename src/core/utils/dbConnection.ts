import postgres from "postgres";

const sql = postgres(import.meta.env.DATABASE_URI);

export default sql;
