import { Subject } from "../models/SubjectandTopic";
import { UserSubjects } from "../models/UserSubjects"



export async function enrollUserInSubject(userId: string, subjectData: any) {
  return await UserSubjects.updateOne(
    { user_Id: userId },
    {
      $push: {
        userSubjects: subjectData
      }
    },
    { upsert: true }
  );
}

// optional: get userSubjects by userId (you probably already have this)
export async function getUserSubjectsbyId(userId: string) {
  return await UserSubjects.findOne({ user_Id: userId });
}

export async function patchUserSubject(userId:string,subId:string){
  const subject=await Subject.findOne({_id:subId})
  if(!subject){
    return "subject not found"
  }
 
     const topicProgress = subject.topics.map((topic: any) => ({
      title: topic.title,
      description: topic.description,
      progress: false
    }));

    const subjectData = {
      subject_Id: subId,
      name: subject.name,
      topics: topicProgress
    };

    const result=await UserSubjects.updateOne(
      {user_Id:userId},
      {$push:{userSubjects:subjectData}}
    )

    return result;


}


export async function postUser(userId:string,subId:string) {
  const subject=await Subject.findOne({_id:subId})
    if (!subject) {
        return "Subject not found"
    }

       const topicProgress = subject.topics.map((topic: any) => ({
      title: topic.title,
      description: topic.description,
      progress: false
    }));
       const subjectData = {
      subject_Id: subId,
      name: subject.name,
      topics: topicProgress
    };
    const usersubjects=await UserSubjects.create({
      user_Id: userId,
      userSubjects:[subjectData]

    })
    return usersubjects;

}