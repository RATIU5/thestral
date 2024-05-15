import sql from "../utils/dbConnection";

export async function createLanguage({
  name,
  code,
}: {
  name: string;
  code: string;
}) {
  let result = false;

  try {
    const existingLanguages =
      await sql`SELECT id FROM language WHERE code = ${code}`;
    if (existingLanguages.length > 0) {
      throw new Error("Language already exists");
    }
    await sql`INSERT INTO language (name, code) VALUES (${name}, ${code})`;
    result = true;
  } catch (e) {
    console.error(e);
  }

  return result;
}

export async function readLanguages() {
  try {
    return (await sql`SELECT name, code FROM language`) as {
      name: string;
      code: string;
    }[];
  } catch (e) {
    console.error(e);
  }
  return [];
}

export async function readLanguageByCode({ code }: { code: string }) {
  try {
    const languages = await sql`SELECT name FROM language WHERE code = ${code}`;
    if (languages.length === 0) {
      throw new Error("Language not found");
    }
    return languages[0] as { name: string };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function readUsersPreferredLanguage({ email }: { email: string }) {
  try {
    const res =
      await sql`SELECT language_code FROM users WHERE email = ${email}`;
    if (res.length === 0) {
      throw new Error("User not found");
    }
    return res[0].language_code as string;
  } catch (e) {
    console.error(e);
    return null;
  }
}
