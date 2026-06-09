"use server";

import { neon } from "@neondatabase/serverless";

export async function saveSubmission(formData: FormData) {
  if (!process.env.DATABASE_URL) {
    return {
      success: false,
      error: "Server configuration missing DATABASE_URL",
    };
  }

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  try {
    const sql = neon(process.env.DATABASE_URL);

    await sql.query(
      "INSERT INTO contact_submissions (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message],
    );

    return { success: true };
  } catch (error) {
    console.error("Database Save Error:", error);
    return { success: false, error: "Could not save message." };
  }
}
