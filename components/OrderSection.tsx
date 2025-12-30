"use client";
import React, { useState, useEffect, FormEvent } from "react";
import Toast from "./Toast";

// Definte Addon types
type Addon = {
    name: string;
    price: number;
};
const ADDONS_LIST: Addon[] = [
    { name: "鴨肉丸", price: 89 },
    { name: "雪鴨卷", price: 119 },
    { name: "鴨肉燕餃", price: 119 },
    { name: "凍豆腐", price: 69 },
    { name: "米血糕", price: 49 },
];

export default function OrderSection() {
    const [mainQty, setMainQty] = useState(1);
    const [addonState, setAddonState] = useState<{ [key: string]: number }>({});
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        delivery: "宅配冷凍",
        address: "",
    });
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState<"success" | "error">("success");

    // Auto-fill Logic
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch("/api/auth/me");
                if (res.ok) {
                    const user = await res.json();
                    setFormData(prev => ({
                        ...prev,
                        name: user.name || "",
                        phone: user.phone || "",
                        address: user.address || "",
                        email: user.email || "",
                        // delivery: user.address ? "宅配" : "自取" // Optional logic
                    }));
                }
            } catch (e) {
                // Not logged in, ignore
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };
    const handleAddAddon = (name: string) => {
        setAddonState((prev) => ({
            ...prev,
            [name]: (prev[name] || 0) + 1,
        }));
    };

    const clearAddons = () => {
        setAddonState({});
    };

    const getAddonsString = () => {
        return Object.entries(addonState)
            .filter(([_, qty]) => qty > 0)
            .map(([name, qty]) => `${name} +${qty}`)
            .join(", ");
    };

    const toggleAddressLabel = () => {
        if (formData.delivery === "7-11店到店") return "7-11 店名/店號";
        if (formData.delivery === "自取") return "備註事項";
        return "配送地址";
    };

    const toggleAddressPlaceholder = () => {
        if (formData.delivery === "7-11店到店") return "請輸入取貨門市";
        if (formData.delivery === "自取") return "請填寫預計取貨時間";
        return "請輸入完整收件地址";
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // 1. Generate Order Text (for DB storage)
        let itemString = `薑母鴨精緻禮盒 x ${mainQty}`;
        const addonsStr = getAddonsString();
        // ... (addon logic omitted)
        if (addonsStr) {
            itemString += `\n加購：${addonsStr}`;
        }

        // 2. Submit to API (Strict Backend Integration)
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    delivery: formData.delivery,
                    address: formData.address,
                    orderContent: itemString
                }),
            });

            if (res.ok) {
                setToastMessage("訂單已送出，我們將盡快聯繫您！");
                setToastType("success");
                setShowToast(true);
                // Optional: Clear form here if desired
            } else {
                const data = await res.json();
                throw new Error(data.error || "Submission failed");
            }
        } catch (error: any) {
            console.error("API submission error", error);
            setToastMessage(error.message || "送出失敗，請稍後再試");
            setToastType("error");
            setShowToast(true);
        }
    };

    return (
        <section id="order" className="py-20 bg-white">
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={() => setShowToast(false)}
                type={toastType}
            />
            <div className="container mx-auto px-6 max-w-5xl">
                <div className="text-center mb-12">
                    <h3 className="text-3xl font-serif font-bold text-brand-ink mb-4">
                        私訊下單．美味直送
                    </h3>
                    <p className="text-gray-600">
                        請填寫下方資訊，確認後點擊「送出訂單」，
                        <br className="md:hidden" />
                        我們將盡快確認並安排出貨！
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Info Column */}
                    <div className="space-y-8">
                        {/* Delivery Info */}
                        <div className="bg-brand-cream p-6 rounded-sm border border-brand-beige">
                            <h4 className="font-serif font-bold text-brand-green mb-4 text-xl border-b border-brand-green/20 pb-2">
                                <i className="fas fa-truck mr-2"></i>配送方式
                            </h4>
                            <ul className="space-y-3 text-sm md:text-base text-brand-ink/80">
                                <li className="flex justify-between">
                                    <span>宅配冷凍</span>
                                    <span className="font-bold">$225/份，一箱$290 (最多4份)</span>
                                </li>
                                <li className="flex justify-between">
                                    <span>7-11 店到店</span>
                                    <span className="font-bold">$129/份</span>
                                </li>
                                <li className="flex justify-between text-brand-ink">
                                    <span>台北／新北</span>
                                    <span className="font-bold bg-brand-gold/20 px-2 rounded-sm text-brand-green">
                                        可自取
                                    </span>
                                </li>
                            </ul>
                        </div>

                        {/* Add-ons Info (Interactive) */}
                        <div className="bg-brand-cream p-6 rounded-sm border border-brand-beige shadow-sm">
                            <h4 className="font-serif font-bold text-brand-green mb-4 text-xl border-b border-brand-green/20 pb-2 flex justify-between items-center">
                                <span>
                                    <i className="fas fa-plus-circle mr-2"></i>人氣加購區
                                </span>
                                <span className="text-xs text-brand-orange bg-white px-2 py-1 rounded border border-brand-orange animate-pulse-slow">
                                    點擊即可加入
                                </span>
                            </h4>
                            <ul className="space-y-3 text-sm md:text-base text-brand-ink/80">
                                {ADDONS_LIST.map((addon) => (
                                    <li
                                        key={addon.name}
                                        onClick={() => handleAddAddon(addon.name)}
                                        className="flex justify-between items-center border-b border-brand-beige pb-2 cursor-pointer hover:bg-brand-gold/10 p-2 rounded transition active-click group select-none"
                                    >
                                        <span className="font-medium group-hover:text-brand-green">
                                            <i className="fas fa-plus text-brand-gold mr-2 opacity-0 group-hover:opacity-100 transition"></i>
                                            {addon.name}
                                        </span>
                                        <span className="font-bold text-brand-orange">
                                            ${addon.price}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Order Generator Form */}
                    <div className="bg-white p-6 md:p-8 rounded-sm shadow-2xl border-t-4 border-brand-gold">
                        <h4 className="text-xl font-bold mb-6 text-center bg-brand-ink text-brand-gold py-3 rounded-sm font-serif tracking-wide">
                            快速訂購單產生器
                        </h4>

                        <form id="orderForm" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                {/* Main Product */}
                                <div className="">
                                    <label className="block text-sm font-bold text-brand-ink mb-1">
                                        冬季精緻禮盒 ($1188/組)
                                    </label>
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={() => setMainQty(Math.max(1, mainQty - 1))}
                                            className="w-8 h-8 bg-brand-beige rounded-l text-brand-ink font-bold hover:bg-brand-gold/50 transition"
                                        >
                                            -
                                        </button>
                                        <input
                                            type="number"
                                            value={mainQty}
                                            readOnly
                                            className="w-16 h-8 text-center border-t border-b border-brand-beige text-brand-green font-bold"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setMainQty(mainQty + 1)}
                                            className="w-8 h-8 bg-brand-beige rounded-r text-brand-ink font-bold hover:bg-brand-gold/50 transition"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Add-ons Selection (Read Only) */}
                                <div>
                                    <label className="block text-sm font-bold text-brand-ink mb-1 flex justify-between">
                                        <span className="">加購品項 (點選左側加入)</span>
                                        <span
                                            className="text-xs text-gray-400 font-normal cursor-pointer hover:text-red-500"
                                            onClick={clearAddons}
                                        >
                                            [清空加購]
                                        </span>
                                    </label>
                                    <textarea
                                        value={getAddonsString()}
                                        readOnly
                                        className="w-full border border-gray-300 rounded-sm p-2 text-sm h-24 focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none transition bg-gray-50"
                                        placeholder="尚未選擇加購品項..."
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-brand-ink mb-1">
                                            姓名
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:border-brand-green outline-none"
                                        />
                                    </div>
                                    <div className="">
                                        <label className="block text-sm font-bold text-brand-ink mb-1">
                                            電話
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) =>
                                                setFormData({ ...formData, phone: e.target.value })
                                            }
                                            className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:border-brand-green outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="">
                                    <label className="block text-sm font-bold text-brand-ink mb-1">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:border-brand-green outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-brand-ink mb-1">
                                        配送方式
                                    </label>
                                    <select
                                        value={formData.delivery}
                                        onChange={(e) =>
                                            setFormData({ ...formData, delivery: e.target.value })
                                        }
                                        className="w-full border border-gray-300 rounded-sm p-2 text-sm bg-white"
                                    >
                                        <option value="宅配冷凍">宅配冷凍</option>
                                        <option value="7-11店到店">7-11 店到店</option>
                                        <option value="自取">台北/新北自取</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-brand-ink mb-1">
                                        {toggleAddressLabel()}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.address}
                                        onChange={(e) =>
                                            setFormData({ ...formData, address: e.target.value })
                                        }
                                        placeholder={toggleAddressPlaceholder()}
                                        className="w-full border border-gray-300 rounded-sm p-2 text-sm focus:border-brand-green outline-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-brand-green text-brand-beige font-bold py-3 rounded-sm mt-4 hover:bg-brand-ink transition flex justify-center items-center gap-2 group shadow-md"
                                >
                                    <span className="">送出訂單</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
