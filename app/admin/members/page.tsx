"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface User {
    id: number;
    username: string;
    name: string;
    phone: string;
    address: string;
    _count?: {
        orders: number;
    };
}

export default function MemberList() {
    const [members, setMembers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch("/api/admin/members");
            if (res.ok) {
                const data = await res.json();
                setMembers(data);
            }
        } catch (error) {
            console.error("Failed to fetch members");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="p-10 text-center text-gray-500">載入中...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">會員管理</h1>

            <div className="bg-white rounded-sm shadow-md overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">帳號</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">電話</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">常用地址</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">訂單紀錄</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm">
                            {members.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">#{member.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-900">{member.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-600">{member.phone}</td>
                                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{member.address}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center font-bold text-brand-green">
                                        {member._count?.orders || 0} 筆
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link
                                            href={`/admin/dashboard?phone=${member.phone}`}
                                            className="bg-brand-gold text-white px-3 py-1 rounded text-xs hover:bg-brand-ink transition"
                                        >
                                            <i className="fas fa-search mr-1"></i> 查看
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            {members.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                                        目前尚無註冊會員
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
