export default function Footer() {
    return (
        <footer className="bg-brand-ink text-brand-beige py-12 border-t border-brand-gold/30">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-2xl font-serif font-bold mb-6 tracking-widest text-brand-gold">
                    慢燉圍爐
                </h2>
                <div className="flex justify-center space-x-6 mb-8">
                    <a
                        href="https://line.me/R/ti/p/@081ohaxa"
                        target="_blank"
                        className="w-10 h-10 rounded-full bg-brand-green/20 border border-brand-green/50 flex items-center justify-center hover:bg-brand-green hover:text-white transition text-brand-green"
                    >
                        <i className="fab fa-line"></i>
                    </a>
                    <a
                        href="https://www.instagram.com/homepot_duck?igsh=OW9nYzFleTJmaTY2"
                        target="_blank"
                        className="w-10 h-10 rounded-full bg-brand-green/20 border border-brand-green/50 flex items-center justify-center hover:bg-brand-green hover:text-white transition text-brand-green"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a
                        href="mailto:service@homepot.com"
                        className="w-10 h-10 rounded-full bg-brand-green/20 border border-brand-green/50 flex items-center justify-center hover:bg-brand-green hover:text-white transition text-brand-green"
                    >
                        <i className="far fa-envelope"></i>
                    </a>
                </div>
                <p className="text-gray-400 text-sm">
                    © 2025 慢燉圍爐 All Rights Reserved.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                    <br />
                </p>
            </div>
        </footer>
    );
}
