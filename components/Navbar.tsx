"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    // State for user dropdown
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        // Check login status
        fetch("/api/auth/me")
            .then(res => {
                if (res.ok) return res.json();
                return null;
            })
            .then(data => {
                if (data && data.username) setUsername(data.username);
            })
            .catch(() => { });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        setUsername(null);
        window.location.reload();
    };

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-brand-green shadow-lg" : "bg-brand-green/95 backdrop-blur-sm"
                } text-white`}
        >
            <div className="container mx-auto px-6 py-2 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-4 group">
                    {/* Logo */}
                    <div className="text-center mb-[0.25em]">
                        {/* Using standard img tag for external URL to avoid next/image domain config hassle initially, or use unoptimized */}
                        <img
                            src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXfA_eBdxTDBVr96N3ia7GXT4hUM6DpsEuOglQw32Q1MqPUg9VqaKi7_nZw23kPiCswqVv0zBL9Z6rBvUDI8tiMju56wvtRpJCFTIDSxVXvspH7ydLN_19hTjZviI5b2VbD1jDcbQ23TQmbNz_s0T4sb?key=nLIc2mN0dDXuTSVw-JyeXg"
                            alt="慢燉圍爐 Logo"
                            className="h-20 w-auto object-contain rounded-sm shadow-md group-hover:scale-105 transition duration-300 mt-1"
                        />
                    </div>
                    <span className="text-xl font-serif font-bold tracking-widest text-brand-beige group-hover:text-white transition pt-1">
                        慢燉圍爐
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 text-sm tracking-wide text-brand-beige/90 items-center">
                    <Link href="/#brand" className="hover:text-white transition py-2">品牌精神</Link>
                    <Link href="/#ingredients" className="hover:text-white transition py-2">嚴選食材</Link>
                    <Link href="/#product" className="hover:text-white transition py-2">禮盒內容</Link>
                    <Link href="/#qa" className="hover:text-white transition py-2">常見問答</Link>
                    {/* Login Button / User Dropdown */}
                    {username ? (
                        <div className="relative">
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="hover:text-white transition py-2 font-bold flex items-center gap-2 focus:outline-none"
                            >
                                <i className="fas fa-user-circle text-xl"></i>
                                <span className="text-sm">會員中心 <i className="fas fa-caret-down text-xs ml-1"></i></span>
                            </button>

                            {/* Dropdown Menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-brand-green/10 z-50">
                                    <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
                                        Hi, <span className="font-bold text-brand-green">{username}</span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition font-medium"
                                    >
                                        <i className="fas fa-sign-out-alt mr-2 text-brand-gold"></i> 登出
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="hover:text-white transition py-2 font-bold flex items-center gap-1">
                            <i className="fas fa-user-circle"></i> 會員登入
                        </Link>
                    )}
                    <Link href="/#order" className="bg-brand-beige text-brand-green px-5 py-2 rounded-sm font-bold hover:bg-white hover:shadow-lg transition">立即訂購</Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-2xl text-brand-beige"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-brand-green border-t border-brand-gold/30">
                    <Link href="/#brand" className="block px-6 py-3 text-brand-beige hover:bg-brand-green/80" onClick={() => setIsMobileMenuOpen(false)}>品牌精神</Link>
                    <Link href="/#ingredients" className="block px-6 py-3 text-brand-beige hover:bg-brand-green/80" onClick={() => setIsMobileMenuOpen(false)}>嚴選食材</Link>
                    <Link href="/#product" className="block px-6 py-3 text-brand-beige hover:bg-brand-green/80" onClick={() => setIsMobileMenuOpen(false)}>禮盒內容</Link>
                    <Link href="/#qa" className="block px-6 py-3 text-brand-beige hover:bg-brand-green/80" onClick={() => setIsMobileMenuOpen(false)}>常見問答</Link>
                    <Link href="/login" className="block px-6 py-3 text-brand-beige hover:bg-brand-green/80" onClick={() => setIsMobileMenuOpen(false)}>會員登入</Link>
                    <Link href="/#order" className="block px-6 py-3 bg-brand-beige text-brand-green font-bold text-center" onClick={() => setIsMobileMenuOpen(false)}>立即訂購</Link>
                </div>
            )}
        </nav>
    );
}
