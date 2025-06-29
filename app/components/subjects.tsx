'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Subjects } from '@/backend/utils/types';
import { FaBrain, FaCode } from 'react-icons/fa';
import Link from 'next/link';

export default function SubjectSection() {
  const [subjects, setSubjects] = useState<Subjects[]>([]);
  const [userSubjectIds, setUserSubjectIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubjectsAndUser = async () => {
      try {
        const res = await axios.get('/api/subjects/get');
        setSubjects(res.data.subjects);

        const sessionRes = await axios.get('/api/auth/checksession');
        if (sessionRes.data.loggedIn) {
          const userSubjectsRes = await axios.get('/api/usersubjects/getusersubjects');
          const fetchedSubjects = userSubjectsRes.data.userSubjects?.userSubjects || [];
          const enrolledIds = fetchedSubjects.map((s: any) => s.subject_Id);
          setUserSubjectIds(enrolledIds);
        }
      } catch (err: any) {
        console.error('Error fetching data:', err.response?.data?.error || err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjectsAndUser();
  }, []);

  // separate enrolled & explore
  const enrolledSubjects = subjects.filter((sub) => userSubjectIds.includes(sub._id));
  const otherSubjects = subjects.filter((sub) => !userSubjectIds.includes(sub._id));

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto space-y-16">
      <h2 className="text-3xl font-semibold text-center mb-4">Start or Continue Your Learning Journey</h2>
      <p className="text-center text-secondary max-w-xl mx-auto">
  Track your enrolled subjects or discover new topics to learn.
</p>
      {isLoading ? (
        <div className="flex justify-center items-center h-auto">
          <img src="/loading.Webp" alt="Loading..." className="w-10 h-10" />
        </div>
      ) : (
        <>
          {/* Enrolled subjects */}
          {enrolledSubjects.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-6 text-secondary">Your Subjects</h3>
              <div className="grid  items-center md:grid-cols-2 gap-6">
                {enrolledSubjects.map((sub) => (
                  <div
                    key={sub._id}
                    className="bg-secondary text-white rounded-xl p-5 flex flex-col gap-3 items-center shadow hover:shadow-lg transition"
                  >
                    <div className="text-center">{sub.name === 'Machine Learning' ? <FaBrain className="text-4xl mb-2" /> : <FaCode className="text-4xl mb-2" />}</div>
                    <h4 className="text-lg font-medium text-center">{sub.name}</h4>

                    <div className="flex gap-2 w-full justify-center">
                      <Link href={`/dashboard`} className="w-1/3">
                        <button className="bg-white cursor-pointer text-secondary text-sm w-full p-1.5 rounded-md font-medium hover:scale-105 shadow transition">
                          See Progress
                        </button>
                      </Link>
                      <Link href={`/subjects/${sub._id}`} className="w-1/3">
                        <button className="bg-primary cursor-pointer text-white text-sm w-full p-1.5 rounded-md font-medium hover:scale-105 shadow transition">
                          View Roadmap
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other subjects */}
          {otherSubjects.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">🌱 Explore New Subjects</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {otherSubjects.map((sub) => (
                  <div
                    key={sub._id}
                    className="bg-secondary text-white rounded-xl p-5 flex flex-col gap-3 items-center shadow hover:shadow-lg transition"
                  >
                    <div className="text-center">{sub.name === 'Machine Learning' ? <FaBrain className="text-4xl mb-2" /> : <FaCode className="text-4xl mb-2" />}</div>
                    <h4 className="text-lg font-medium">{sub.name}</h4>
                    <Link href={`/subjects/${sub._id}`} className="w-2/3">
                      <button className="bg-white text-secondary cursor-pointer  text-sm w-full p-1.5 rounded-md font-medium hover:scale-105 shadow transition">
                        Start Now
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}
