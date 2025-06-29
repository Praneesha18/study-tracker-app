import { Subject } from "../models/SubjectandTopic";
import { UserSubjects } from "../models/UserSubjects";
import connectToDB from "../lib/connectToDB";


 connectToDB()


 export async function patchUserTopic(userId: string, subId: string, topicId: string, newValue: boolean) {
  if (newValue) {
    return await setTopicProgressTrue(userId, subId, topicId);
  } else {
    return await setTopicProgressFalse(userId, subId, topicId);
  }
}
// Toggle to true
export async function setTopicProgressTrue(userId: string, subId: string, topicId: string) {
    console.log(userId,subId,topicId)
  const res=await UserSubjects.updateOne(
    { user_Id: userId, "userSubjects.subject_Id": subId },
    {
      $set: { "userSubjects.$.topics.$[t].progress": true },
      $inc: { "userSubjects.$.subjectLevel": 1 }
    },
    { arrayFilters: [{ "t._id": topicId }] }
  );
  return res;
}

// Toggle to false
export async function setTopicProgressFalse(userId: string, subId: string, topicId: string) {
  const res= await UserSubjects.updateOne(
    { user_Id: userId, "userSubjects.subject_Id": subId },
    {
      $set: { "userSubjects.$.topics.$[t].progress": false },
      $inc: { "userSubjects.$.subjectLevel": -1 }
    },
    { arrayFilters: [{ "t._id": topicId }] }
  );
  return res;
}


