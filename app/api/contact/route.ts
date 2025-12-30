import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, email, delivery, address, orderContent } = body;

        if (!name || !phone || !email || !address || !orderContent) {
            return NextResponse.json(
                { error: "所有欄位皆為必填 (姓名, 電話, Email, 地址, 訂單內容)" },
                { status: 400 }
            );
        }

        const cookieStore = await cookies();
        const userIdCookie = cookieStore.get("user_id");
        let userId = userIdCookie ? parseInt(userIdCookie.value) : undefined;

        // Verify if user exists before connecting
        if (userId) {
            const userExists = await prisma.user.findUnique({ where: { id: userId } });
            if (!userExists) {
                userId = undefined; // Stale cookie, ignore
            }
        }

        const contact = await prisma.contact.create({
            data: {
                name,
                phone,
                // delivery,
                address,
                orderContent,
                email,
                status: "Pending", // Default status
                user: userId ? { connect: { id: userId } } : undefined
            },
        });

        return NextResponse.json({ success: true, id: contact.id });
    } catch (error) {
        console.error("Contact API Error:", error);
        return NextResponse.json({ error: "Booking Failed" }, { status: 500 });
    }
}
