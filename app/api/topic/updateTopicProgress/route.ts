
import { patchTopicController } from "@/backend/controllers/userprogress/userTopicController";
import { NextRequest } from "next/server";
export async function PATCH(req: NextRequest) {
  return patchTopicController(req);
}