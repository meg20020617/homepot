export default function ProductDetails() {
    return (
        <section id="product" className="py-20 pattern-bg">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-brand-green font-bold tracking-[0.3em] text-xs block mb-3 uppercase">
                        Premium Gift Box
                    </span>
                    <h3 className="text-4xl font-serif font-bold text-brand-ink">
                        冬季精緻禮盒
                    </h3>
                    <div className="w-20 h-1 bg-brand-green mx-auto mt-5"></div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Product Image */}
                    <div className="w-full lg:w-3/5">
                        <div className="bg-white p-4 rounded-sm shadow-xl relative">
                            {/* 裝飾緞帶效果 */}
                            <div className="absolute -top-2 -right-2 w-24 h-24 bg-brand-green z-0 rounded-sm opacity-20"></div>

                            <img
                                src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcfBJmrBMMK4gB6Fwm8JbH8o1YB3RSynMSj9V9Rdo0OEOS2vs7TRFG-r0eirLxGp7-_PpHKSz2NUcoMEfoyUV4lZp2yXS3H5y6OhxSt0_Yi1j__dal78kmsPA9T-e27SRPm-Buimpt3kI5XBZ8AaO4=s320?key=nLIc2mN0dDXuTSVw-JyeXg"
                                alt="薑母鴨禮盒內容"
                                className="w-full rounded-sm h-[400px] object-cover relative z-10 border border-gray-100 selected-image"
                                style={{ width: "283px", display: "block", margin: "0px auto 1em" }}
                            />
                            <div className="mt-4 text-center text-gray-500 text-sm font-serif">
                                ※ 圖片僅供參考，實際包裝以出貨為主
                            </div>
                        </div>

                        {/* Occasions Badges */}
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <span className="px-5 py-2 bg-brand-beige border border-brand-green text-brand-green rounded-full text-sm font-bold shadow-sm">
                                <i className="fas fa-truck mr-2"></i>冷凍宅配直送
                            </span>
                            <span className="px-5 py-2 bg-brand-beige border border-brand-green text-brand-green rounded-full text-sm font-bold shadow-sm">
                                <i className="fas fa-fire-alt mr-2"></i>簡單加熱即食
                            </span>
                            <span className="px-5 py-2 bg-brand-beige border border-brand-green text-brand-green rounded-full text-sm font-bold shadow-sm">
                                <i className="fas fa-users mr-2"></i>4-6人份大滿足
                            </span>
                        </div>
                    </div>

                    {/* Product Content List */}
                    <div className="w-full lg:w-2/5">
                        <div className="glass-card p-8 rounded-sm shadow-lg border-t-4 border-brand-green">
                            <h4 className="text-2xl font-serif font-bold text-brand-ink mb-6 border-b border-brand-gold/30 pb-4">
                                禮盒內容物
                            </h4>

                            {/* Soup */}
                            <div className="mb-6">
                                <div className="flex items-center mb-2">
                                    <span className="bg-brand-ink text-brand-gold text-xs px-2 py-1 rounded-sm mr-3 font-serif">
                                        湯底
                                    </span>
                                    <span className="font-bold text-lg text-brand-green">
                                        薑母鴨湯底 × 2 盒
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm pl-12">
                                    每盒約 2-3 人份，使用純黑麻油與老薑慢燉。
                                </p>
                            </div>

                            {/* Toppings */}
                            <div className="space-y-4">
                                {[
                                    { name: "鴨肉丸", desc: "彈牙緊實，吸飽湯汁越煮越香" },
                                    { name: "雪鴨卷", desc: "脆彈口感，一吃便愛上" },
                                    {
                                        name: "鴨肉燕餃",
                                        desc: "獨特香氣，必吃！",
                                        badge: true,
                                    },
                                    { name: "凍豆腐", desc: "湯底精華的最佳吸附體" },
                                    { name: "米血糕", desc: "又彈又糯，香甜可口" },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-start">
                                        <span className="bg-brand-beige text-brand-ink border border-brand-ink/20 text-xs px-2 py-1 rounded-sm mr-3 mt-1 shrink-0 font-serif">
                                            配料
                                        </span>
                                        <div>
                                            <h5 className="font-bold text-brand-ink">
                                                {item.name}
                                                {item.badge && (
                                                    <span className="text-brand-orange text-xs ml-1">
                                                        <i className="fas fa-thumbs-up"></i> 人氣王
                                                    </span>
                                                )}
                                            </h5>
                                            <p className="text-sm text-gray-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Highlight */}
                            <div className="mt-8 pt-6 border-t border-brand-gold/30 text-center">
                                <p className="text-gray-400 line-through text-sm">原價 $1280</p>
                                <div className="flex items-end justify-center gap-2">
                                    <span className="text-brand-green font-serif font-bold text-4xl">
                                        $1188
                                    </span>
                                    <span className="text-gray-600 mb-1 font-medium">
                                        / 組 （暖心優惠中）
                                    </span>
                                </div>
                                <a
                                    href="#order"
                                    className="block mt-6 w-full bg-brand-green text-brand-beige font-bold py-3 rounded-sm hover:bg-brand-ink transition shadow-lg transform hover:-translate-y-1 tracking-widest border border-brand-gold/20"
                                >
                                    前往訂購
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
