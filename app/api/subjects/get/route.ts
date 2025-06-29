import { getSubjectsController } from "@/backend/controllers/subjects/subjectController";
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
   return getSubjectsController(req);
}