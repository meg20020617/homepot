import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const contacts = await prisma.contact.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(contacts);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch orders" },
            { status: 500 }
        );
    }
}
