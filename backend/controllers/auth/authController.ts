import { NextRequest } from "next/server";
import {
  sendSuccessCreatedResponse,
  sendErrorResponse,
  sendSuccessResponse,
  sendSuccessNoContentResponse,
} from "@/backend/utils/helpers";
import {
  validateUserCredentials,
  createUser,
  ValidateUserLogin,
} from "@/backend/services/authServices";
import connectToDB from "@/backend/lib/connectToDB";
import { getSession } from "@/app/lib/session";
import User from "@/backend/models/User";

connectToDB();
export const authSignupController = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { name, email, password, age, yearofstudy, comparePassword } = body;

    const validation = await validateUserCredentials(
      name,
      email,
      password,
      parseInt(age),
      yearofstudy,
      comparePassword
    );

    if (validation !== true) {
      return sendErrorResponse("Validation failed", validation);
    }

    await createUser(name, email, password, parseInt(age), yearofstudy);
    const user = await User.findOne({ email });

    if (!user) {
      return sendErrorResponse(
        "Something went wrong",
        {}
      );
    }

    const session = await getSession();
    session.user = {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
    await session.save();

    return sendSuccessCreatedResponse("User created successfully");
  } catch (error) {
    return sendErrorResponse("Something went wrong", "Internal Server Error");
  }
};

export const authLoginController = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    const result = await ValidateUserLogin(email, password);

    // Check if result contains errors
    if ("errors" in result) {
      return sendErrorResponse("Validation failed", result.errors);
    }

    // If valid, create session
    const session = await getSession();
    session.user = {
      _id: result.user._id.toString(),
      name: result.user.name,
      email: result.user.email,
    };
    await session.save();

    return sendSuccessResponse("Login successful", {
      email: result.user.email,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return sendErrorResponse("Something went wrong", "Internal Server Error");
  }
};

export const authLogoutController=async(req:NextRequest)=>{
  try{
      const session = await getSession();
    session.destroy();
    return sendSuccessNoContentResponse()
  }catch(error){
    return sendErrorResponse("something went wront","Unable to logout")
  }
    
    
    
}
