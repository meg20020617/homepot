import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        const contentList = await prisma.siteContent.findMany();
        // Convert array to object: { "hero_title": "Title...", "hero_desc": "..." }
        const contentMap: Record<string, string> = {};
        contentList.forEach((item) => {
            contentMap[item.key] = item.value;
        });

        return NextResponse.json(contentMap);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch content" },
            { status: 500 }
        );
    }
}
