

import { patchUserExamController } from "@/backend/controllers/userprogress/userExamsController";
import { NextRequest } from "next/server";



export async function PATCH(req: NextRequest) {
  return patchUserExamController(req);
}
