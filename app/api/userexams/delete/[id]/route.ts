
import { deleteExamController } from "@/backend/controllers/userprogress/userExamsController";
import { NextRequest } from "next/server";


export async function PATCH(
  req: NextRequest,
 { params }: { params: Promise<{ id: string }> }
) {
   const id = (await params).id; 
  return deleteExamController(req,id)
}
