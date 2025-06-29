import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { unique } from "next/dist/build/utils";

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  age: number;
  yearofstudy: string;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  yearofstudy: {
    type: String,
    required: true,
  },
},{
    timestamps:true
});

UserSchema.pre('save',async function (this:IUser, next){
 const user=this
 if(!user.isModified('password')) return next();

 const addedstr=bcrypt.genSaltSync();
 const hashedpwd=bcrypt.hashSync(user.password,addedstr);
 user.password=hashedpwd;
 next();
 
});

UserSchema.methods.comparePassword=async function(password:string){
    const user=this as IUser;
    return bcrypt.compareSync(password,user.password)
};

const User=mongoose.models.User||mongoose.model<IUser>('User',UserSchema)
export default User;