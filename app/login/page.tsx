"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                alert("登入成功！");
                router.push("/");
            } else {
                const data = await res.json();
                setError(data.error || "帳號或密碼錯誤");
            }
        } catch (err) {
            setError("發生錯誤，請稍後再試");
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen flex items-center justify-center bg-brand-cream pt-20">
                <div className="bg-white p-8 rounded-sm shadow-xl border border-brand-gold/30 w-full max-w-md">
                    <h2 className="text-3xl font-serif font-bold text-brand-ink mb-6 text-center">會員登入</h2>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-brand-ink font-bold mb-2">帳號 / Email</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full border border-gray-300 rounded-sm p-3 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition"
                                required
                                placeholder="請輸入帳號或 Email"
                            />
                        </div>

                        <div>
                            <label className="block text-brand-ink font-bold mb-2">密碼</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-sm p-3 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition"
                                required
                                placeholder="請輸入密碼"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                        <button
                            type="submit"
                            className="w-full bg-brand-green text-brand-beige font-bold py-3 rounded-sm hover:bg-brand-ink transition shadow-md"
                        >
                            登入
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        還沒有帳號？
                        <Link href="/register" className="text-brand-green font-bold hover:underline ml-1">
                            立即註冊
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
