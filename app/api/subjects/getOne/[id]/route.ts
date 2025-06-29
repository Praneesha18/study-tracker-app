// app/api/subjects/getOne/[id]/route.ts
import { NextRequest } from "next/server";
import { getSubjectByIdController } from "@/backend/controllers/subjects/subjectController";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return getSubjectByIdController(req, params.id);
}
