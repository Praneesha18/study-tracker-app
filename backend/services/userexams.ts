// /backend/services/userExams.ts
import mongoose from "mongoose";
import { UserExams } from "../models/UserExams";


export const patchUserExam = async (userId: string, examData: any) => {
  const newExam = {
    _id: new mongoose.Types.ObjectId(),
    name: examData.name,
    subject: examData.subject,
    status: examData.status,
    date: examData.date,
    marksscored: examData.marksscored ?? null,
    totalmarks: examData.totalmarks ?? null,
    reminder: examData.reminder ?? null,
    notes: examData.notes ?? null,
  };

  const updatedUserExams = await UserExams.findOneAndUpdate(
    { userId },
    { $push: { userExams: newExam } },
    { new: true, upsert: true }
  );

  return updatedUserExams;
};

export const getUserExams=async(user_Id:string)=>{
    return await UserExams.findOne({ userId: user_Id });
}


export const validateExamForm = async (
  form: {
    name: string;
    subject: string;
    status: "Upcoming" | "Finished";
    date: string;
    marksscored: string;
    totalmarks: string;
    notes: string;
  }
): Promise<true | { [key: string]: string }> => {
  let errors: { [key: string]: string } = {};

  const { name, subject, status, date, marksscored, totalmarks } = form;

  if (!name || !subject || !status) {
    errors.allrequired = "All fields are required.";
  }

  // Validate exam name
  if (name.trim().length < 2) {
    errors.examName = "Exam name is too short.";
  }

  // Validate subject
  if (subject.trim().length < 2) {
    errors.subject = "Subject name is too short.";
  }

  if (status === "Upcoming") {
    if (!date) {
      errors.dateOfCommencement = "Date is required for upcoming exams.";
    } else {
      const examDate = new Date(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // remove time part

      if (examDate < today) {
        errors.date = "Date must be today or in the future.";
      }
    }
  }

  if (status === "Finished") {
    const marks = Number(marksscored);
    const total = Number(totalmarks);

    if (isNaN(marks) || isNaN(total)) {
      errors.marks = "Marks must be numbers.";
    } else {
      if (marks < 0 || total <= 0) {
        errors.marks = "Marks must be valid positive numbers.";
      }
      if (marks > total) {
        errors.marks = "Marks scored cannot exceed total marks.";
      }
    }
  }

  return Object.keys(errors).length === 0 ? true : errors;
};

