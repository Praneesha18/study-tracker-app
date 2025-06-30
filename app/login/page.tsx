"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

interface Loginform {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [errormsg, setErrormsg] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
   const redirectTo = searchParams.get('redirectTo') || '/';
  const [form, setForm] = useState<Loginform>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
     setErrormsg({})
    try {
      const response = await axios.post("/api/auth/login", form);
      console.log("Login successful:", response.data);
      setForm({
        email: "",
        password: "",
      });
      window.location.href = redirectTo; 
      
       

    } catch (err: any) {
      console.error("Signup error:", err?.response?.data || err.message);
      setErrormsg(err?.response?.data?.error || {});
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-secondary mb-6">
          Login to Study Tracker
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {errormsg.allfields && (
            <div className="text-error text-sm mb-2 text-center">
              {errormsg.allfields}
            </div>
          )}
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 placeholder-gray-400"
              value={form.email}
              onChange={handleChange}
            />
            {errormsg.email && (
              <div className="text-error text-sm mb-2 text-center">
                {errormsg.email}
              </div>
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
                className="absolute cursor-pointer right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errormsg.password && (
              <div className="text-error text-sm">{errormsg.password}</div>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-[var(--secondary)] text-white py-2 rounded-md font-semibold hover:bg-[var(--primary)] transition"
          >
            Login
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-[var(--primary)] font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
