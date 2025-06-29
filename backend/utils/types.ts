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

export type  UserSubjectSchema={
  subject_Id:string;
  name:string;
  topics:Topic[];
  subjectLevel:Number
}

export type UserSubjects={
   user_Id:string,
   userSubjects:UserSubjectSchema[]
}