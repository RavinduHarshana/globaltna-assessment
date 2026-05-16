"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
    name: string;
    email: string;
};

export default function Navbar() {
    const router = useRouter();
    const pathname = usePathname();

    const [user, setUser] = useState<User | null | undefined>(undefined);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            setUser(null);
        }
    }, [pathname]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setMobileOpen(false);

        router.push("/login");
        router.refresh();
    };

    const navLinkStyle = (path: string) =>
        pathname === path
            ? "text-blue-600 font-semibold"
            : "text-gray-600 hover:text-blue-600 transition";

    return (
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* LOGO */}
                <Link
                    href="/"
                    className="flex items-center gap-2 text-2xl font-bold text-blue-600"
                >
                    <span className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-10 h-10 flex items-center justify-center rounded-xl shadow-sm">
                        🛠️
                    </span>
                    <span>SkillLink</span>
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-4">



                    {user === undefined ? (
                        <span className="text-sm text-gray-400">Loading...</span>
                    ) : user ? (
                        <>
                            {/* USER INFO */}
                            <Link href="/my-requests" className={navLinkStyle("/my-requests")}>
                                My Requests
                            </Link>
                            <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-full">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold shadow-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>

                                <div className="leading-tight">
                                    <p className="text-sm font-semibold text-gray-700">
                                        {user.name}
                                    </p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>

                            {/* LOGOUT */}
                            <button
                                onClick={handleLogout}
                                className="bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100 active:scale-95 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                            >
                                Log In
                            </Link>

                            <Link
                                href="/register"
                                className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-95 transition"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>

                {/* MOBILE BUTTON */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden text-gray-700 text-2xl"
                >
                    ☰
                </button>
            </div>

            {/* MOBILE MENU */}
            {mobileOpen && (
                <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-3">
                    <Link
                        href="/my-requests"
                        onClick={() => setMobileOpen(false)}
                        className="block text-gray-700"
                    >
                        My Requests
                    </Link>

                    {user === undefined ? (
                        <p className="text-sm text-gray-400">Loading...</p>
                    ) : user ? (
                        <>
                            <div className="flex items-center gap-3 bg-gray-100 px-3 py-2 rounded-xl">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-semibold">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>

                                <div>
                                    <p className="text-sm font-semibold">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-50 text-red-600 px-4 py-2 rounded-xl text-sm font-medium hover:bg-red-100 active:scale-95 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="block text-gray-700"
                            >
                                Log In
                            </Link>

                            <Link
                                href="/register"
                                onClick={() => setMobileOpen(false)}
                                className="block bg-blue-600 text-white px-4 py-2 rounded-xl text-center"
                            >
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            )}
        </header>
    );
}