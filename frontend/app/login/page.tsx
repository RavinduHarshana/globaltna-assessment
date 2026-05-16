"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Token eka saha user details localStorage eke save karanawa
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }));

            router.push("/");
            router.refresh(); // UI eka update wenna refresh karanawa
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>

            {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{error}</div>}

            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                        type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                        type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                </div>
                <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
                    {loading ? "Logging in..." : "Log In"}
                </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account? <Link href="/register" className="text-blue-600 hover:underline">Register here</Link>
            </p>
        </div>
    );
}