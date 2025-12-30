export default function QASection() {
    return (
        <section id="qa" className="py-20 relative overflow-hidden">
            {/* Background Image */}
            <img
                src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXdXdIxSbXKrBL2dBS5xtDfqeotHtwmk2ysySz3OjcbZ95zE4wVQkqqj9UNFV57hpwUtrkjnPqnemTFzvJxLWI4_l-dbeelfBlEwDIDUV6K-8yrNdy7VXBWs4wQUGM9F6pYSpzZOSfgQYOepFDowAx5r=s320?key=nLIc2mN0dDXuTSVw-JyeXg"
                alt="Q&A Background"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            />

            {/* Overlay 遮罩 */}

            <div className="container mx-auto px-6 relative z-10 max-w-4xl">
                <div className="text-center mb-12">
                    <span className="text-brand-gold font-bold tracking-[0.3em] text-xs block mb-3 uppercase">
                        Common Questions
                    </span>
                    <h3 className="text-3xl font-serif font-bold text-brand-beige">
                        購買FAQ
                    </h3>
                    <div className="w-16 h-[1px] bg-brand-gold mx-auto mt-4"></div>
                </div>

                <div className="bg-brand-ink/30 p-8 rounded-sm border border-brand-gold/30 backdrop-blur-md">
                    <div className="flex items-start gap-4">
                        <div className="text-4xl text-brand-gold font-serif italic">Q</div>
                        <div className="">
                            <h4 className="text-xl font-bold mb-4 pt-2 tracking-wide text-white">
                                一套禮盒大概可以幾個人一起吃？
                            </h4>
                            <div className="w-full h-[1px] bg-brand-gold/40 mb-4"></div>
                            <div className="flex items-start gap-4">
                                <div className="text-4xl text-brand-beige font-serif italic opacity-70">
                                    A
                                </div>
                                <p className="text-brand-beige/90 leading-relaxed text-justify">
                                    每個人的食量不同，不過我們整理了這一個月試賣的回饋——
                                    <br />
                                    通常是{" "}
                                    <span className="text-brand-gold font-bold">5、6 個人</span>
                                    吃得剛剛好；
                                    <br />
                                    如果是家庭或朋友聚餐有再多準備一些配菜，大約{" "}
                                    <span className="text-brand-gold font-bold">6～8 人</span>
                                    圍著一起吃是沒問題的！
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
