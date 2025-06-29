import { getSession } from "@/app/lib/session";
import connectToDB from "@/backend/lib/connectToDB";
import { patchUserTopic } from "@/backend/services/userTopics";
import { sendErrorResponse, sendSuccessResponse } from "@/backend/utils/helpers";
import { NextRequest } from "next/server";

export const patchTopicController = async (req: NextRequest) => {
  try {
    await connectToDB();

    const session = await getSession();
    if (!session?.user?._id) {
      return sendErrorResponse("User not logged in", "Unauthorized", {});
    }

    const body = await req.json();
    const { sub_Id, topic_Id, newValue } = body;

    // Validate required fields
    if (!sub_Id || !topic_Id || typeof newValue !== "boolean") {
      return sendErrorResponse("Missing or invalid parameters", "BadRequest", {});
    }

    // Call service to patch
    const updated = await patchUserTopic(
      session.user._id,
      sub_Id,
      topic_Id,
      newValue
    );

    return sendSuccessResponse(
      "Updated topic progress successfully",
      { updated }
    );
  } catch (err: any) {
    console.error("patchTopicController error:", err);
    return sendErrorResponse(
      "Internal server error in patchTopicController",
      "Error",
      {}
    );
  }
};
