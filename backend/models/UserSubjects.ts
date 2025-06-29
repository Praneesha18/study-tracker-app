import mongoose, { mongo } from "mongoose";
import { ISubjectSchema } from "./SubjectandTopic";

export interface IUserTopicProgress {
  _id:mongoose.Types.ObjectId;
  title: string;
  description: string;
  progress: boolean;
}

export interface IUserSubject {
  subject_id: mongoose.Types.ObjectId;
  name: string;
  subjectLevel:string,
  topics: IUserTopicProgress[];
}

export interface IUserSubjectsAndProgressSchema extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  userSubjects: IUserSubject[];
}


const TopicProgressSchema = new mongoose.Schema({
  _id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,

  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  progress: {
    type: Boolean,
    default: false,
  },

} , { _id: false });

const UserSubjectSchema = new mongoose.Schema({
  subject_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  topics: [TopicProgressSchema],
  subjectLevel: { type: Number, default: 0 },
});

const userSubjectsandProgressSchema = new mongoose.Schema({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },
  userSubjects: [UserSubjectSchema],
});

export const UserSubjects =
  mongoose.models.UserSubjects ||
  mongoose.model<IUserSubjectsAndProgressSchema>("UserSubjects", userSubjectsandProgressSchema);
