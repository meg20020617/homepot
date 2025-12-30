"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                // Redirection handled by client or middleware check, 
                // but here we force push to dashboard
                router.push("/admin/dashboard");
            } else {
                setError(data.error || "登入失敗");
            }
        } catch (err) {
            setError("發生錯誤");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-ink flex items-center justify-center p-6">
            <div className="bg-brand-cream p-8 rounded-sm shadow-2xl w-full max-w-md border-t-4 border-brand-gold">
                <h1 className="text-3xl font-serif text-brand-ink mb-2 text-center font-bold">
                    後台管理系統
                </h1>
                <p className="text-center text-gray-500 mb-6 text-sm">請輸入管理員帳號登入</p>

                {error && (
                    <div className="bg-red-100 text-red-600 p-3 rounded text-sm mb-4 text-center border border-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-brand-ink text-sm font-bold mb-1">帳號</label>
                        <input
                            type="text"
                            required
                            className="w-full border border-brand-gold/50 rounded p-2 focus:ring-2 focus:ring-brand-gold outline-none bg-white/50"
                            value={formData.username}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-brand-ink text-sm font-bold mb-1">密碼</label>
                        <input
                            type="password"
                            required
                            className="w-full border border-brand-gold/50 rounded p-2 focus:ring-2 focus:ring-brand-gold outline-none bg-white/50"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-green text-white font-bold py-3 rounded-sm hover:bg-brand-ink transition mt-4 shadow-lg"
                    >
                        {loading ? "登入中..." : "登入後台"}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <a href="/" className="text-xs text-gray-400 hover:text-gray-600">
                        ← 回到前台首頁
                    </a>
                </div>
            </div>
        </div>
    );
}
