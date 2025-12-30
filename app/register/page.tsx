"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Changed from 'next/link' to 'next/link' (standard)

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
        email: "",
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
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("註冊成功！請登入");
                router.push("/login");
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError("發生錯誤，請稍後再試");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-brand-cream flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-sm shadow-xl w-full max-w-md border-t-4 border-brand-green">
                <h1 className="text-3xl font-serif text-brand-ink mb-6 text-center font-bold">
                    會員註冊
                </h1>

                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded text-sm mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">姓名 <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-brand-gold outline-none"
                            placeholder="例如：王小明"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">手機號碼 <span className="text-red-500">*</span></label>
                        <input
                            type="tel"
                            required
                            className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-brand-gold outline-none"
                            placeholder="0912345678"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">常用收件地址</label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-brand-gold outline-none"
                            placeholder="預設匯入訂單地址"
                            value={formData.address}
                            onChange={e => setFormData({ ...formData, address: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">電子郵件 (Email)</label>
                        <input
                            type="email"
                            required
                            className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-brand-gold outline-none"
                            placeholder="example@mail.com"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                        <label className="block text-gray-700 text-sm font-bold mb-1">設定帳號 (Username) <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-brand-gold outline-none"
                            value={formData.username}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-1">設定密碼 (Password) <span className="text-red-500">*</span></label>
                        <input
                            type="password"
                            required
                            className="w-full border border-gray-300 rounded p-2 focus:ring-1 focus:ring-brand-gold outline-none"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-brand-green text-white font-bold py-3 rounded-sm hover:bg-brand-ink transition mt-4"
                    >
                        {loading ? "註冊中..." : "立即註冊"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    已有帳號？
                    <Link href="/login" className="text-brand-green font-bold hover:underline ml-1">
                        返回登入
                    </Link>
                </div>

                <div className="mt-4 text-center">
                    <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">
                        回到首頁
                    </Link>
                </div>
            </div>
        </div>
    );
}
