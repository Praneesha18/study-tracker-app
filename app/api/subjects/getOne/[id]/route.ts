import { getSubjectByIdController } from "@/backend/controllers/subjects/subjectController";
import { NextRequest } from "next/server";

// /app/api/subjects/getOne/[id]/route.ts
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return getSubjectByIdController(req, context.params.id);
}
