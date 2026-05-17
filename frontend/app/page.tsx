"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { JobRequest } from "@/src/types";

export default function Home() {
  const [jobs, setJobs] = useState<JobRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    const timeout = setTimeout(() => {
      fetchJobs();
    }, 500);

    return () => clearTimeout(timeout);
  }, [categoryFilter, searchQuery, statusFilter]);

  const fetchJobs = async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();

      if (categoryFilter) {
        params.append("category", categoryFilter);
      }

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      if (statusFilter) {
        params.append("status", statusFilter);
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL}/jobs?${params.toString()}`;

      const res = await fetch(url);

      if (!res.ok) throw new Error("Failed to fetch jobs");

      const result = await res.json();

      setJobs(result.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216"
            alt="Workers"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Trusted Service Experts and  Jobs
          </h1>



          <p className="text-lg text-blue-100 max-w-2xl">
            Service requests and connect with skilled professionals
            for plumbing, electrical, painting, gardening and more.
          </p>


          {isLoggedIn && (
            <Link
              href="/jobs/new"
              className="inline-block mt-8 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              + Post New Request
            </Link>
          )}
        </div>


      </section>

      {/* FILTER SECTION */}
      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">


          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">


            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Search title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <label className="font-medium text-gray-700">
                Category:
              </label>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">All</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Painting">Painting</option>
                <option value="Joinery">Joinery</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <label className="font-medium text-gray-700">
                Status:
              </label>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">All</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

          </div>
        </div>
      </div>

      {/* JOBS */}
      <div className="max-w-6xl mx-auto px-4 py-10">

        {loading ? (
          <div className="text-center py-20">
            <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>

            <p className="mt-4 text-gray-500">
              Loading requests...
            </p>
          </div>
        ) : jobs.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 text-center shadow-sm">
            <div className="text-6xl mb-4">📭</div>

            <h3 className="text-xl font-semibold text-gray-700">
              No requests found
            </h3>

            <p className="text-gray-500 mt-2">
              Try selecting a different category.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <Link href={`/jobs/${job._id}`} key={job._id}>
                <div className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-2xl transition duration-300 border border-gray-100 h-full hover:-translate-y-1">

                  <div className="flex justify-between items-start gap-3">

                    <h3 className="text-lg font-bold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition">
                      {job.title}
                    </h3>

                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap
                        ${job.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : job.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : job.status === "Closed"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <p className="text-gray-500 text-sm mt-4 line-clamp-3">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t text-sm text-gray-600">

                    {job.category && (
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                        📁 {job.category}
                      </span>
                    )}

                    {job.location && (
                      <span className="bg-gray-100 px-3 py-1 rounded-full">
                        📍 {job.location}
                      </span>
                    )}
                  </div>

                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}