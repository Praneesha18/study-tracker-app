'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { FaBookOpen, FaChartLine, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { UserSubjectSchema } from '@/backend/utils/types';

export default function Usersubjects() {
  const [subjects, setSubjects] = useState<UserSubjectSchema[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSubjectId, setExpandedSubjectId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserSubjects = async () => {
      try {
        const res = await axios.get('/api/usersubjects/getusersubjects');
        const fetched = res.data.userSubjects?.userSubjects || [];
        setSubjects(fetched);
      } catch (err) {
        console.error('Error fetching user subjects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserSubjects();
  }, []);

  const toggleAccordion = (subjectId: string) => {
    setExpandedSubjectId(prev => (prev === subjectId ? null : subjectId));
  };

  const toggleTopicCompletion = async (subjectId: string, topicId: string, newVal: boolean) => {
    try {
      await axios.patch('/api/topic/updateTopicProgress', {
        sub_Id: subjectId,
        topic_Id: topicId,
        newValue: newVal,
      });

      // Optimistic UI update:
      setSubjects(prevSubjects =>
        prevSubjects.map(subject => {
          if (subject.subject_Id !== subjectId) return subject;

          // update topic progress and subjectLevel
          const updatedTopics = subject.topics.map(topic =>
            topic._id === topicId ? { ...topic, progress: newVal } : topic
          );

          // recalculate completed topics:
          const completedCount = updatedTopics.filter(t => t.progress).length;

          return {
            ...subject,
            topics: updatedTopics,
            subjectLevel: completedCount,
          };
        })
      );
    } catch (err) {
      console.error('Error updating topic progress:', err);
    }
  };

  return (
    <section id="subjects" className="py-5 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-secondary">Your Subjects</h2>

      {loading ? (
        <div className="flex justify-center items-center">
          <img src="/loading.webp" alt="Loading..." className="w-10 h-10" />
        </div>
      ) : subjects.length === 0 ? (
        <p className="text-center text-gray-500">You haven't enrolled in any subjects yet.</p>
      ) : (
        <div className="space-y-5">
          {subjects.map(subject => {
            const isExpanded = expandedSubjectId === subject.subject_Id;
            const completedCount = subject.subjectLevel as number; // make sure subjectLevel is number
            const totalTopics = subject.topics.length;

            return (
              <div key={subject.subject_Id} className="rounded-md shadow-md">
                {/* Card header */}
                <button
                  className="w-full flex justify-between cursor-pointer items-center px-6 py-4 rounded-t-lg focus:outline-primary"
                  onClick={() => toggleAccordion(subject.subject_Id)}
                >
                  <div className="flex items-center gap-5 text-left">
                    <FaBookOpen className="text-xl text-secondary" />
                    <div>
                      <h3 className="text-lg font-semibold">{subject.name}</h3>
                      <p className="text-xs text-gray-400">
                        {completedCount} of {totalTopics} topics completed
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <FaChevronUp className="text-gray-400" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </button>

                {/* Accordion content */}
                {isExpanded && (
                  <div className="p-1 md:px-3 md:py-1 space-y-3">
                    {subject.topics.map(topic => (
                      <div
                        key={topic._id}
                        className="flex flex-col md:flex-row md:items-center justify-between p-3 rounded"
                      >
                        <div className="flex-1">
                          <p className="mb-1">{topic.title}</p>
                          <p className="text-xs text-gray-400">{topic.description}</p>
                        </div>
                        <div className="mt-2 md:mt-0 md:ml-4">
                          {topic.progress ? (
                            <button
                              onClick={() => toggleTopicCompletion(subject.subject_Id, topic._id, false)}
                              className="cursor-pointer text-green-600 px-3 py-2 rounded text-sm font-medium"
                            >
                              Completed
                            </button>
                          ) : (
                            <button
                              onClick={() => toggleTopicCompletion(subject.subject_Id, topic._id, true)}
                              className="bg-secondary cursor-pointer text-white px-3 py-2 rounded text-xs font-medium hover:bg-white hover:text-secondary transition"
                            >
                              Mark as Complete
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Footer buttons */}
                    <div className="w-full flex items-center justify-center p-5 gap-3">
                      <div className="w-full md:w-1/2 flex gap-3">
                        <Link href={`/dashboard/#stats`} className="flex-1">
                          <button className="flex items-center justify-center gap-2 w-full bg-primary text-white py-2 rounded-md text-sm font-medium hover:scale-105 transition">
                            <FaChartLine /> See Progress
                          </button>
                        </Link>
                        <Link href={`/subjects/${subject.subject_Id}`} className="flex-1">
                          <button className="w-full bg-white border border-primary text-secondary py-2 rounded-md text-sm font-medium hover:bg-primary hover:text-white transition">
                            View Roadmap
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
