import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const { username, password, name, phone, address, email } = await request.json();

        if (!username || !password || !name || !email || !address || !phone) {
            return NextResponse.json(
                { error: "Missing required fields (Name, Phone, Address, Email, Username, Password are all required)" },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "Username already exists" },
                { status: 400 }
            );
        }

        const user = await prisma.user.create({
            data: {
                username,
                password,
                name,
                phone,
                address,
                email,
                role: "MEMBER",
            },
        });

        return NextResponse.json({ success: true, user: { id: user.id, username: user.username } });
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { error: "Registration failed. Please try again later." },
            { status: 500 }
        );
    }
}
