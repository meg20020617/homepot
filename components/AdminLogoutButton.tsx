"use client";
import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            router.push("/admin/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-700 font-bold flex items-center gap-2"
        >
            <i className="fas fa-sign-out-alt"></i> 登出
        </button>
    );
}
