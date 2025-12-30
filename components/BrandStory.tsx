"use client";
import { useContent } from "@/components/ContentProvider";

export default function BrandStory() {
    const content = useContent();

    return (
        <section id="brand" className="py-20 md:py-28 bg-brand-cream relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-beige rounded-full blur-3xl opacity-50 -z-0 translate-x-1/2 -translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Video Column: Width 5/12 */}
                    <div className="w-full md:w-5/12">
                        <div className="relative max-w-[320px] mx-auto">
                            {/* Video Container */}
                            <div className="rounded-sm shadow-2xl w-full h-[500px] border-4 border-white overflow-hidden relative group">
                                <video
                                    key={content.brand_video} // Force re-render when video source changes
                                    className="w-full h-full object-cover"
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    // Fallback poster if local image missing
                                    poster={content.brand_video_poster || "https://via.placeholder.com/320x500?text=Brand+Story"}
                                >
                                    <source
                                        src={content.brand_video || "https://videos.pexels.com/video-files/4114797/4114797-hd_1920_1080_25fps.mp4"}
                                        type="video/mp4"
                                    />
                                </video>
                            </div>

                            {/* 標籤 */}
                            <div className="absolute -bottom-6 -right-10 bg-brand-green text-brand-beige p-8 rounded-sm shadow-xl hidden md:block border border-brand-gold/30 z-10 pointer-events-none">
                                <p
                                    className="font-serif text-2xl vertical-rl tracking-widest"
                                >
                                    湯氣氳氤・溫暖入心
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Text Column: Width 7/12 */}
                    <div className="w-full md:w-7/12">
                        <h3 className="text-brand-green font-serif text-3xl md:text-4xl font-bold mb-8 relative inline-block">
                            {content.brand_title || "品牌精神"}
                            <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-gold opacity-80"></span>
                        </h3>
                        <p className="text-brand-ink/80 leading-8 mb-6 text-lg text-justify font-light whitespace-pre-wrap">
                            {content.brand_desc || "天氣轉涼的時候，最對味的禮，就是一鍋暖進心裡的薑母鴨。\n\n我們相信，這不只是一道料理，而是一種「圍爐的記憶」——一家人圍坐、朋友寒暄、湯氣氳氤的那一刻，溫暖的不只是胃，還有人與人之間久違的距離。"}
                        </p>
                        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                            <div className="p-4 bg-white border border-brand-beige rounded-sm hover:shadow-md transition">
                                <i className="fas fa-users text-3xl text-brand-green mb-2"></i>
                                <p className="font-serif font-bold text-brand-ink">家人圍爐</p>
                            </div>
                            <div className="p-4 bg-white border border-brand-beige rounded-sm hover:shadow-md transition">
                                <i className="fas fa-gift text-3xl text-brand-green mb-2"></i>
                                <p className="font-serif font-bold text-brand-ink">節慶送禮</p>
                            </div>
                            <div className="p-4 bg-white border border-brand-beige rounded-sm hover:shadow-md transition">
                                <i className="fas fa-campground text-3xl text-brand-green mb-2"></i>
                                <p className="font-serif font-bold text-brand-ink">露營聚會</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
