import { getSubjectByIdController } from "@/backend/controllers/subjects/subjectController";
import { NextRequest } from "next/server";

// /app/api/subjects/getOne/[id]/route.ts
export async function GET(
  req: NextRequest,
  {params}: { params: { id: string } }
) {
  return getSubjectByIdController(req, params.id);
}
