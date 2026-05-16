"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewJobPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Form eke data save karaganna state eka
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        location: "",
        contactName: "",
        contactEmail: "",
    });

    // Type karaddi state eka update wena function eka
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Form eka submit karana function eka
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // Page eka auto refresh wena eka nawaththanawa
        setLoading(true);
        setError("");

        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // 👈 Token eka add kala
                },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                throw new Error("Failed to create job request");
            }

            // Save unata passe home page ekata yanawa
            router.push("/");
            router.refresh(); // Home page eke aluth data load wenna refresh karanawa

        } catch (err) {
            setError("Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-100">
            <Link href="/" className="text-blue-600 hover:underline text-sm">
                &larr; Back
            </Link>
            <div className="flex items-center justify-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-800">Post a New Request</h2>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm border border-red-200">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                    <input
                        type="text"
                        name="title"
                        required
                        placeholder="e.g. Need a plumber for a leaking tap"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                        name="description"
                        required
                        rows={4}
                        placeholder="Describe the issue in detail..."
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                            <option value="">Select a category</option>
                            <option value="Plumbing">Plumbing</option>
                            <option value="Electrical">Electrical</option>
                            <option value="Painting">Painting</option>
                            <option value="Joinery">Joinery</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <input
                            type="text"
                            name="location"
                            placeholder="e.g. Glasgow"
                            value={formData.location}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                        <input
                            type="text"
                            name="contactName"
                            placeholder="Your name"
                            value={formData.contactName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email *</label>
                        <input
                            type="email"
                            name="contactEmail"
                            required
                            placeholder="your@email.com"
                            value={formData.contactEmail}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>
                </div>

                <div className="pt-4 border-t mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-medium py-3 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
                    >
                        {loading ? "Submitting Request..." : "Post Request"}
                    </button>
                </div>
            </form>
        </div>
    );
}