"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { JobRequest } from "@/src/types";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [job, setJob] = useState<JobRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    fetchJobDetails();
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`);
      if (!res.ok) throw new Error("Job not found");
      const data = await res.json();
      setJob(data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setUpdating(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        const updatedJob = await res.json();
        setJob(updatedJob.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "This action cannot be undone. Delete this request?"
    );
    if (!confirmDelete) return;

    setDeleting(true);

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setDeleting(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-green-100 text-green-700 border-green-200";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Closed":
        return "bg-gray-200 text-gray-700 border-gray-300";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto p-6 animate-pulse">
        <div className="h-5 w-32 bg-gray-200 rounded mb-6"></div>
        <div className="h-8 w-2/3 bg-gray-200 rounded mb-4"></div>
        <div className="h-24 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="text-center mt-10 text-red-500 font-medium">
        Job not found!
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10">
      {/* Back */}
      <Link
        href="/"
        className="text-blue-600 hover:underline text-sm mb-6 inline-block"
      >
        ← Back to Board
      </Link>

      {/* Card */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {job.title}
          </h1>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Status</span>

            {isLoggedIn ? (
              <select
                value={job.status}
                onChange={handleStatusChange}
                disabled={updating}
                className={`text-sm px-3 py-1 rounded-lg border font-semibold outline-none cursor-pointer transition ${getStatusStyle(
                  job.status
                )}`}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            ) : (
              <span
                className={`text-sm px-3 py-1 rounded-lg border font-semibold ${getStatusStyle(
                  job.status
                )}`}
              >
                {job.status}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-8">
          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-5 rounded-xl border">
            <Info label="Category" value={job.category} />
            <Info label="Location" value={job.location} />
            <Info label="Contact Name" value={job.contactName} />
            <Info label="Contact Email" value={job.contactEmail} />
          </div>
        </div>

        {/* Actions */}
        {isLoggedIn && (
          <div className="mt-10 pt-6 border-t flex justify-end">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-50 text-red-600 px-5 py-2 rounded-xl border border-red-200 font-medium hover:bg-red-100 active:scale-95 transition disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete Request"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* Small reusable UI component */
function Info({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <span className="block text-xs font-semibold text-gray-500 uppercase mb-1">
        {label}
      </span>
      <span className="text-gray-800 font-medium">
        {value || "-"}
      </span>
    </div>
  );
}