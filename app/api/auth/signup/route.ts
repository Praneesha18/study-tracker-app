import { authSignupController } from "@/backend/controllers/auth/authController";
import { NextRequest, NextResponse } from "next/server";
import { CgHello } from "react-icons/cg";

export async function POST(req: NextRequest) {
  return authSignupController(req);
}


