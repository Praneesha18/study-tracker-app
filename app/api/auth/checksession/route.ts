// app/api/auth/check/route.ts
import { getSession } from "@/app/lib/session";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (session?.user) {
    return NextResponse.json({ loggedIn: true,session });
  }
  return NextResponse.json({ loggedIn: false });
}
