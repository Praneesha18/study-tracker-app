import React from "react";
import { FaBookOpen, FaChartLine, FaSmileBeam } from "react-icons/fa";
import Webnav from "./components/Webnav";
import Button from "./components/button";
import SubjectSection from "./components/subjects";
import Link from "next/link";

export default function Home() {
  return (
    <main>


      {/* Hero Section */}
      <section className="text-white py-20  px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Study Tracker
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Organize your learning, track your progress, and stay focused on your
          goals.
        </p>
        <Link href="#subjects">
          <Button text="Get Started" />
        </Link>
      </section>

      {/* About Section */}
      <section className="py-15 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2  items-center">
          {/* Left Side (Text) */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="text-primary">Study Tracker?</span>
            </h2>
            <p className="text-lg mb-4 text-justify leading-relaxed">
              <span className="font-semibold text-[var(--secondary)]">
                Study Tracker
              </span>{" "}
              is your intelligent academic partner designed to help you stay
              consistent, track your goals, and develop effective learning
              habits — whether you're preparing for an exam, learning a new
              skill, or just trying to manage your time better.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-6">
              <li>🎯 Stay focused with visual progress tracking</li>
              <li>📅 Organize subjects, topics, and schedules easily</li>
            </ul>
            <blockquote className="italic  border-l-4 border-secondary pl-4">
              "It’s like having a personal study coach that never lets you fall
              behind."
            </blockquote>
          </div>
          {/* Right Side (Image or Illustration) */}
          <div className="flex justify-center">
            <img
              src="/study.png"
              alt="Study Illustration"
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-15 px-6  ">
        <h2 className="text-3xl text-center mb-12">How It Works</h2>
        <div className="max-w-6xl mx-auto grid gap-5 md:grid-cols-3 text-white">
          <div className="bg-secondary shadow-lg rounded-sm p-10 px-6 text-center">
            <div className="text-white text-4xl mb-4 flex justify-center">
              <FaBookOpen />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Add Subjects</h3>
            <p>Start by adding your subjects or topics you want to track.</p>
          </div>
          <div className="bg-secondary text-white shadow-lg rounded-lg  p-10 px-6  text-center">
            <div className=" text-4xl mb-4 flex justify-center">
              <FaChartLine />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Track Progress</h3>
            <p>Mark topics as complete and visualize your learning journey.</p>
          </div>
          <div className="bg-secondary shadow-lg rounded-lg  p-10 px-6  text-center text-white">
            <div className=" text-4xl mb-4 flex justify-center">
              <FaSmileBeam />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Stay Motivated</h3>
            <p>Set goals, get reminders, and celebrate your study streaks!</p>
          </div>
        </div>
      </section>
      <section id='subjects'><SubjectSection/></section>
    </main>
  );
}
