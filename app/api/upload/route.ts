import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        // Check if running on Vercel with Blob configured
        if (process.env.BLOB_READ_WRITE_TOKEN) {
            const blob = await put(file.name, file, {
                access: 'public',
            });
            return NextResponse.json({ success: true, url: blob.url });
        }

        // Fallback to local storage (Development)
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
        const uploadDir = path.join(process.cwd(), "public", "uploads");

        // Ensure directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Ignore if exists
        }

        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        return NextResponse.json({ success: true, url: `/uploads/${filename}` });
    } catch (error) {
        console.error("Upload failed:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
