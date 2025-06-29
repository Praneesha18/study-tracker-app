"use client";

import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from "recharts";



export default function StatsPage() {
  // Dummy data
  const subjectsData = [
    { name: "Machine Learning", completed: 15, total: 20 },
    { name: "Web Development", completed: 10, total: 25 },
    { name: "Data Structures", completed: 18, total: 18 },
    { name: "Database Systems", completed: 5, total: 10 },
  ];

  const exams = [
    { title: "ML Midterm", date: "2025-07-20", type: "Exam" },
    { title: "DB Assignment 2", date: "2025-07-25", type: "Assignment" },
    { title: "Web Dev Quiz", date: "2025-07-28", type: "Exam" },
  ];

  const chartData = subjectsData.map(s => ({
    name: s.name,
    percent: Math.round((s.completed / s.total) * 100)
  }));

  const COLORS = ['#82ca9d', '#8884d8', '#ffc658', '#ff8042'];

  return (
    <div className="mx-auto py-8 space-y-8">
      <h2 className="text-3xl font-bold text-center text-secondary">
        📊 Your Progress & Upcoming Tasks
      </h2>

      <div className="w-full flex  flex-col md:flex-row items-center gap-2">
        {/* Bar Chart */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4">Subject Completion (%)</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="percent" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="w-full">
          <h3 className="text-lg font-semibold mb-4">Completion Share</h3>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="percent"
                nameKey="name"
                outerRadius={120}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Upcoming exams & assignments */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-4">📅 Upcoming Exams & Assignments</h3>
        <div className="space-y-3">
          {exams.map((e, idx) => (
            <div key={idx} className="flex justify-between border-b pb-2">
              <div>
                <p className="font-medium">{e.title}</p>
                <p className="text-xs text-gray-500">{e.type}</p>
              </div>
              <p className="text-sm text-secondary">{e.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
