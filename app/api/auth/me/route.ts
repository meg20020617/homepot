import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const userIdCookie = cookieStore.get("user_id"); // Assuming we set this on login for members

    if (!userIdCookie) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    try {
        const userId = parseInt(userIdCookie.value);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                name: true,
                phone: true,
                address: true,
                email: true,
                username: true
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch profile" },
            { status: 500 }
        );
    }
}
