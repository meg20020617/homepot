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
        const users = await prisma.user.findMany({
            where: { role: 'MEMBER' }, // Only fetch members, not other admins
            orderBy: { id: "desc" },
            select: {
                id: true,
                username: true,
                name: true,
                phone: true,
                address: true,
                email: true,
                role: true,
                _count: {
                    select: { orders: true }
                }
            },
        });

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch members" },
            { status: 500 }
        );
    }
}

