import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-brand-ink text-brand-beige flex-shrink-0 hidden md:block">
                <div className="p-6 border-b border-brand-gold/30">
                    <h2 className="text-2xl font-serif font-bold tracking-widest text-brand-gold">
                        慢燉圍爐
                        <span className="block text-xs text-gray-400 mt-1 font-sans tracking-normal">後台管理系統</span>
                    </h2>
                </div>
                <nav className="p-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
                        className="block px-4 py-3 rounded-sm bg-brand-green/20 text-brand-gold font-bold border-l-4 border-brand-green hover:bg-brand-green/30"
                    >
                        <i className="fas fa-list-alt mr-3"></i>訂單管理
                    </Link>
                    <Link
                        href="/admin/content"
                        className="block px-4 py-3 rounded-sm text-brand-beige hover:bg-brand-green/10 hover:text-white transition"
                    >
                        <i className="fas fa-edit mr-3"></i>內容管理
                    </Link>
                    <Link
                        href="/admin/members"
                        className="block px-4 py-3 rounded-sm text-brand-beige hover:bg-brand-green/10 hover:text-white transition"
                    >
                        <i className="fas fa-users mr-3"></i>會員管理
                    </Link>
                    <a
                        href="/"
                        target="_blank"
                        className="block px-4 py-3 rounded-sm hover:bg-white/5 text-gray-400 transition"
                    >
                        <i className="fas fa-external-link-alt mr-3"></i>查看前台
                    </a>
                </nav>
                <div className="absolute bottom-0 w-64 p-4 border-t border-brand-gold/20">
                    <div className="text-xs text-gray-500 text-center">Admin Access Only</div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Topbar for Mobile/Logout */}
                <header className="bg-white shadow-sm h-16 flex justify-between items-center px-6">
                    <div className="md:hidden font-bold text-brand-ink">慢燉圍爐後台</div>
                    <div className="ml-auto">
                        <AdminLogoutButton />
                    </div>
                </header>

                <main className="p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
