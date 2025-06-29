"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Subjects } from "@/backend/utils/types";
import Button from "@/app/components/button";
import Link from "next/link";
import { toast } from "react-toastify";

export default function SubjectDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [subject, setSubject] = useState<Subjects | null>(null);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!id) return;
      try {
        const res = await axios.get("/api/auth/checksession");
        if (res.data.loggedIn) {
          const userSubjectsRes = await axios.get("/api/usersubjects/getusersubjects");
          const fetchedSubjects = userSubjectsRes.data.userSubjects?.userSubjects || [];

          const exists = fetchedSubjects.some((subject: any) => subject.subject_Id === id);
          setIsAlreadyEnrolled(exists);
        }
      } catch (error) {
        console.error("Error checking enrollment:", error);
      }
    };

    checkEnrollment();
  }, [id]);

  const handleSubjectEnroll = async () => {
    try {
      const res = await axios.get("/api/auth/checksession");
      if (!res.data.loggedIn) {
        toast.info("Please login to continue");
        router.push(`/login?redirectTo=/subjects/${id}`);
        return;
      }

      setEnrolling(true);

      const userSubjectsRes = await axios.get("/api/usersubjects/getusersubjects");
      const fetchedSubjects = userSubjectsRes.data.userSubjects?.userSubjects || [];

      const exists = fetchedSubjects.some((subject: any) => subject.subject_Id === id);
      if (exists) {
        toast.warning("You are already enrolled in this subject!");
        setIsAlreadyEnrolled(true);
        return;
      }

      if (fetchedSubjects.length === 0) {
        const res=await axios.post("/api/usersubjects/userenroll", { sub_Id: id });
        toast.success("Successfully enrolled! 🚀");
        console.log(res)
      } else {
       const res= await axios.patch("/api/usersubjects/userenroll", { sub_Id: id });
        toast.success("Successfully added to your subjects! 🎉");
        console.log(res)
      }

      setIsAlreadyEnrolled(true);
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setEnrolling(false);
    }
  };

  useEffect(() => {
    const fetchSubject = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`/api/subjects/getOne/${id}`);
        setSubject(res.data.single_sub);
      } catch (err: any) {
        console.error("Error fetching subject:", err.message);
        toast.error("Unable to load subject details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!subject) {
    return (
      <div className="text-center text-red-500 py-10 text-lg">Subject not found.</div>
    );
  }

  return (
    <section className="px-4 md:px-6 py-12 md:py-16 max-w-5xl mx-auto space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-secondary">{subject.name}</h1>
        <p className="text-base md:text-lg  max-w-xl mx-auto">
          Embark on a journey to master <strong>{subject.name}</strong> — your path to excellence begins now!
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-h-auto overflow-hidden  shadow-sm">
          <img
            src={subject.imageurl}
            alt={`Roadmap for ${subject.name}`}
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-primary">Full Detailed Roadmap</h2>
      </div>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Link href="/">
          <Button text="Back To Home" />
        </Link>

        {isAlreadyEnrolled ? (
          <Button
            text="See Progress"
             onClick={() => router.push(`/dashboard`)}
          />
        ) : (
          <Button
            text={enrolling ? "Enrolling..." : "Start Learning"}
            onClick={handleSubjectEnroll}
            disabled={enrolling}
          />
        )}
      </div>
    </section>
  );
}
