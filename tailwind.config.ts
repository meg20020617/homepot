import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    green: '#104E36',    // 禮盒緞帶深綠
                    beige: '#F2E6D8',    // 禮盒紙盒米色
                    ink: '#231F20',      // 書法墨黑
                    orange: '#EA5E23',   // Logo 火焰橘
                    gold: '#C5A065',     // 質感金 (輔助色)
                    cream: '#FCFAF7',    // 淺米白 (網頁背景)
                }
            },
            fontFamily: {
                sans: ['"Noto Sans TC"', 'sans-serif'],
                serif: ['"Noto Serif TC"', 'serif'],
            },
            animation: {
                'fade-in-up': 'fadeInUp 1s ease-out',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;
