import connectToDB from "@/backend/lib/connectToDB";
import { Subject } from "@/backend/models/SubjectandTopic";
import { sendErrorResponse, sendSuccessResponse } from "@/backend/utils/helpers";
import { NextRequest, NextResponse } from "next/server";

connectToDB();
export const getSubjectsController=async(req:NextRequest)=>{
    try{
        const subjects=await Subject.find()
    return sendSuccessResponse('get subjects successfull',{subjects})
    }catch(err:any){
        return sendErrorResponse('error in fetching subjects',err,{})
    }
    
}

export const getSubjectByIdController=async(req:NextRequest,id:string)=>{
   try{
     const single_sub=await Subject.findById(id)
    return sendSuccessResponse('fetched subject with id successful',{single_sub})
   }catch(err:any){
    return sendErrorResponse('cant find the subject requested',err,{})
   }
   

}