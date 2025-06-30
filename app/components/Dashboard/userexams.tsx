"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
interface ExamForm {
  examName: string;
  subject: string;
  status: "Upcoming" | "Finished";
  dateOfCommencement: string;
  marksScored: string;
  totalMarks: string;
  reminder: boolean;
  notes: string;
}

interface UserExam {
  _id: string;
  name: string;
  subject: string;
  status: "upcoming" | "finished";
  date?: string;
  marksscored?: number;
  totalmarks?: number;
  notes?: string;
}

export default function UserExams() {
  const [errormsg, setErrormsg] = useState<{ [key: string]: string }>({});
  const [exams, setExams] = useState<UserExam[]>([]);
  const [editingExamId, setEditingExamId] = useState<string | null>(null);
  const [viewExam, setViewExam] = useState<UserExam | null>(null);
  const [outdatedExams, setOutdatedExams] = useState<UserExam[]>([]);

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && "checked" in e.target) {
      setForm((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ✅ Reusable function to fetch exams and update outdated exams
  const fetchExams = async () => {
    try {
      const res = await axios.get("/api/userexams/getexams");
      const data: UserExam[] = res.data.userExams?.userExams || [];
      setExams(data);

      const today = new Date();
      const outdated = data.filter(
        (exam) =>
          exam.status === "upcoming" &&
          exam.date &&
          new Date(exam.date) < today
      );
      setOutdatedExams(outdated);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const examData = {
        name: form.examName,
        subject: form.subject,
        status: form.status.toLowerCase(),
        date: new Date(form.dateOfCommencement),
        marksscored:
          form.status === "Finished" ? Number(form.marksScored) : null,
        totalmarks: form.status === "Finished" ? Number(form.totalMarks) : null,
        reminder: form.reminder,
        notes: form.notes,
      };

      if (editingExamId) {
        await axios.patch(`/api/userexams/updateexam/${editingExamId}`, examData);
        setEditingExamId(null);
        toast.success("Exam updated!");
      } else {
        await axios.patch("/api/userexams/addexam", examData);
        toast.success("Exam added!");
      }
      await fetchExams();

      // Reset form
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
    } catch (err) {
    //   console.error("Error:", err?.response?.data || err.message);
    // setErrormsg(err?.response?.data?.error || {});
    // toast.error("Validation failed.");
    }
  };

  const handleDelete = async (examId: string) => {
    try {
      await axios.patch(`/api/userexams/delete/${examId}`);
      //  Remove from exams & outdatedExams
      setExams((prev) => prev.filter((e) => e._id !== examId));
      setOutdatedExams((prev) => prev.filter((e) => e._id !== examId));
      toast.success("Deleted!");
    } catch {
      toast.error("Delete failed.");
    }
  };

  const handleEdit = (exam: UserExam) => {
    setEditingExamId(exam._id);
    setForm({
      examName: exam.name,
      subject: exam.subject,
      status: exam.status === "finished" ? "Finished" : "Upcoming",
      dateOfCommencement: exam.date ? exam.date.substring(0, 10) : "",
      marksScored: exam.marksscored?.toString() || "",
      totalMarks: exam.totalmarks?.toString() || "",
      reminder: false,
      notes: exam.notes || "",
    });
    toast.info("Edit mode activated!");
  };

  const handleView = (exam: UserExam) => setViewExam(exam);

  return (
    <div id="exams" className="flex flex-col md:px-4 space-y-6">
      <ToastContainer />

      {/* === Banner === */}
      {outdatedExams.length > 0 && (
        <div className="text-yellow-500 px-4 py-2 rounded w-full text-center font-semibold">
          You have {outdatedExams.length} past exams! Please update them.
        </div>
      )}

      {/* === Form === */}
      <div className="rounded shadow w-full max-w-2xl">
        <h2 className="text-xl font-bold text-center mb-4">
          {editingExamId ? "Edit Exam" : "Add Exam"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              name="examName"
              value={form.examName}
              onChange={handleChange}
              placeholder="Exam Name"
              className="w-1/2 px-3 py-2 border rounded"
            />
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-1/2 px-3 py-2 border rounded"
            />
          </div>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-background border rounded"
          >
            <option value="Upcoming">Upcoming</option>
            <option value="Finished">Finished</option>
          </select>
          {form.status === "Upcoming" && (
            <input
              type="date"
              name="dateOfCommencement"
              value={form.dateOfCommencement}
              onChange={handleChange}
              className="w-1/2 px-3 py-2 border rounded"
            />
          )}
          {form.status === "Finished" && (
            <div className="flex gap-2">
              <input
                type="number"
                name="marksScored"
                value={form.marksScored}
                onChange={handleChange}
                placeholder="Marks"
                className="w-1/2 px-3 py-2 border rounded"
              />
              <input
                type="number"
                name="totalMarks"
                value={form.totalMarks}
                onChange={handleChange}
                placeholder="Total Marks"
                className="w-1/2 px-3 py-2 border rounded"
              />
            </div>
          )}
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Notes..."
            className="w-full px-3 py-2 border rounded"
            rows={2}
          />
          <button
            type="submit"
            className="w-1/2 bg-[var(--secondary)] cursor-pointer text-white py-2 rounded"
          >
            {editingExamId ? "Update Exam" : "Save Exam"}
          </button>
        </form>
      </div>

      {/* === Main Table === */}
      <div className="w-full overflow-auto">
        <h3 className="text-lg font-semibold mb-2">My Exams</h3>
        <table className="min-w-full text-sm ">
          <thead className="text-secondary">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Marks</th>
              <th className="p-2">%</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam, idx) => {
              const isFinished = exam.status === "finished";
              const percent =
                isFinished && exam.totalmarks
                  ? (((exam.marksscored || 0) / exam.totalmarks) * 100).toFixed(
                      1
                    )
                  : "-";
              return (
                <tr key={exam._id} className="">
                  <td className="p-2 text-center">{idx + 1}</td>
                  <td className="p-2 text-center">{exam.name}</td>
                  <td className="p-2 text-center">{exam.subject}</td>
                  <td className="p-2 text-center capitalize">{exam.status}</td>
                  <td className="p-2 text-center">
                    {exam.date ? new Date(exam.date).toLocaleDateString() : "-"}
                  </td>
                  <td className="p-2 text-center">
                    {isFinished
                      ? `${exam.marksscored}/${exam.totalmarks}`
                      : "-"}
                  </td>
                  <td className="p-2 text-center">{percent}</td>
                  <td className="p-3 flex gap-2 justify-center ">
                    <button
                      onClick={() => handleView(exam)}
                      className="cursor-pointer"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(exam)}
                      className="cursor-pointer"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(exam._id)}
                      className="cursor-pointer"
                    >
                      <MdDelete className="text-red" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* === Outdated exams section === */}
      {outdatedExams.length > 0 && (
        <div className="w-full  mt-4   rounded p-3">
          <h4 className="font-semibold text-orange-500 mb-2">
            Update Past Exams
          </h4>
          {outdatedExams.map((exam) => (
            <div
              key={exam._id}
              className="flex justify-between items-center py-3 last:border-none"
            >
              <span>
                {exam.name} ({exam.subject}) -{" "}
                {exam.date ? new Date(exam.date).toLocaleDateString() : "-"}
              </span>
              <button
                onClick={() => handleEdit(exam)}
                className="text-sm bg-orange-400 text-white px-2 py-1 cursor-pointer rounded"
              >
                Update Marks
              </button>
            </div>
          ))}
        </div>
      )}

      {/* === Modal === */}
      {viewExam && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex justify-center items-center backdrop-blur-sm"
          onClick={() => setViewExam(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-secondary w-full md:w-1/2 text-white flex flex-col gap-2 rounded shadow p-4 px-10"
          >
            <h4 className="font-bold mb-2">Exam Details</h4>
            <p>
              <b>Name:</b> {viewExam.name}
            </p>
            <p>
              <b>Subject:</b> {viewExam.subject}
            </p>
            <p>
              <b>Status:</b> {viewExam.status}
            </p>
            <p>
              <b>Date:</b>{" "}
              {viewExam.date
                ? new Date(viewExam.date).toLocaleDateString()
                : "-"}
            </p>
            <p>
              <b>Marks:</b> {viewExam.marksscored}/{viewExam.totalmarks}
            </p>
            <p>
              <b>Notes:</b> {viewExam.notes || "-"}
            </p>
            <button
              onClick={() => setViewExam(null)}
              className="mt-3 px-3 py-1 bg-white text-secondary cursor-pointer rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
