"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ContentItem {
    key: string;
    value: string;
    section: string;
}

export default function ContentManager() {
    const [content, setContent] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const res = await fetch("/api/content");
            const data = await res.json();
            // Transform map back to array for editing, or fetch from admin specific endpoint if needed.
            // For simplicity, we'll fetch from public API and map to known keys, 
            // OR we should create an admin endpoint that returns full objects.

            // Let's rely on the keys we seeded.
            const items = Object.entries(data).map(([key, value]) => ({
                key,
                value: value as string,
                section: key.startsWith('hero') ? 'Hero' : 'Brand' // Simple inference
            }));
            setContent(items);
        } catch (error) {
            console.error("Failed to fetch content");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        const payload = content.reduce((acc, item) => ({
            ...acc,
            [item.key]: item.value
        }), {});

        try {
            const res = await fetch("/api/admin/content", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            if (res.ok) alert("儲存成功！");
            else alert("儲存失敗");
        } catch (err) {
            alert("錯誤");
        }
    };

    const updateField = (key: string, val: string) => {
        setContent(content.map(c => c.key === key ? { ...c, value: val } : c));
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        if (!e.target.files || !e.target.files[0]) return;
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (res.ok) {
                const data = await res.json();
                updateField(key, data.url);
                alert("上傳成功！");
            } else {
                alert("上傳失敗");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("上傳發生錯誤");
        }
    };


    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">網站內容管理 (CMS)</h1>
            <form onSubmit={handleSave} className="bg-white p-6 rounded shadow space-y-6 max-w-4xl">

                {/* Group by Section */}
                {['Hero', 'Brand'].map(section => (
                    <div key={section} className="border-b pb-6 last:border-0">
                        <h3 className="text-lg font-bold text-brand-green mb-4 border-l-4 border-brand-green pl-2">{section} Section</h3>
                        <div className="space-y-4">
                            {section === 'Brand' && (
                                <div className="grid grid-cols-1 gap-6 mb-8">
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">影片 URL (Video)</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 rounded p-2"
                                                value={content.find(item => item.key === 'brand_video')?.value || ""}
                                                onChange={(e) => updateField("brand_video", e.target.value)}
                                            />
                                            <label className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-pointer whitespace-nowrap">
                                                <span>上傳影片</span>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="video/*"
                                                    onChange={(e) => handleUpload(e, "brand_video")}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-bold mb-2">影片封面圖 URL (Poster)</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded p-2"
                                            value={content.find(item => item.key === 'brand_video_poster')?.value || ""}
                                            onChange={(e) => updateField("brand_video_poster", e.target.value)}
                                        />
                                        {content.find(item => item.key === 'brand_video_poster')?.value && <img src={content.find(item => item.key === 'brand_video_poster')?.value || ""} alt="Preview" className="h-20 mt-2 rounded border" />}
                                    </div>
                                </div>
                            )}
                            {content.filter(c => c.section === section && !['brand_video', 'brand_video_poster'].includes(c.key)).map(item => (
                                <div key={item.key}>
                                    <label className="block text-sm font-bold text-gray-700 mb-1 capitalize">
                                        {item.key.replace(section.toLowerCase() + '_', '').replace('_', ' ')}
                                    </label>
                                    {item.key.includes('desc') ? (
                                        <textarea
                                            value={item.value}
                                            onChange={e => updateField(item.key, e.target.value)}
                                            className="w-full border rounded p-2 text-sm h-24"
                                        />
                                    ) : item.key === 'hero_bg_image' ? (
                                        <div>
                                            <div className="flex gap-2">
                                                <input
                                                    type="text"
                                                    value={item.value}
                                                    onChange={e => updateField(item.key, e.target.value)}
                                                    className="w-full border rounded p-2 text-sm"
                                                />
                                                <label className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded cursor-pointer whitespace-nowrap flex items-center">
                                                    <i className="fas fa-upload mr-1"></i>
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        accept="image/*"
                                                        onChange={(e) => handleUpload(e, item.key)}
                                                    />
                                                </label>
                                            </div>
                                            {item.value && <img src={item.value} alt="Preview" className="h-20 mt-2 rounded border" />}
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            value={item.value}
                                            onChange={e => updateField(item.key, e.target.value)}
                                            className="w-full border rounded p-2 text-sm"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="pt-4 flex justify-end">
                    <button type="submit" className="bg-brand-gold text-brand-ink font-bold px-6 py-2 rounded hover:bg-white border border-brand-gold transition">
                        儲存變更
                    </button>
                </div>
            </form>
        </div>
    );
}
