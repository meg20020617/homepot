import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Update or create Admin with new credentials
    const admin = await prisma.user.upsert({
        where: { username: 'homepot2025' },
        update: {
            password: '12345678',
            role: 'ADMIN',
            name: '系統管理員',
            email: 'admin@example.com'
        },
        create: {
            username: 'homepot2025',
            password: '12345678',
            role: 'ADMIN',
            name: '系統管理員',
            email: 'admin@example.com'
        },
    })

    // Site Content Seed (Text & Media)
    const content = [
        // Text
        { section: "Hero", key: "hero_title", value: "那不只是薑母鴨" },
        { section: "Hero", key: "hero_subtitle", value: "是圍爐的記憶" },
        { section: "Hero", key: "hero_desc", value: "一鍋湯底、五種配料，溫補又暖心。\n這個冬天，讓「慢燉圍爐」陪你一起好好吃鍋。" },
        { section: "Brand", key: "brand_title", value: "品牌精神" },
        { section: "Brand", key: "brand_desc", value: "天氣轉涼的時候，最對味的禮，就是一鍋暖進心裡的薑母鴨。" },
        // Media (Images & Videos)
        { section: "Hero", key: "hero_bg_image", value: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXdg11751SnYvw7nxRSZf5M_rpwrO4gdhKy7elYSeLpjZmFVY55zSQFgNmCFBwuil5A1vSp78OFx1EyiNibULVWIK2vtNAroLeaN_1ffRE6s6JKq67cvC6SpHTGg2wIDSY4-Jdyv0PrtRl6Z5reUlwxu?key=nLIc2mN0dDXuTSVw-JyeXg" },
        { section: "Brand", key: "brand_video", value: "https://videos.pexels.com/video-files/4114797/4114797-hd_1920_1080_25fps.mp4" },
        { section: "Brand", key: "brand_video_poster", value: "https://via.placeholder.com/320x500?text=Brand+Story" },
    ];

    for (const item of content) {
        await prisma.siteContent.upsert({
            where: { key: item.key },
            update: {}, // Don't overwrite if exists, as admin might have changed it
            create: item
        })
    }
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
