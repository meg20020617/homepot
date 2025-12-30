import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> } // Correct type for Next.js 15+ dynamic routes (params is a Promise)
) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { id } = await params; // Await params first
        const { status } = await request.json();
        const contactId = parseInt(id);

        const updatedContact = await prisma.contact.update({
            where: { id: contactId },
            data: { status },
        });

        return NextResponse.json(updatedContact);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to update status" },
            { status: 500 }
        );
    }
}
