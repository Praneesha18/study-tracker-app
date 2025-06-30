"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";


interface SignupForm {
  name: string;
  email: string;
  age: number|string;
  yearofstudy: string;
  password: string;
  comparePassword: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showComparePassword, setShowComparePassword] = useState(false);

  const [errormsg, setErrormsg] = useState<{ [key: string]: string }>({});
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    age:"",
    yearofstudy: "",
    password: "",
    comparePassword: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
     setErrormsg({})
    try {
      const response = await axios.post("/api/auth/signup", form);
      console.log("Signup successful:", response.data);
      setErrormsg({});
      setForm({
        name: "",
        email: "",
        age: 21,
        yearofstudy: "",
        password: "",
        comparePassword: "",
      });
     window.location.href = '/'; 
    } catch (err: any) {
      console.error("Signup error:", err?.response?.data || err.message);
      setErrormsg(err?.response?.data?.error || {});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-secondary mb-6">
          Sign Up
        </h2>

        {errormsg.allrequired && (
          <div className="text-error text-sm mb-2 text-center">
            {errormsg.allrequired}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-secondary mb-1"
            >
             * Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={form.name}
              onChange={handleChange}
            />
            {errormsg.name && (
              <div className="text-error text-sm">{errormsg.name}</div>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-secondary mb-1"
            >
             * Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={form.email}
              onChange={handleChange}
            />
            {errormsg.email && (
              <div className="text-error text-sm">{errormsg.email}</div>
            )}
            {errormsg.doesaccountexists && (
              <div className="text-error text-sm">
                {errormsg.doesaccountexists}
              </div>
            )}
          </div>

          {/* Age */}
          <div>
            <label
              htmlFor="age"
              className="block text-sm font-medium text-secondary mb-1"
            >
             * Age
            </label>
            <input
              type="number"
              name="age"
              placeholder="Enter your age"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={form.age}
              onChange={handleChange}
            />
            {errormsg.age && (
              <div className="text-error text-sm">{errormsg.age}</div>
            )}
          </div>

          {/* Year of Study */}
          <div>
            <label
              htmlFor="yearofstudy"
              className="block text-sm font-medium text-secondary mb-1"
            >
             * Year of Study
            </label>
            <select
  name="yearofstudy"
  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
  value={form.yearofstudy}
  onChange={handleChange}
>
  <option value="" disabled>
    Select your year
  </option>
  <option value="1">1st Year</option>
  <option value="2">2nd Year</option>
  <option value="3">3rd Year</option>
  <option value="4">4th Year</option>
</select>
            {errormsg.yearofstudy && (
              <div className="text-error text-sm">{errormsg.yearofstudy}</div>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-secondary mb-1"
            >
             * Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
                value={form.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2  cursor-pointer transform -translate-y-1/2 text-sm text-gray-500"
              >
                {showPassword ?  <Eye size={16} />:<EyeOff size={16} /> }
              </button>
            </div>
            {errormsg.password && (
              <div className="text-error text-sm">{errormsg.password}</div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="comparePassword"
              className="block text-sm font-medium text-secondary mb-1"
            >
             * Confirm Password
            </label>
            <div className="relative">
              <input
                type={showComparePassword ? "text" : "password"}
                name="comparePassword"
                placeholder="Re-enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md pr-10"
                value={form.comparePassword}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowComparePassword(!showComparePassword)}
                className="absolute right-2 top-1/2 cursor-pointer transform -translate-y-1/2 text-sm text-gray-500"
              >
                  {showComparePassword ? <Eye size={16} />:<EyeOff size={16} />}
              </button>
            </div>
            {errormsg.comparePassword && (
              <div className="text-error text-sm">
                {errormsg.comparePassword}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--secondary)] cursor-pointer text-white py-2 rounded-md font-semibold hover:bg-[var(--primary)] transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[var(--primary)] font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
