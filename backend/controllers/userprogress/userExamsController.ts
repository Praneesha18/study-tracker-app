// /backend/controllers/userprogress/userExamsController.ts
import { getSession } from "@/app/lib/session";
import connectToDB from "@/backend/lib/connectToDB";
import { UserExams } from "@/backend/models/UserExams";
import mongoose from "mongoose";
import { validateExamForm } from "@/backend/services/userexams";
import { getUserExams, patchUserExam } from "@/backend/services/userexams";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/backend/utils/helpers";
import { NextRequest } from "next/server";

export const patchUserExamController = async (req: NextRequest) => {
  try {
    await connectToDB();

    const session = await getSession();
    if (!session?.user?._id) {
      return sendErrorResponse("User not logged in", "Unauthorized", {});
    }

    const examData = await req.json();
    const validation=await validateExamForm(examData)
    if(validation!==true){
        return sendErrorResponse("exam data is invalid",validation)
    }

    // Pass userId and examData to the service
    const userExamsPatch = await patchUserExam(session.user._id, examData);

    return sendSuccessResponse("Patched user exams successfully", {
      userExamsPatch,
    });
  } catch (err: any) {
    console.error("Error in patchUserExamController:", err);
    return sendErrorResponse(
      "Internal server error from patching user exams",
      "Error",
      {}
    );
  }
};
export const deleteExamController = async (req: NextRequest, id: string) => {
  try {
    await connectToDB();

    const session = await getSession();
    if (!session?.user?._id) {
      return sendErrorResponse("User not logged in", "Unauthorized", {});
    }

    // Get the user exams document
    const userExamsDoc = await getUserExams(session.user._id);
    if (!userExamsDoc) {
      return sendErrorResponse("No exams found for user", "Not Found", {});
    }

    // Remove the exam by its _id inside the array
    await UserExams.updateOne(
      { userId: session.user._id },
      { $pull: { userExams: { _id: new mongoose.Types.ObjectId(id) } } }
    );

    return sendSuccessResponse("Exam deleted successfully", {});
  } catch (err: any) {
    console.error("Error deleting exam:", err);
    return sendErrorResponse("Error deleting exam", "error", {});
  }
};
// Fetch user's exams
export const fetchUserExamsController = async (req: NextRequest) => {
  try {
    await connectToDB();

    const session = await getSession();
    if (!session?.user?._id) {
      return sendErrorResponse("User not logged in", "Unauthorized", {});
    }

    const userExams = await getUserExams(session.user._id);

    if (!userExams) {
      return sendSuccessResponse("First time for user", { userExams });
    }

    return sendSuccessResponse("Fetched user exams successfully", {
      userExams,
    });
  } catch (error) {
    return sendErrorResponse(
      "Internal server error from fetching user exams",
      "Error",
      {}
    );
  }
};

export const updateExamController = async (
  req: NextRequest,
  examId: string
) => {
  try {
    await connectToDB();
    const session = await getSession();
    if (!session?.user?._id) {
      return sendErrorResponse("User not logged in", "Unauthorized", {});
    }

    const examData = await req.json();
    const validation=await validateExamForm(examData)
    if(validation!==true){
        return sendErrorResponse("exam data is invalid",validation)
    }

    // Update the nested exam inside userExams array
    await UserExams.updateOne(
      {
        userId: session.user._id,
        "userExams._id": new mongoose.Types.ObjectId(examId),
      },
      {
        $set: {
          "userExams.$.name": examData.name,
          "userExams.$.subject": examData.subject,
          "userExams.$.status": examData.status,
          "userExams.$.date": examData.date,
          "userExams.$.marksscored": examData.marksscored,
          "userExams.$.totalmarks": examData.totalmarks,
          "userExams.$.reminder": examData.reminder,
          "userExams.$.notes": examData.notes,
        },
      }
    );

    return sendSuccessResponse("Exam updated successfully", {});
  } catch (err: any) {
    console.error("Update exam error:", err);
    return sendErrorResponse("Failed to update exam", "error", {});
  }
};
