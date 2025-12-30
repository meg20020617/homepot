"use client";
import { useContent } from "@/components/ContentProvider";

export default function Hero() {
    const content = useContent();

    return (
        <header className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
            {/* Background Image */}
            <img
                src={content.hero_bg_image || "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdg11751SnYvw7nxRSZf5M_rpwrO4gdhKy7elYSeLpjZmFVY55zSQFgNmCFBwuil5A1vSp78OFx1EyiNibULVWIK2vtNAroLeaN_1ffRE6s6JKq67cvC6SpHTGg2wIDSY4-Jdyv0PrtRl6Z5reUlwxu?key=nLIc2mN0dDXuTSVw-JyeXg"}
                alt="Background"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />

            {/* Overlay 遮罩 */}
            <div className="absolute inset-0 bg-brand-ink/40 bg-gradient-to-b from-brand-green/30 to-brand-ink/60 z-0"></div>

            <div className="relative z-10 px-6 max-w-4xl animate-fade-in-up">
                <h2 className="text-xl md:text-2xl mb-4 font-light tracking-[0.3em] text-brand-beige border-b border-brand-gold/50 inline-block pb-2">
                    {content.hero_subtitle || "寒冬裡最實在的暖流"}
                </h2>
                {/* 修改：手機版字體改為 text-3xl，並加入 whitespace-nowrap 確保不換行 */}
                <h1 className="text-3xl md:text-7xl font-serif font-bold mb-8 tracking-widest leading-tight drop-shadow-lg">
                    <span className="whitespace-nowrap">{content.hero_title || "那不只是薑母鴨"}</span>
                </h1>
                <p className="text-lg md:text-xl mb-10 text-gray-200 font-light leading-relaxed max-w-2xl mx-auto tracking-wide whitespace-pre-wrap">
                    {content.hero_desc || "一鍋湯底、五種配料，溫補又暖心。\n這個冬天，讓「慢燉圍爐」陪你一起好好吃鍋。"}
                </p>
                <a
                    href="#order"
                    className="inline-block bg-brand-gold/90 text-brand-ink hover:bg-white hover:text-brand-green px-10 py-4 text-lg tracking-widest transition duration-300 rounded-sm shadow-lg font-serif font-bold"
                >
                    預購暖心禮盒
                </a>
            </div>
        </header>
    );
}
