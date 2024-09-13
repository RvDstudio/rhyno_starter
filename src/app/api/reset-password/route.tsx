import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const { email, newPassword } = await req.json();

  // Hash the new password
  const hashedPassword = await hash(newPassword, 12);

  // Update the user's password in the database
  const result = await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.email, email));

  if (result.rowCount === 0) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Password reset successfully" });
}
