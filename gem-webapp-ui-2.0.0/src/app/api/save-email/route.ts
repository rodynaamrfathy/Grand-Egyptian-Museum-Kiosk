import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// Initialize Neon client
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in .env.local");
}

const sql = neon(databaseUrl);

interface RequestBody {
  email: string;
  image_name?: string;
  card_name?: string;
  kiosk_name?: string;
  filter_name?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { email, image_name, card_name, kiosk_name, filter_name } =
      (await req.json()) as RequestBody;

    if (!email || !image_name || !card_name) {
      return NextResponse.json(
        { error: "Email, image name, and card name are required" },
        { status: 400 }
      );
    }

    // Insert into database
    const result = await sql`
      INSERT INTO email_records (email_address, image_name, card_name, kiosk_name, filter_name)
      VALUES (${email}, ${image_name}, ${card_name}, ${kiosk_name || null}, ${filter_name || null})
      RETURNING id
    `;

    console.log("Saved email record:", result);

    return NextResponse.json({ success: true, id: result[0]?.id });
  } catch (err) {
    console.error("Error saving email:", err);
    return NextResponse.json({ error: "Failed to save email" }, { status: 500 });
  }
}
