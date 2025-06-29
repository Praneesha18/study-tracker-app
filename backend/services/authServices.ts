import { NextApiRequest } from "next";
import User from "../models/User";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/helpers";
import { NextRequest } from "next/server";

export const validateUserCredentials = async (
  name: string,
  email: string,
  password: string,
  age: number,
  yearofstudy: string,
  cpassword: string
): Promise<true | { [key: string]: string }> => {
  let errors: { [key: string]: string } = {};

  const accountExists = await User.findOne({ email });

  if (!email || !password || !age || !yearofstudy || !name || !cpassword) {
    errors = { ...errors, allrequired: "all fields are required" };
  }
  if (!validateName(name)) {
    errors = { ...errors, name: "Invalid Name" };
  }
  if (!validateEmail(email)) {
    errors = { ...errors, email: "Invalid email" };
  }
  if (accountExists) {
    errors = {
      ...errors,
      doesaccountexists: "An account with this email already exits",
    };
  }
  if (!validatePassword(password)) {
    errors = { ...errors, password: "Password must have 8+ characters, a number, and a special symbol" };
  }
  if (age < 0 || age > 100) {
    errors = { ...errors, age: "age is invalid" };
  }
  if (password !== cpassword) {
    errors = { ...errors, comparePassword: "Passwords do not match" };
  }

  return Object.keys(errors).length === 0 ? true : errors;
};

export const ValidateUserLogin = async (
  email: string,
  password: string
): Promise<
  | { errors: { [key: string]: string } }
  | { user: typeof User.prototype; isMatch: true }
> => {
  const errors: { [key: string]: string } = {};

  if (!email || !password) {
    errors.allfields = "please enter email and password";
    return { errors };
  }
    const user = await User.findOne({ email });
  if (!user) {
    errors.email = "No account found with this email. Please sign up first.";
    return { errors };
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    errors.password = "Incorrect password. Please try again.";
    return { errors };
  }

  return { user, isMatch: true };
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  age: number,
  yearofstudy: string
) => {
  const user = await User.create({
    name,
    email,
    password,
    age,
    yearofstudy,
  });
  return user;
};
