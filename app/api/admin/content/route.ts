import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        // Body: { "hero_title": "New Title", "hero_desc": "New Desc" ... }
        const body = await request.json();

        const updates = Object.entries(body).map(([key, value]) => {
            return prisma.siteContent.upsert({
                where: { key },
                update: { value: value as string },
                create: { key, value: value as string, section: "General" }
            });
        });

        await prisma.$transaction(updates);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update content" },
            { status: 500 }
        );
    }
}
