import { NextResponse } from "next/server";

export const sendSuccessResponse = (message: string, data?: any) => {
  return NextResponse.json({ message, ...(data || {}) }, { status: 200 });
};

export const sendSuccessCreatedResponse = (message:string, data?: any) => {
  return NextResponse.json({ message, ...(data || {}) }, { status: 201 });
};

export const sendSuccessNoContentResponse = () => {
  return new NextResponse(null, { status: 204 });
};

export const sendErrorResponse = (
  message: string,
  error: { [key: string]: string } | string,
  data?: any
) => {
  return NextResponse.json({ message, error, ...(data || {}) }, { status: 400 });
};

export const sendErrorUnauthorizedResponse = (error?: string) => {
  return NextResponse.json({ message: "Unauthorized", error: error || "Not logged in" }, { status: 401 });
};






export const validateEmail=(email:string)=>{
    const regex=new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    return regex.test(email)
}

export const validatePassword=(password:string)=>{
  const regex=new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);
   return regex.test(password)
}

export const validateName=(name:string)=>{
    const regex=new RegExp(/^[A-Za-z]+$/);
    return regex.test(name);
}