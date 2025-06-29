import mongoose from "mongoose";

export interface ITopicSchema extends mongoose.Document {
  title: string;
  description: string;
  progress: boolean;
}

export interface ISubjectSchema extends mongoose.Document {
  name: string;
  topics: ITopicSchema[];
  imageurl:string
}

const TopicSchema = new mongoose.Schema({
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
});

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  imageurl:{
    type:String,
  },
  topics: [TopicSchema],
});

export const Subject =
  mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
