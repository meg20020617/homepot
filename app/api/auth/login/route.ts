import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { username, password } = await req.json();

        const user = await prisma.user.findUnique({
            where: { username },
        });

        if (!user || user.password !== password) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const response = NextResponse.json({ success: true, role: user.role });

        // Set Cookies based on role
        if (user.role === 'ADMIN') {
            response.cookies.set({
                name: "admin_token",
                value: "true",
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24,
            });
        } else {
            // For members, we store user_id
            response.cookies.set({
                name: "user_id",
                value: user.id.toString(),
                httpOnly: true,
                path: "/",
                maxAge: 60 * 60 * 24 * 7, // 7 days
            });
        }

        return response;
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
