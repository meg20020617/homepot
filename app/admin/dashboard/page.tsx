"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import * as XLSX from "xlsx"; // Fixed import

interface Contact {
    id: number;
    name: string;
    phone: string;
    email?: string;
    delivery: string;
    address: string;
    orderContent: string;
    createdAt: string;
    status: string; // 'Pending', 'Processing', 'Shipped', 'Completed', 'Cancelled'
}

function DashboardContent() {
    const [orders, setOrders] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("All");
    const router = useRouter();
    const searchParams = useSearchParams();
    const phoneFilter = searchParams.get('phone'); // Get phone from URL

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch("/api/admin/orders");
            if (res.ok) {
                const data = await res.json();
                setOrders(data);
                // If phone filter exists, auto-set filterStatus to All (to show user records)
                // but we handle specific filtering in filteredOrders logic
            }
        } catch (error) {
            console.error("Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: number, newStatus: string) => {
        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
            }
        } catch (err) {
            alert("更新失敗");
        }
    };

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(orders.map(o => ({
            ID: o.id,
            Name: o.name,
            Phone: o.phone,
            Address: o.address,
            Order: o.orderContent,
            Status: o.status,
            Date: new Date(o.createdAt).toLocaleDateString()
        })));
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Orders");
        XLSX.writeFile(wb, "orders_export.xlsx");
    };

    const filteredOrders = orders.filter(o => {
        if (phoneFilter) {
            return o.phone.includes(phoneFilter);
        }
        if (filterStatus === "All") return true;
        return o.status === filterStatus;
    });

    if (loading) return <div className="p-10 text-center text-gray-500">載入中...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    訂單管理 {phoneFilter && <span className="text-sm font-normal text-gray-500">(篩選電話: {phoneFilter})</span>}
                </h1>
                <div className="flex gap-4">
                    {!phoneFilter && (
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-white border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-green"
                        >
                            <option value="All">全部訂單</option>
                            <option value="Pending">待處理</option>
                            <option value="Processing">製作中</option>
                            <option value="Shipped">已出貨</option>
                            <option value="Completed">已完成</option>
                            <option value="Cancelled">已取消</option>
                        </select>
                    )}
                    {phoneFilter && (
                        <button
                            onClick={() => router.push('/admin/dashboard')}
                            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 transition text-sm"
                        >
                            清除篩選
                        </button>
                    )}
                    <button
                        onClick={handleExport}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition flex items-center gap-2"
                    >
                        <i className="fas fa-file-excel"></i> 匯出 Excel
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-sm shadow-md overflow-hidden border border-gray-200">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID / 狀態</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日期</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名/電話</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">配送資訊</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">訂單內容</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 text-sm">
                            {filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-gray-500 mb-2">#{order.id}</div>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                            className={`text-xs font-bold px-2 py-1 rounded border ${order.status === 'Completed' ? 'bg-green-100 text-green-800 border-green-200' :
                                                order.status === 'Cancelled' ? 'bg-red-100 text-red-800 border-red-200' :
                                                    'bg-yellow-100 text-yellow-800 border-yellow-200'
                                                }`}
                                        >
                                            <option value="Pending">待處理</option>
                                            <option value="Processing">處理中</option>
                                            <option value="Completed">已完成</option>
                                            <option value="Cancelled">已取消</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                                        {new Date(order.createdAt).toLocaleString('zh-TW')}
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                        <div className="font-bold">{order.name}</div>
                                        <div className="text-gray-500">{order.phone}</div>
                                        <a href={`mailto:${order.email}`} className="text-brand-green hover:underline text-xs">{order.email}</a>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                        <div className="mb-1 text-xs text-gray-500">{order.delivery}</div>
                                        <div className="text-xs text-gray-600 max-w-xs">{order.address}</div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-900">
                                        <pre className="whitespace-pre-wrap font-sans text-xs bg-gray-50 p-2 rounded border border-gray-200 max-w-sm">
                                            {order.orderContent}
                                        </pre>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                                        目前尚無訂單資料
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

export default function AdminDashboard() {
    return (
        <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
            <DashboardContent />
        </Suspense>
    );
}
