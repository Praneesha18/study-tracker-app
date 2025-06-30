import mongoose from "mongoose";


export interface IExam {
   _id: mongoose.Types.ObjectId;
  name: string;
  subject: string;
  status: 'upcoming' | 'finished';   // enum type
  totalmarks: number;
  marksscored: number;
  date: Date;
}



export interface IUserExams extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  userExams: IExam[];
}


const ExamSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      auto: true   // auto-generate ObjectId if not provided
    },
    name: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['upcoming', 'finished'],
      required: true,
    },
    totalmarks: {
      type: Number,
      default:null
    
    },
    marksscored: {
      type: Number,
      default:null
    },
    date: {
      type: Date,
      required: false,
    },
    notes:{
        type:String,
        default:""
    
    }
  },
  
);

const UserExamsSchema = new mongoose.Schema({

      
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"  
    },
    userExams: {
      type: [ExamSchema],
      default: []
    }
  

});



export const UserExams =
  mongoose.models.UserExams ||
  mongoose.model<IUserExams>("UserExams", UserExamsSchema);
