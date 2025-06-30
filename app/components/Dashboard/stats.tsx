"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    payload: {
      name: string;
      scored: number;
      total: number;
      percent: number;
    };
  }[];
  label?: string;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white text-secondary p-5 rounded shadow text-sm">
        <p className="font-semibold">{label}</p>
        <p>Marks Scored: {data.scored}</p>
        <p>Total Marks: {data.total}</p>
        <p>Percentage: {data.percent}%</p>
      </div>
    );
  }
  return null;
};

export default function StatsPage() {
  const [username,setUsername]=useState("")
  const [previousExams, setPreviousExams] = useState<
    { name: string; subject: string; scored: number; total: number }[]
  >([]);
  const [subjectsData, setSubjectsData] = useState<
    { name: string; completed: number; total: number }[]
  >([]);
  const [upcomingexams, setUpcomingexams] = useState<{ name: string; subject: string; date: string }[]>([]);

  useEffect(() => {
    const render = async () => {
      const session=await axios.get("/api/auth/checksession")
      const uname=(session.data.session.user.name)
      setUsername(uname)
      // const user=session?.user.name
      const res = await axios.get("/api/usersubjects/getusersubjects");
      const rawsubjects = res.data.userSubjects?.userSubjects;
      const processed = rawsubjects?.map((subject: any) => {
        const completed = subject.topics.filter((t: any) => t.progress).length;
        const total = subject.topics.length;
        return {
          name: subject.name,
          completed,
          total,
        };
      });
      setSubjectsData(processed || []);

      const examsres = await axios.get("/api/userexams/getexams");
      const rawExams = examsres.data.userExams?.userExams || [];

      const finishedExams = rawExams
        .filter((e: any) => e.status === "finished" && e.marksscored != null && e.totalmarks != null)
        .map((e: any) => ({
          name: e.name,
          subject: e.subject,
          scored: e.marksscored,
          total: e.totalmarks
        }));
      setPreviousExams(finishedExams);

      const today = new Date();
      const upcoming = rawExams
        .filter((e: any) => e.status === "upcoming" && e.date && new Date(e.date) > today)
        .map((e: any) => ({
          name: e.name,
          subject: e.subject,
          date: e.date
        }));
      setUpcomingexams(upcoming);
    };

    render();
  }, []);

  const COLORS = ["#4CAF50", "#FF9800"];

  const barData = previousExams.map(e => ({
    name: e.name,
    percent: Math.round((e.scored / e.total) * 100),
    scored: e.scored,
    total: e.total
  }));

  return (
    <div id="stats" className="mx-auto py-8 space-y-10 max-w-6xl ">
      <h2 className="text-3xl font-bold   mb-6">
       <div className="text-32xl font-bold  mb-6">
  👋 Hello, {username}!
</div>
      </h2>

      {/* === Pie Charts: Subject Topic Completion === */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">📚 Subject Topic Completion</h3>
        {subjectsData.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No subjects yet. Start by adding subjects!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subjectsData.map((subject, idx) => {
              const data = [
                { name: "Completed", value: subject.completed },
                { name: "Remaining", value: subject.total - subject.completed },
              ];
              return (
                <div key={idx} className="flex flex-col items-center text-secondary shadow rounded p-4">
                  <h4 className="font-lg mb-2">{subject.name}</h4>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={data} dataKey="value" nameKey="name" radius={100} label>
                        {data.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke={COLORS[index % COLORS.length]}
                            strokeWidth={0.5}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <p className="text-sm mt-2">
                    {((subject.completed / subject.total) * 100).toFixed(1)}% completed
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* === Bar Chart: Previous Exams Marks === */}
      <div>
        <h3 className="text-xl font-semibold mb-4">📈 Previous Exams Marks (%)</h3>
        {previousExams.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No exams data yet. Add your finished exams to track progress!</p>
          </div>
        ) : (
          <div className="shadow rounded p-4">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="percent" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* === Upcoming Exams === */}
      <div className="shadow rounded p-4">
        <h3 className="text-xl font-semibold mb-4">📅 Upcoming Exams & Assignments</h3>
        {upcomingexams.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No upcoming exams yet. Add your upcoming exams!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingexams.map((e, idx) => (
              <div key={idx} className="flex justify-between border-b pb-2 last:border-none">
                <div>
                  <p className="font-medium">{e.name}</p>
                  <p className="text-xs text-gray-500">{e.subject}</p>
                </div>
                <p className="text-sm text-secondary">{new Date(e.date).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
