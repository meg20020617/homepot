import type { Metadata } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const notoSansTC = Noto_Sans_TC({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
    variable: "--font-noto-sans-tc",
});

const notoSerifTC = Noto_Serif_TC({
    subsets: ["latin"],
    weight: ["400", "700"],
    variable: "--font-noto-serif-tc",
});

export const metadata: Metadata = {
    title: "慢燉圍爐｜冷凍薑母鴨禮盒",
    description: "天氣轉涼的時候，最對味的禮，就是一鍋暖進心裡的薑母鴨。",
};

import ContentProvider from "@/components/ContentProvider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-TW" className={`${notoSansTC.variable} ${notoSerifTC.variable}`} suppressHydrationWarning>
            <head>
                {/* Font Awesome CDN */}
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
            </head>
            <body className="font-sans text-brand-ink bg-brand-cream antialiased">
                <ContentProvider>
                    {children}
                </ContentProvider>
            </body>
        </html>
    );
}
