import { authLoginController } from "@/backend/controllers/auth/authController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
   return authLoginController(req);
}
