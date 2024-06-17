import type { CreateUserFormFields } from "../models/userModel";
import sql from "../utils/dbConnection";
import { Languages } from "../utils/enums";

export async function createUser(fields: CreateUserFormFields) {
  let result = false;

  if (!fields) {
    return result;
  }

  try {
    const existingUser =
      await sql`SELECT id FROM users WHERE email = ${fields.email}`;
    if (existingUser.length > 0) {
      throw new Error("User already exists");
    }
    await sql`INSERT INTO users (email, role, language_code, created_at, last_accessed) VALUES (${fields.email}, ${fields.role}, ${Languages.Default}, NOW(), NOW())`;
    result = true;
  } catch (e) {
    console.error(e);
  }

  return result;
}

export async function readUserWithEmail(email: string) {
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    const users =
      await sql`SELECT email FROM users WHERE email = ${email.toLowerCase()}`;
    if (users.length === 0) {
      throw new Error("User not found");
    }
    return users[0] as { email: string };
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function updateUserLastAccessed(email: string) {
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    await sql`UPDATE users SET last_accessed = NOW() WHERE email = ${email.toLowerCase()}`;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function readLanguageFromUser(email: string) {
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    const users = await sql`SELECT language_code, name FROM users AS u
      INNER JOIN language AS l ON l.code = u.language_code 
      WHERE u.email = ${email.toLowerCase()}`;
    if (users.length === 0) {
      throw new Error("User not found");
    }
    return users[0] as { language_code: string; name: string };
  } catch (e) {
    console.error(e);
    throw e;
  }
}
