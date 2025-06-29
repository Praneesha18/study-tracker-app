import { fetchUserSubjectsController } from "@/backend/controllers/userprogress/userSubjectsController";
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
   return fetchUserSubjectsController(req);
}