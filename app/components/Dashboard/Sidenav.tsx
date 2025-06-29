"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Stats from "./stats";
import UserExams from "./userexams";
import UserSubjects from "./usersubjects";

const Sidenav = () => {
  const pathname = usePathname();
  const [selectedTab, setSelectedTab] = useState<string | null>(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navItems = [
    { label: "View Stats", component: <Stats />, icon: "📈" },
    { label: "Your Subjects", component: <UserSubjects />, icon: "📚" },
    { label: "Your Exams", component: <UserExams />, icon: "📝" },
  ];

  const selectedComponent =
    navItems.find((item) => item.label === selectedTab)?.component || <Stats />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Nav Toggle */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 bg-secondary text-white">
        <h1 className="text-xl font-bold">📘 Study Tracker</h1>
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className="text-2xl"
        >
          {isMobileNavOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isMobileNavOpen ? "block" : "hidden"
        } md:block w-full md:w-64 bg-secondary text-white border-r border-gray-200 shadow-sm p-6 space-y-6 sticky top-0 h-screen z-50`}
      >
        <h2 className="text-2xl font-bold hidden md:block">Study Tracker</h2>
        <nav className="space-y-2">
          <Link
            href="/"
            className={`flex items-center cursor-pointer gap-3 px-3 py-2 rounded-lg text-md font-medium transition ${
              pathname === "/"
                ? "bg-white text-secondary"
                : "hover:bg-blue-100 hover:text-secondary text-white"
            }`}
          >
            <span className="text-lg">🏠</span> Home
          </Link>

          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setSelectedTab(item.label);
                setIsMobileNavOpen(false); 
              }}
              className={`w-full text-left cursor-pointer flex items-center gap-3 px-3 py-2 rounded-lg text-md font-medium transition ${
                selectedTab === item.label
                  ? "bg-white text-secondary"
                  : "hover:bg-blue-100 hover:text-secondary"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{selectedComponent}</main>
    </div>
  );
};

export default Sidenav;
