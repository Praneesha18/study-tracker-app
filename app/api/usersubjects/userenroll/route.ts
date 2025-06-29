import { addUsersFirstSubject, patchUserSubjectController } from "@/backend/controllers/userprogress/userSubjectsController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return addUsersFirstSubject(req);
}

export async function PATCH(req: NextRequest) {
  return patchUserSubjectController(req);
}
