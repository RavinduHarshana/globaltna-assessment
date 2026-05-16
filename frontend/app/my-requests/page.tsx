"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// JobRequest interface eka (types file eken ganna thibba, lesiyata methanama danawa)
interface JobRequest {
  _id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  contactEmail: string;
}

export default function MyRequestsPage() {
  const [myJobs, setMyJobs] = useState<JobRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchMyJobs = async () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      // Login wela nattam login page ekata yawanawa
      if (!storedUser || !token) {
        router.push("/login");
        return;
      }

      const user = JSON.parse(storedUser);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
        if (!res.ok) throw new Error("Failed to fetch jobs");
        const result = await res.json();

        // 👈 Userge email ekata match wena jobs vitharak filter karanawa
        const filteredJobs = result.data.filter(
          (job: JobRequest) => job.contactEmail === user.email
        );
        setMyJobs(filteredJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyJobs();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6 border-b p-6">
        <h2 className="text-2xl font-bold text-gray-800">My Requests</h2>
        <Link 
          href="/jobs/new" 
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          + New Request
        </Link>
      </div>

      {myJobs.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-lg shadow-sm border border-gray-100 mt-6">
          <span className="text-4xl block mb-3">📭</span>
          <h3 className="text-lg font-medium text-gray-800">You haven't posted any requests yet.</h3>
          <p className="text-gray-500 mt-1">Click the button above to create your first service request.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {myJobs.map((job) => (
            <Link href={`/jobs/${job._id}`} key={job._id}>
              <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition cursor-pointer h-full flex flex-col relative">
                
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-1 pr-2">
                    {job.title}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded font-medium whitespace-nowrap ${
                    job.status === 'Open' ? 'bg-green-100 text-green-700' : 
                    job.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {job.status}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                  {job.description}
                </p>
                
                <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-50">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                    {job.category}
                  </span>
                  <span className="text-sm text-blue-600 font-medium group-hover:underline">
                    View Details &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}