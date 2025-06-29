"use client";

import React, { useState } from "react";

interface ExamForm {
  examName: string;
  subject: string;
  status: "Upcoming" | "Finished";
  dateOfCommencement: string;  // only if Upcoming
  marksScored: string;         // only if Finished
  totalMarks: string;          // only if Finished
  reminder: boolean;
  notes: string;
}

export default function UserExams() {
  const [form, setForm] = useState<ExamForm>({
    examName: "",
    subject: "",
    status: "Upcoming",
    dateOfCommencement: "",
    marksScored: "",
    totalMarks: "",
    reminder: false,
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Example: gather data
    console.log("📦 Collected exam data:", form);

    // Example: send to backend
    // await axios.post("/api/exams/addExam", form);

    // Optionally reset form
    setForm({
      examName: "",
      subject: "",
      status: "Upcoming",
      dateOfCommencement: "",
      marksScored: "",
      totalMarks: "",
      reminder: false,
      notes: "",
    });
  };

  return (
    <div className="flex flex-col">
    <div className=" flex items-center justify-center px-4">
      <div className=" rounded-lg shadow-md w-full ">
        <h2 className="text-2xl font-bold text-center text-secondary mb-6">Add Exam</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex w-full gap-2">
          {/* Exam Name */}
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">* Exam Name</label>
            <input
              type="text"
              name="examName"
              placeholder="e.g., Mid Term"
              value={form.examName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Subject */}
          <div className="w-1/2">
            <label className="block text-sm font-medium  mb-1">* Subject</label>
            <input
              type="text"
              name="subject"
              placeholder="e.g., operating systems"
              value={form.subject}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          </div>

          {/* Status */}
          <div className="flex w-full gap-3">
          <div className="w-1/2 ">
            <label className="block text-sm  font-medium mb-1">* Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-gray-300 border-gray-300 rounded-md"
            >
              <option value="Upcoming">Upcoming</option>
              <option value="Finished">Finished</option>
            </select>
          </div>

          {/* Conditional fields */}
          {form.status === "Upcoming" && (
            <>
              <div className="w-1/2">
                <label className="block text-sm font-medium ">* Date of Commencement</label>
                <input
                  type="date"
                  name="dateOfCommencement"
                  value={form.dateOfCommencement}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
       
            </>
          )}
          </div>


          {form.status === "Finished" && (
            <>
            <div className="flex gap-3 w-full">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">* Marks Scored</label>
                <input
                  type="number"
                  name="marksScored"
                  placeholder="e.g., 85"
                  value={form.marksScored}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium  mb-1">* Total Marks</label>
                <input
                  type="number"
                  name="totalMarks"
                  placeholder="e.g., 100"
                  value={form.totalMarks}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              </div>
            </>
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium  mb-1">Notes (optional)</label>
            <textarea
              name="notes"
              placeholder="Any extra notes..."
              value={form.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              rows={3}
            ></textarea>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[var(--secondary)] text-white py-2 rounded-md font-semibold hover:bg-[var(--primary)] transition"
          >
            Save Exam
          </button>
        </form>
      </div>
    </div>
    <div></div>
    </div>
  );
}
