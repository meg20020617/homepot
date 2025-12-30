export default function Ingredients() {
    return (
        <section
            id="ingredients"
            className="py-20 bg-brand-ink text-brand-beige relative overflow-hidden"
        >
            <div
                className="absolute inset-0 opacity-5"
                style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/black-linen.png')" }}
            ></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-serif font-bold text-brand-gold mb-4">
                        堅持慢燉・靈魂湯頭
                    </h3>
                    <div className="w-16 h-[1px] bg-brand-gold mx-auto mb-4"></div>
                    <p className="text-gray-400 font-light tracking-wide">
                        每一口都是精華，湯頭濃而不膩、溫潤回甘
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Item 1 */}
                    <div className="text-center group p-6 border border-brand-gold/10 hover:border-brand-gold/50 transition duration-500 rounded-sm">
                        <div className="w-16 h-16 mx-auto bg-brand-green rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition duration-300 border border-brand-gold/30">
                            <i className="fas fa-drumstick-bite text-2xl text-brand-beige"></i>
                        </div>
                        <h4 className="text-xl font-serif font-bold mb-3 text-brand-beige">
                            嚴選紅面鴨
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed font-light">
                            肉質結實、香氣厚實，慢火熬煮不乾柴。
                        </p>
                    </div>
                    {/* Item 2 */}
                    <div className="text-center group p-6 border border-brand-gold/10 hover:border-brand-gold/50 transition duration-500 rounded-sm">
                        <div className="w-16 h-16 mx-auto bg-brand-green rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition duration-300 border border-brand-gold/30">
                            <i className="fas fa-seedling text-2xl text-brand-beige"></i>
                        </div>
                        <h4 className="text-xl font-serif font-bold mb-3 text-brand-beige">
                            純黑麻油
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed font-light">
                            香氣濃郁四溢，溫潤滋補的最佳拍檔。
                        </p>
                    </div>
                    {/* Item 3 */}
                    <div className="text-center group p-6 border border-brand-gold/10 hover:border-brand-gold/50 transition duration-500 rounded-sm">
                        <div className="w-16 h-16 mx-auto bg-brand-orange rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition duration-300 border border-brand-gold/30">
                            <i className="fas fa-carrot text-2xl text-white"></i>
                        </div>
                        <h4 className="text-xl font-serif font-bold mb-3 text-brand-beige">
                            台灣老薑頭
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed font-light">
                            微火慢煸，逼出辛香，暖身驅寒首選。
                        </p>
                    </div>
                    {/* Item 4 */}
                    <div className="text-center group p-6 border border-brand-gold/10 hover:border-brand-gold/50 transition duration-500 rounded-sm">
                        <div className="w-16 h-16 mx-auto bg-brand-green rounded-full flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition duration-300 border border-brand-gold/30">
                            <i className="fas fa-wine-bottle text-2xl text-brand-beige"></i>
                        </div>
                        <h4 className="text-xl font-serif font-bold mb-3 text-brand-beige">
                            黃金比例米酒
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed font-light">
                            紅標米酒與秘密藥材，引出湯頭清甜美味。
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
