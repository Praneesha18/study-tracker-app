// /backend/controllers/userprogress/userSubjectsController.ts
import { getSession } from "@/app/lib/session";
import connectToDB from "@/backend/lib/connectToDB";

import {
 
  getUserSubjectsbyId,
  patchUserSubject,
  postUser,
} from "@/backend/services/userSubjects";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "@/backend/utils/helpers";
import { connect } from "http2";
import { NextRequest } from "next/server";



export const addUsersFirstSubject = async (req: NextRequest) => {
  try {
    connectToDB();

    const session = await getSession();
    if (!session?.user?._id) {
      return sendErrorResponse("User not logged in", "Unauthorized", {});
    }

    const body = await req.json();
    const { sub_Id } = body;
    const userSubjects = await postUser(session.user._id, sub_Id);
    return sendSuccessResponse(
      "added user to userSubjects schema successfully",
      { userSubjects }
    );
  } catch (err: any) {
    return sendErrorResponse("cant add user subjects", "error", {});
  }
};

export const patchUserSubjectController = async (req: NextRequest) => {
  try {
    await connectToDB();
    const session = await getSession();
    if (!session?.user?._id) {
      return sendErrorResponse("User not logged in", "Unauthorized", {});
    }
    const body = await req.json();
    const { sub_Id } = body;
    const userSubjectsPatch = await patchUserSubject(
      session.user._id,
      sub_Id
    );
    if (!userSubjectsPatch) {
      return sendSuccessResponse("first time for user", {});
    }
    return sendSuccessResponse(
      "Fetched user subjects successfully",
      {userSubjectsPatch}
    );
  } catch (err: any) {
    return sendErrorResponse(
      "Internal server error from fetching User Subjects",
      "Error",
      {}
    );
  }
};

export const fetchUserSubjectsController = async (req: NextRequest) => {
  try {
    await connectToDB();
    const session = await getSession();
    if (!session?.user?._id) {
      return sendErrorResponse("User not logged in", "Unauthorized", {});
    }

    const userSubjects = await getUserSubjectsbyId(session.user._id);
    if (!userSubjects) {
      return sendSuccessResponse("first time for user", {userSubjects});
    }
    return sendSuccessResponse(
      "Fetched user subjects successfully",
      {userSubjects}
    );
  } catch (error) {
    return sendErrorResponse(
      "Internal server error from fetching User Subjects",
      "Error",
      {}
    );
  }
};
