export type Topic ={
  title: string;
  description: string;
  progress: boolean;
}

export type Subjects ={
  _id:string;
  name: string;
  imageurl:string;
  topics: Topic[];
}
export type userTopic={
  _id:string,
   title: string;
  description: string;
  progress: boolean;

}
export type  UserSubjectSchema={
  subject_Id:string;
  name:string;
  topics:userTopic[];
  subjectLevel:Number
}

export type UserExams={
  _id:string;
  name:string;
  subject:string;
  date:string;
  marksscored:number;
  totalmarks:number;
  notes:string;
  status:"upcoming"|"finished"


}

export type UserSubjects={
   user_Id:string,
   userSubjects:UserSubjectSchema[]
}