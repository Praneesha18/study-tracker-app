import { fetchUserExamsController } from "@/backend/controllers/userprogress/userExamsController";
import { NextRequest } from "next/server";

export async function GET(req:NextRequest){
    return fetchUserExamsController(req)
}